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

    const [elapsedPlaytime, setElapsedPlaytime] = useState(0);
    const [sumOfPreviousPlaylistDurations, setSumOfPreviousPlaylistDurations] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isLooping, setIsLooping] = useState(false);

    const ref: any = useRef();
    const loopCount = useRef(0);

    const [playlist] = useState(new MeditationPlaylist(duration, interval));

    useEffect(() => {
        loadAudioPlayer();
        loadNewPlaybackInstance(playerState.isPlaying, currentTrack);

    }, [currentTrack, loopCount.current, isLooping]);

    useEffect(() => {
        setSumOfPreviousPlaylistDurations(sumOfPreviousPlaylistDurations + playerState.playbackInstanceDuration);
        console.log("Called with: ", sumOfPreviousPlaylistDurations, playerState.playbackInstanceDuration, currentTrack, loopCount.current);
    }, [currentTrack, loopCount.current]);

    useEffect(() => {
        setElapsedPlaytime(sumOfPreviousPlaylistDurations + playerState.playbackInstancePosition);
    }, [sumOfPreviousPlaylistDurations, playerState.playbackInstancePosition]);

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


    const pausePlayback = () => {
        ref.current.pauseAsync();
        // props.navigation.setParams({ isPlaying: false });
    }

    const playPlayback = () => {
        ref.current.playAsync();
        // props.navigation.setParams({ isPlaying: true });
    }

    const handleBackButtonAndroid = () => {
        if (ref.current != null) {
            if (playerState.isPlaying) {
                pausePlayback();
                return true;
            }
        }
        return false;
    }

    const onPlayPausePressed = () => {
        if (ref.current != null) {
            if (playerState.isPlaying) {
                pausePlayback();
            } else {
                playPlayback();
            }
        }
    };

    const unloadPlaybackInstance = async (playbackInstance) => {
        if (playbackInstance != null) {
            await playbackInstance.unloadAsync();
            ref.current = null;
        }
    }


    const loadNewPlaybackInstance = async (playing, currentTrack) => {
        if(ref.current && isLooping){
            return ref.current;
        }

        if (ref.current != null) {
            await ref.current.stopAsync();
            await ref.current.unloadAsync();
            ref.current = null;
        }

        const playlistItemInstruction = playlist.getPlaylistItemInstruction(currentTrack);
        const shouldLoop = playlistItemInstruction.loopCount > 0;

        const source = playlistItemInstruction.playlistItem.source;

        const initialStatus = {
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
            ref.current = sound;
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
            if (status.didJustFinish) {
                if(currentTrack === playlist.getPlaylistLength() - 1){
                    // unloadPlaybackInstance(playbackInstance);
                    handleOnComplete();
                } else {
                    if(status.isLooping){
                        console.log("LoopCount? ", playlist.getPlaylistItemInstruction(currentTrack).loopCount, loopCount.current);
                        if(loopCount.current === playlist.getPlaylistItemInstruction(currentTrack).loopCount - 1){
                            ref.current.setIsLoopingAsync(false);
                            setIsLooping(false);
                            loopCount.current = 0;
                        } else {
                            console.log("Called! ", loopCount);
                            setIsLooping(true);
                            loopCount.current = loopCount.current + 1;
                        }
                    } else {
                        setCurrentTrack(currentTrack + 1);
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
        elapsedPlaytime: elapsedPlaytime,
        isPlaying: playerState.isPlaying,
        handleBackButtonAndroid,
    }
};