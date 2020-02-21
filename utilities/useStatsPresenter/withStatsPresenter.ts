import { useContext } from "react";
import { statsPresenterContext } from "./useStatsPresenter";
import { mapProps } from "recompose";

export const withStatsPresenter = mapProps((props) => {
    const { 
        isStatsHidden,
        toggleStats,
        } = useContext(statsPresenterContext);
    return {
        ...props,
        statsPresenter: {
            isStatsHidden,
            toggleStats,
        }
    }
});

export interface InjectedStatsPresenterProps {
    isStatsHidden: boolean;
    toggleStats: () => void;
}

export default withStatsPresenter;