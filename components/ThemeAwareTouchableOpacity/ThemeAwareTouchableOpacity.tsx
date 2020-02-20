import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import withTheme from "../../utilities/Styles/withTheme";

export const ThemeAwareTouchableOpacity = ({
    ...props
}) => {
    const themeColors = props.theme && props.theme.themeColors;
    const computedThemeColor = props.isPrimary ?
        themeColors && themeColors.primaryBackgroundColor :
        themeColors && themeColors.defaultBackgroundColor;
    return (
        <TouchableOpacity
            {...props}
            style={[props.style, computedThemeColor]}
        >
            {props.children}
        </TouchableOpacity>
    )
}

export default withTheme(ThemeAwareTouchableOpacity);