import { createContext, useContext } from "react";
import { mapProps } from "recompose";
import { MeditationState } from "./useMeditationState";
import { MeditationSessionInput } from "../MeditationSessionRepository";

export const withMeditationState = mapProps((props) => {
    const meditationContext = useContext(meditationStateContext);
    return {
        ...props,
        meditation: {
            ...meditationContext,
        }
    }
});

export const meditationStateContext = createContext({
    meditation: {
        weeklyMinutes: 0,
        totalMinutes: 0,
        dayStreak: 0,
    },
    updateMeditationSessions: (meditationSessionInput: MeditationSessionInput) => null,
});

export interface InjectedMeditationStateProps {
    meditationState: MeditationState;
    updateMeditationSessions: (meditationSessioninput: MeditationSessionInput) => void;
}

export default withMeditationState;