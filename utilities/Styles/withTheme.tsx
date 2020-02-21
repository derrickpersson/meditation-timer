import { useContext } from "react";
import { themeContext } from "./theme";
import { mapProps } from "recompose";
import { ITheme } from "./ThemeRepository";

export const withTheme = mapProps((props) => {
    const { theme, themeColors, toggle } = useContext(themeContext);
    return {
        ...props,
        theme: {
            theme,
            themeColors,
            toggle,
        },
    }
});

export interface InjectedThemeProps {
    theme: ITheme;
    themeColors: any;
    toggle: () => void;
}

export default withTheme;