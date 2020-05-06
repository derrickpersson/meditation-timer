import { createInitialPlayerState, playerReducer } from "../playerReducer";
import MeditationPlaylist from "../Playlist";

describe("playerReducer", () => {

    const initialPlayerState = createInitialPlayerState(new MeditationPlaylist(3, {} as any));

    it("should load new track", () => {
        const loadedNewTrackState = {
            ...initialPlayerState,
            trackDidEnd: true,
            isPlaying: false,
            shouldPlay: true,
            sumOfPreviousPlaylistDurations: 1000,
        }
        const newState = playerReducer(loadedNewTrackState, {
            type: "loadedNewTrack"
        });

        const expectedPlayerState = {
            ...loadedNewTrackState,
            trackDidEnd: false,
            isPlaying: true,
            elapsedPlaytime: 1000,
        }
        expect(newState).toEqual(expectedPlayerState);
    });

    it("should resetTrackDidEnd", () => {
        const newState = playerReducer(initialPlayerState, {
            type: "resetTrackDidEnd"
        });

        const expectedPlayerState = {
            ...initialPlayerState,
            trackDidEnd: false,
        }
        expect(newState).toEqual(expectedPlayerState);
    });

    describe("status Update", () => {
        it("should handle simple updates", () => {
            const newState = playerReducer(initialPlayerState, {
                type: "statusUpdate",
                payload: {
                    playbackInstancePosition: 500,
                }
            });
    
            const expectedPlayerState = {
                ...initialPlayerState,
                playbackInstancePosition: 500,
                elapsedPlaytime: 500,
            };
    
            expect(newState).toEqual(expectedPlayerState);
        });

        it("should handle overflow updates", () => {
            const justFinishedState = {
                ...initialPlayerState,
                sumOfPreviousPlaylistDurations: 1000,
                elapsedPlaytime: 1000,
                trackDidEnd: true,
            }
    
            const newState = playerReducer(justFinishedState, {
                type: "statusUpdate",
                payload: {
                    playbackInstancePosition: 5,
                }
            });
    
            const expectedPlayerState = {
                ...justFinishedState,
                playbackInstancePosition: 5,
                elapsedPlaytime: 1000,
            };
    
            expect(newState).toEqual(expectedPlayerState);
        });

        it("should handle 'backwards' flow", () => {
            const overflowedState = {
                ...initialPlayerState,
                sumOfPreviousPlaylistDurations: 1000,
                elapsedPlaytime: 1500,
            }
    
            const newState = playerReducer(overflowedState, {
                type: "statusUpdate",
                payload: {
                    playbackInstancePosition: 5,
                }
            });
    
            const expectedPlayerState = {
                ...overflowedState,
                playbackInstancePosition: 5,
                elapsedPlaytime: 1500,
            };
    
            expect(newState).toEqual(expectedPlayerState);
        });
    });

    describe("track finishing", () => {
        it("should handle simple finishing case, should play next track", () => {
            const baseState = {
                ...initialPlayerState,
                shouldPlay: true,
                isPlaying: true,
                currentTrack: 0,
                sumOfPreviousPlaylistDurations: 1000,
                elapsedPlaytime: 2000,
            };

            const newState = playerReducer(baseState, {
                type: "didJustFinish",
                payload: {
                    completedDuration: 1000,
                }
            });
    
            const expectedPlayerState = {
                ...baseState,
                trackDidEnd: true,
                shouldPlay: true,
                sumOfPreviousPlaylistDurations: 2000,
                currentTrack: 1,
                isFinished: false,
                loopCount: 0,
                isLooping: false,
                elapsedPlaytime: 2000,
            };
    
            expect(newState).toEqual(expectedPlayerState);
        });

        it("should increment loop if looping", () => {
            const baseState = {
                ...initialPlayerState,
                shouldPlay: true,
                isPlaying: true,
                currentTrack: 1,
                isLooping: true,
                sumOfPreviousPlaylistDurations: 1000,
                elapsedPlaytime: 2000,
            };

            const newState = playerReducer(baseState, {
                type: "didJustFinish",
                payload: {
                    completedDuration: 1000,
                }
            });
    
            const expectedPlayerState = {
                ...baseState,
                trackDidEnd: true,
                shouldPlay: true,
                sumOfPreviousPlaylistDurations: 2000,
                currentTrack: 1,
                isFinished: false,
                loopCount: 1,
                isLooping: true,
                elapsedPlaytime: 2000,
            };
    
            expect(newState).toEqual(expectedPlayerState);
        });

        it("should complete playing if done last track", () => {
            const baseState = {
                ...initialPlayerState,
                shouldPlay: true,
                isPlaying: true,
                currentTrack: 2,
                sumOfPreviousPlaylistDurations: 1000,
                elapsedPlaytime: 2000,
            };

            const newState = playerReducer(baseState, {
                type: "didJustFinish",
                payload: {
                    completedDuration: 1000,
                }
            });
    
            const expectedPlayerState = {
                ...baseState,
                trackDidEnd: true,
                shouldPlay: false,
                sumOfPreviousPlaylistDurations: 2000,
                currentTrack: 2,
                isFinished: true,
                elapsedPlaytime: 2000,
            };
    
            expect(newState).toEqual(expectedPlayerState);
        });

        it("should handle unreliable callback from Sound API", () => {
            const baseState = {
                ...initialPlayerState,
                shouldPlay: true,
                isPlaying: true,
                currentTrack: 2,
                sumOfPreviousPlaylistDurations: 2000,
                elapsedPlaytime: 2000,
            };

            const newState = playerReducer(baseState, {
                type: "didJustFinish",
                payload: {
                    completedDuration: 1000,
                }
            });
    
            const expectedPlayerState = {
                ...baseState,
            };
    
            expect(newState).toEqual(expectedPlayerState);
        });
    });

    it("should handle play pause events", () => {
        const baseState = {
            ...initialPlayerState,
            shouldPlay: true,
            isPlaying: true,
            currentTrack: 2,
            sumOfPreviousPlaylistDurations: 2000,
            elapsedPlaytime: 2000,
        };

        const newState = playerReducer(baseState, {
            type: "updateCurrentPlayState",
            payload: {
                isPlaying: false,
            }
        });

        const expectedPlayerState = {
            ...baseState,
            isPlaying: false,
        };

        expect(newState).toEqual(expectedPlayerState);
    });
});