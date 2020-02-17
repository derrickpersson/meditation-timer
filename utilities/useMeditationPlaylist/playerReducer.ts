import { IPlaylist } from ".";

export interface PlayerState {
    playbackInstancePosition: number | null;
    playbackInstanceDuration: number | null;
    shouldPlay: boolean;
    isPlaying: boolean;
    isBuffering: boolean;
    isLoading: boolean;
    volume: number;
    muted: boolean;
    trackDidEnd: boolean;
    currentTrack: number;
    elapsedPlaytime: number;
    sumOfPreviousPlaylistDurations: number;
    isFinished: boolean;
    isLooping: boolean;
    loopCount: number;
    playlist: IPlaylist;
}


export const playerReducer = (state: PlayerState, action) => {
    switch (action.type) {
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
            const overflowSafePlaybackPosition = state.trackDidEnd ? 0 : action.payload.playbackInstancePosition;
            const nextPlaytime = state.sumOfPreviousPlaylistDurations + overflowSafePlaybackPosition;
            const derivedElapsedPlaytime = state.elapsedPlaytime > nextPlaytime ? state.elapsedPlaytime : nextPlaytime;
            return {
                ...state,
                ...action.payload,
                elapsedPlaytime: derivedElapsedPlaytime,
            };
        case "didJustFinish":
            const FAULT_TOLERANCE = 500;
            const playerDidSkip = state.elapsedPlaytime - state.sumOfPreviousPlaylistDurations < FAULT_TOLERANCE;
            if (playerDidSkip) {
                return {
                    ...state,
                };
            }
            const loopCount = state.isLooping ? state.loopCount + 1 : 0;
            const targetLoopCount = state.playlist.getPlaylistItemInstruction(state.currentTrack).loopCount;
            const sumOfPreviousPlaylistDurations = state.sumOfPreviousPlaylistDurations + action.payload.completedDuration;
            const isFinished = state.currentTrack === state.playlist.getPlaylistLength() - 1;
            const nextTrack = isFinished ? state.currentTrack : state.currentTrack + 1;

            return {
                ...state,
                trackDidEnd: true,
                shouldPlay: !isFinished,
                sumOfPreviousPlaylistDurations,
                elapsedPlaytime: sumOfPreviousPlaylistDurations,
                currentTrack: state.isLooping ? state.currentTrack : nextTrack,
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

export const createInitialPlayerState: (playlist: IPlaylist) => PlayerState = (playlist: IPlaylist) => ({
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
    playlist,
});