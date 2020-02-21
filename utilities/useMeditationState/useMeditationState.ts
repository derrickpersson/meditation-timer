import { useReducer, useEffect } from "react";
import { asyncStorageMeditationSessionRepository, MeditationRecords, MeditationSessionInput, MeditationSession } from "../MeditationSessionRepository";
import { meditationAnalysisService } from "../MeditationAnalysisService";

export interface MeditationState {
    weeklyMinutes: number;
    totalMinutes: number;
    dayStreak: number;
    meditationSessions: MeditationSession[];
}

export const useMeditationState = () => {

    const meditationReducer = (state = initialMeditationState, action) => {
        switch(action.type){
            case "FETCH_MEDITATION_SESSIONS":
                return {
                    ...state,
                    meditationSessions: action.payload.meditationSessions,
                };
            case "UPDATE_MEDITATION_SESSIONS":
                const meditationSessions = state.meditationSessions.concat(action.payload.meditationSession);
                return {
                    ...state,
                    meditationSessions,
                };
            case "UPDATE_MEDITATION_STATS":
                return {
                    ...state,
                    totalMinutes: meditationAnalysisService.getTotalMeditatedMinutes(state.meditationSessions),
                    weeklyMinutes: meditationAnalysisService.getWeeklyMeditatedMinutes(state.meditationSessions),
                    dayStreak: meditationAnalysisService.getDayStreakCount(state.meditationSessions),
                }
            default:
                return state;
        }
    }

    const initialMeditationState: MeditationState = {
        weeklyMinutes: 0,
        totalMinutes: 0,
        dayStreak: 0,
        meditationSessions: [],
    };

    const [meditationState, dispatch] = useReducer(meditationReducer, initialMeditationState);

    useEffect(() => {
        (async () => { 
            const meditationRecords: MeditationRecords = await asyncStorageMeditationSessionRepository.getMeditationSessions();
            const sessions = meditationRecords.meditationSessions;
            dispatch({
                type: "FETCH_MEDITATION_SESSIONS",
                payload: {
                    meditationSessions: sessions,
                },
            });
        })();
    }, []);

    useEffect(() => {
        dispatch({
            type: "UPDATE_MEDITATION_STATS"
        });
    }, [meditationState.meditationSessions]);

    const updateMeditationSessions = async (meditationSessionInput: MeditationSessionInput ) => {
        const meditationSession = await asyncStorageMeditationSessionRepository.createMeditationSession(meditationSessionInput);
        dispatch({
            type: "UPDATE_MEDITATION_SESSIONS",
            payload: {
                meditationSession,
            }
        });
    }

    return {
        meditationState,
        updateMeditationSessions,
    };
}

export default useMeditationState;