import React, { useEffect, useState } from "react";
import { ITheme, themeRespository, themeType } from "./ThemeRepository";

export const useTheme = () => {
    const [themeState, setThemeState] = useState({
        theme: {
            type: "light" as themeType,
        } as ITheme,
        hasThemeMounted: false,
    });

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const themeType: themeType = await themeRespository.getTheme();
                setThemeState({
                    ...themeState,
                    theme: {
                        type: themeType,
                    },
                    hasThemeMounted: true,
                });
            } catch (error) {
                setThemeState({
                    ...themeState,
                    hasThemeMounted: true,
                });
            }
        }
        loadTheme();
    }, []);

    useEffect(() => {
        (async () => {
            await themeRespository.setTheme(themeState.theme.type);
        })();
    }, [themeState])

    return {
        themeState, 
        setThemeState,
    };
}

export const themeContext = React.createContext({
    theme: {
        type: "light" as themeType,
    } as ITheme,
    themeColors: {},
    toggle: () => null,
});

export default useTheme;