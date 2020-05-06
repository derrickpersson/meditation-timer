import { useEffect, useRef, useReducer } from "react";
import { Audio } from "expo-av";
import { 
    INTERRUPTION_MODE_IOS_DUCK_OTHERS, 
    INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
} from "expo-av/build/Audio";
import { MeditationPlaylist } from "./Playlist";
import { Interval } from ".";
import { createInitialPlayerState, playerReducer } from "./playerReducer";

export interface MediationPlayerOptions {
    duration: number;
    interval?: Interval;
    handleOnComplete: () => void;
}

export const useMeditationPlaylistPlayer = ({
    duration,
    interval,
    handleOnComplete,
}: MediationPlayerOptions) => {
    const initialPlayerState = createInitialPlayerState(new MeditationPlaylist(duration, interval));
    const [playerState, dispatch] = useReducer(playerReducer, initialPlayerState);
    const playbackInstance: any = useRef(null);

    useEffect(() => {
        loadAudioPlayer();
    }, []);

    useEffect(() => {
        if(playerState.isFinished){
            unloadPlaybackInstance();
            handleOnComplete();
        } else {
            loadNewPlaybackInstance(playerState.shouldPlay, playerState.currentTrack);
        }
        return () => unloadPlaybackInstance();
    }, [playerState.currentTrack, playerState.isFinished, playerState.shouldPlay]);

    useEffect(() => {
        if(playbackInstance && playbackInstance.current){
            if(!playerState.isLooping){
                playbackInstance.current.setIsLoopingAsync(false);
            }
        }
    }, [playerState.isLooping]);

    useEffect(() => {
        if(playerState.isLooping && playerState.trackDidEnd){
            dispatch({
                type: "resetTrackDidEnd",
            });
        }
    }, [playerState.isLooping, playerState.trackDidEnd, playerState.loopCount]);

    const loadAudioPlayer = async () => {
        const mode = {
            allowsRecordingIOS: false,
            shouldDuckAndroid: true,
            interruptionModeAndroid: INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            playThroughEarpieceAndroid: false,
            playsInSilentModeIOS: true,
            staysActiveInBackground: true,
            interruptionModeIOS: INTERRUPTION_MODE_IOS_DUCK_OTHERS,
        };
        try {
            await Audio.setAudioModeAsync(mode);
        } catch (error) {
            console.log("Error: ", error);
        }
    }


    const pausePlayback = (callback?) => {
        playbackInstance.current.pauseAsync();
        const futureIsPlayingState = !playerState.isPlaying;
        dispatch({
            type: "updateCurrentPlayState",
            payload: {
                isPlaying: false,
            }
        });
        callback(futureIsPlayingState);
    }

    const playPlayback = (callback?) => {
        playbackInstance.current.playAsync();
        const futureIsPlayingState = !playerState.isPlaying;
        dispatch({
            type: "updateCurrentPlayState",
            payload: {
                isPlaying: true,
            }
        });
        callback(futureIsPlayingState);
    }

    const handleBackButtonAndroid = () => {
        if (playbackInstance.current != null) {
            if (playerState.isPlaying) {
                pausePlayback();
                return true;
            }
        }
        return false;
    }

    const onPlayPausePressed = (callback?) => {
        if (playbackInstance.current != null) {
            if (playerState.isPlaying) {
                pausePlayback(callback);
            } else {
                playPlayback(callback);
            }
        }
    };

    const unloadPlaybackInstance = async () => {
        if (playbackInstance.current != null) {
            await playbackInstance.current.setOnPlaybackStatusUpdate(null);
            await playbackInstance.current.unloadAsync();
            playbackInstance.current = null;
        }
    }


    const loadNewPlaybackInstance = async (playing: boolean, currentTrack: number) => {
        const playlistItemInstruction = playerState.playlist.getPlaylistItemInstruction(currentTrack);
        const shouldLoop = playlistItemInstruction.loopCount > 0;

        const source = playlistItemInstruction.playlistItem.source;

        const initialStatus = {
            progressUpdateIntervalMillis: 1000,
            shouldPlay: playing,
            volume: playerState.volume,
            isMuted: playerState.muted,
            isLooping: shouldLoop,
        };

        try {
            const { sound, status } = await Audio.Sound.createAsync(
                source,
                initialStatus,
                onPlaybackStatusUpdate,
                true, // TODO: make this false & handle buffering events
            );
            playbackInstance.current = sound;
            dispatch({
                type: "loadedNewTrack",
            });
        } catch (error) {
            console.error(`Fatal error: `, error);
            loadNewPlaybackInstance(playing, currentTrack);
        }
    }

    const onPlaybackStatusUpdate = status => {
        if (status.isLoaded) {
            if (status.didJustFinish) {
                dispatch({
                    type: "didJustFinish",
                    payload: {
                        completedDuration: status.durationMillis,
                        playbackInstancePosition: status.positionMillis,
                    }
                });
            } else {
                dispatch({
                    type: "statusUpdate",
                    payload: {
                        isLoading: status.isLoading,
                        playbackInstancePosition: status.positionMillis,
                        playbackInstanceDuration: status.durationMillis,
                        isPlaying: status.isPlaying,
                        isBuffering: status.isBuffering,
                        muted: status.isMuted,
                        volume: status.volume,
                        isLooping: status.isLooping,
                    },
                });
            }
        } else {
            if (status.error) {
                console.log(`FATAL PLAYER ERROR: ${status.error}`);
            }
        }
    };

    return {
        pausePlayback,
        playPlayback,
        handlePlayPause: onPlayPausePressed,
        elapsedPlaytime: playerState.elapsedPlaytime,
        isPlaying: playerState.isPlaying || (playerState.trackDidEnd && playerState.shouldPlay),
        handleBackButtonAndroid,
    }
};

export default useMeditationPlaylistPlayer;