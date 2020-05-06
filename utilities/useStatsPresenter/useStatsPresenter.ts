import React, { useEffect, useState } from "react";
import { meditationStatsPresentorRepository } from "../MeditationStatsPresenterRepository";

export const useStatsPresenter = () => {
    const [isStatsHidden, setStatsHidden] = useState(false);

    useEffect(() => {
        (async () => { 
            const isHidden = await meditationStatsPresentorRepository.getPresenterStatus();
            setStatsHidden(isHidden);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await meditationStatsPresentorRepository.setPresenterStatus(isStatsHidden);
        })();
    }, [isStatsHidden])

    return {
        isStatsHidden, 
        setStatsHidden
    };
}

export const statsPresenterContext = React.createContext({
    isStatsHidden: false,
    toggleStats: () => null,
});

export default useStatsPresenter;