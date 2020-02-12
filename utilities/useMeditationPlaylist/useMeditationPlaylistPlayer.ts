import { useState, useEffect, useRef, useReducer } from "react";
import { Audio } from "expo-av";
import { 
    INTERRUPTION_MODE_IOS_DUCK_OTHERS, 
    INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
} from "expo-av/build/Audio";
import { MeditationPlaylist } from "./Playlist";
import { Interval } from ".";



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
    const [playlist] = useState(new MeditationPlaylist(duration, interval));

    const playerReducer = (state, action) => {
        switch(action.type){
            case "newTrackBuffering":
                return {
                    ...state,
                    trackDidEnd: false,
                    isPlaying: state.shouldPlay,
                    elapsedPlaytime: state.sumOfPreviousPlaylistDurations,
                };
            case "resetTrackDidEnd":
                return {
                    ...state,
                    trackDidEnd: false,
                };
            case "statusUpdate":
                const overflowSafePlaybackPosition = state.trackDidEnd ? 0: action.payload.playbackInstancePosition;
                return {
                    ...state,
                    ...action.payload,
                    elapsedPlaytime: state.sumOfPreviousPlaylistDurations + (overflowSafePlaybackPosition || 0),
                };
            case "didJustFinish":
                const loopCount = state.isLooping ? state.loopCount + 1: 0;
                const targetLoopCount = playlist.getPlaylistItemInstruction(state.currentTrack).loopCount;
                const sumOfPreviousPlaylistDurations = state.sumOfPreviousPlaylistDurations + action.payload.completedDuration;
                const isFinished = state.currentTrack === playlist.getPlaylistLength() - 1;
                const nextTrack = isFinished ? state.currentTrack: state.currentTrack + 1;

                return {
                    ...state,
                    trackDidEnd: true,
                    shouldPlay: !isFinished,
                    sumOfPreviousPlaylistDurations,
                    elapsedPlaytime: sumOfPreviousPlaylistDurations,
                    currentTrack: state.isLooping ? state.currentTrack: nextTrack,
                    isFinished: isFinished,
                    loopCount: loopCount,
                    isLooping: state.loopCount + 1 < targetLoopCount,
                };
            case "updateCurrentPlayState":
                return {
                    ...state,
                    ...action.payload,
                }
            default:
                return state;
        }
    }

    const initialPlayerState = {
        playbackInstancePosition: null,
        playbackInstanceDuration: null,
        shouldPlay: false,
        isPlaying: false,
        isBuffering: false,
        isLoading: true,
        volume: 1.0,
        muted: false,
        trackDidEnd: false,
        currentTrack: 0,
        elapsedPlaytime: 0,
        sumOfPreviousPlaylistDurations: 0,
        isFinished: false,
        isLooping: false,
        loopCount: 0,
    };

    const [playerState, dispatch] = useReducer(playerReducer, initialPlayerState);

    const playbackInstance: any = useRef(null);

    useEffect(() => {
        if(playerState.isFinished){
            unloadPlaybackInstance();
            handleOnComplete();
        } else {
            loadAudioPlayer();
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
    }, [playerState.isLooping, playerState.trackDidEnd ,playerState.loopCount]);

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


    const loadNewPlaybackInstance = async (playing, currentTrack) => {
        const playlistItemInstruction = playlist.getPlaylistItemInstruction(currentTrack);
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
        } catch (error) {
            console.error(`Fatal error: `, error);
            loadNewPlaybackInstance(playing, currentTrack);
        }
    }

    const onPlaybackStatusUpdate = status => {
        if(status.isBuffering){
            dispatch({
                type: "newTrackBuffering",
            });
        } else {
            if (status.isLoaded) {
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
                if (status.didJustFinish) {
                    dispatch({
                        type: "didJustFinish",
                        payload: {
                            completedDuration: status.durationMillis,
                        }
                    });
                }
            } else {
                if (status.error) {
                    console.log(`FATAL PLAYER ERROR: ${status.error}`);
                }
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