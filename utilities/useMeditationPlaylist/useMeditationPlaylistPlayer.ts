import { useState, useEffect, useRef } from "react";
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
    const [playerState, setPlayerState ] = useState({
        playbackInstancePosition: null,
        playbackInstanceDuration: null,
        shouldPlay: false,
        isPlaying: false,
        isBuffering: false,
        isLoading: true,
        volume: 1.0,
        muted: false,
    });

    // const [elapsedPlaytime, setElapsedPlaytime] = useState(0);
    const [isLooping, setIsLooping] = useState(false);

    const playbackInstance: any = useRef();
    const loopCount = useRef(0);
    const currentTrack = useRef(0);
    const sumOfPreviousPlaylistDurations = useRef(0);
    const elapsedTime = useRef(0);

    const [playlist] = useState(new MeditationPlaylist(duration, interval));

    useEffect(() => {
        loadAudioPlayer();
        loadNewPlaybackInstance(playerState.isPlaying, currentTrack.current);
        return () => unloadPlaybackInstance(playbackInstance.current);
    }, []);

    // useEffect(() => {
    //     setElapsedPlaytime(sumOfPreviousPlaylistDurations.current + playerState.playbackInstancePosition);
    //     console.log("LoopCount: ", loopCount.current);
    //     console.log("Current Track: ", currentTrack.current);
    //     console.log("Sum: ", sumOfPreviousPlaylistDurations.current);
    //     console.log("PlayerState: ", playerState);
    //     console.log("ElapsedPlaytime: ", elapsedPlaytime);
    // }, [playerState.playbackInstancePosition]);

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
        callback(futureIsPlayingState);
    }

    const playPlayback = (callback?) => {
        playbackInstance.current.playAsync();
        const futureIsPlayingState = !playerState.isPlaying;
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

    const unloadPlaybackInstance = async (playbackInstance) => {
        if (playbackInstance != null) {
            await playbackInstance.unloadAsync();
            playbackInstance.current = null;
        }
    }


    const loadNewPlaybackInstance = async (playing, currentTrack) => {
        if(playbackInstance.current && isLooping){
            return playbackInstance.current;
        }

        if (playbackInstance.current != null) {
            await playbackInstance.current.unloadAsync();
            playbackInstance.current = null;
        }

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
        if (status.isLoaded) {
            setPlayerState({
                isLoading: status.isLoading,
                playbackInstancePosition: status.positionMillis,
                playbackInstanceDuration: status.durationMillis,
                shouldPlay: status.shouldPlay,
                isPlaying: status.isPlaying,
                isBuffering: status.isBuffering,
                muted: status.isMuted,
                volume: status.volume,
            });
            console.log("Adding properly? ", elapsedTime.current, status.positionMillis, sumOfPreviousPlaylistDurations.current, sumOfPreviousPlaylistDurations.current + status.positionMillis);
            elapsedTime.current = sumOfPreviousPlaylistDurations.current + status.positionMillis;
            if (status.didJustFinish) {
                sumOfPreviousPlaylistDurations.current = elapsedTime.current;
                if(currentTrack.current === playlist.getPlaylistLength() - 1){
                    handleOnComplete();
                } else {
                    if(status.isLooping){
                        if(loopCount.current === playlist.getPlaylistItemInstruction(currentTrack.current).loopCount - 1){
                            playbackInstance.current.setIsLoopingAsync(false);
                            setIsLooping(false);
                            loopCount.current = 0;
                        } else {
                            setIsLooping(true);
                            loopCount.current = loopCount.current + 1;
                        }
                    } else {
                        currentTrack.current = currentTrack.current + 1;
                        loadNewPlaybackInstance(status.shouldPlay, currentTrack.current)
                    }
                }
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
        elapsedPlaytime: elapsedTime.current,
        isPlaying: playerState.isPlaying || playerState.shouldPlay,
        handleBackButtonAndroid,
    }
};