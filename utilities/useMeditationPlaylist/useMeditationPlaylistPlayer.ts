import { useState, useEffect } from "react";
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
        sumOfPreviousPlaylistDurations: 0,
        elapsedPlaytime: 0,
        playbackInstancePosition: null,
        playbackInstanceDuration: null,
        shouldPlay: false,
        isPlaying: false,
        isBuffering: false,
        isLoading: true,
        volume: 1.0,
        muted: false,
        currentIndex: 0,
        numberOfLoops: 0,
    });

    const [playlist] = useState(new MeditationPlaylist(duration, interval));
    const [playbackInstance, setPlaybackInstance] = useState(null);
    // let playbackInstance = null;

    useEffect(() => {
        loadAudioPlayer();
    }, []);

    useEffect(() => {
        const handlePlaybackInstanceLoading = async () => {
            await loadNewPlaybackInstance(playerState.shouldPlay, setPlaybackInstance);
        }
        handlePlaybackInstanceLoading();
        // return () => {
        //     handleUnloadPlaybackInstance();
        // }
    }, [playerState.currentIndex])

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
        playbackInstance.pauseAsync();
        // props.navigation.setParams({ isPlaying: false });
    }

    const playPlayback = () => {
        playbackInstance.playAsync();
        // props.navigation.setParams({ isPlaying: true });
    }

    const handleBackButtonAndroid = () => {
        if (playbackInstance != null) {
            if (playerState.isPlaying) {
                pausePlayback();
                return true;
            }
        }
        return false;
    }

    const onPlayPausePressed = () => {
        if (playbackInstance != null) {
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
            setPlaybackInstance(null);
        }
    }


    const loadNewPlaybackInstance = async (playing, setPlaybackInstance) => {
        console.log("Loaded? ", playbackInstance);
        if (playbackInstance != null) {
            await playbackInstance.stopAsync();
            await playbackInstance.unloadAsync();
            setPlaybackInstance(null);
        }

        const playlistItemInstruction = playlist.getPlaylistItemInstruction(playerState.currentIndex);
        const source = playlistItemInstruction.playlistItem.source;

        const initialStatus = {
            shouldPlay: playing,
            volume: playerState.volume,
            isMuted: playerState.muted,
            isLooping: playlistItemInstruction.loopCount > 0,
        };

        try {
            const { sound, status } = await Audio.Sound.createAsync(
                source,
                initialStatus,
                onPlaybackStatusUpdate,
                true, // TODO: make this false & handle buffering events
            );
            setPlaybackInstance(sound);
        } catch (error) {
            console.error(`Fatal error: `, error);
            loadNewPlaybackInstance(playing, setPlaybackInstance);
        }
    }

    const onPlaybackStatusUpdate = status => {
        if (status.isLoaded) {
            setPlayerState({
                ...playerState,
                elapsedPlaytime: playerState.sumOfPreviousPlaylistDurations + status.positionMillis,
                playbackInstancePosition: status.positionMillis,
                playbackInstanceDuration: status.durationMillis,
                shouldPlay: status.shouldPlay,
                isPlaying: status.isPlaying,
                isBuffering: status.isBuffering,
                muted: status.isMuted,
                volume: status.volume,
            });
            if (status.didJustFinish) {
                setPlayerState({
                    ...playerState,
                    sumOfPreviousPlaylistDurations: playerState.sumOfPreviousPlaylistDurations + status.durationMillis,
                });
                if(playerState.currentIndex === playlist.getPlaylistLength() - 1){
                    // unloadPlaybackInstance(playbackInstance);
                    handleOnComplete();
                } else {
                    if(status.isLooping){
                        if(playerState.numberOfLoops === playlist.getPlaylistItemInstruction(playerState.currentIndex).loopCount - 1){
                            playbackInstance.setIsLoopingAsync(false);
                            setPlayerState({ 
                                ...playerState,
                                numberOfLoops: 0 
                            });
                        } else {
                            setPlayerState({ 
                                ...playerState,
                                numberOfLoops: playerState.numberOfLoops + 1
                             })
                        }
                    } else {
                        console.log("Gets here! ", playbackInstance);
                        setPlayerState({
                            ...playerState,
                            currentIndex: playerState.currentIndex + 1,
                        });
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
        elapsedPlaytime: playerState.elapsedPlaytime,
        isPlaying: playerState.isPlaying,
        handleBackButtonAndroid,
    }
};