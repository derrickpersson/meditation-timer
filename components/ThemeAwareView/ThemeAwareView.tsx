import React from "react";
import { View } from "react-native";
import withTheme from "../../utilities/Styles/withTheme";

export const ThemeAwareView = ({ 
    children,
    ...props
}) => {
    const themeColors = props && props.theme && props.theme.themeColors;
    const computedThemeColor = props.isPrimary ? 
        themeColors && themeColors.primaryBackgroundColor:
        themeColors && themeColors.defaultBackgroundColor;

    return (
        <View
            {...props}
            style={[props.style, computedThemeColor]}
        >
            {children}
        </View>
    )
}

export default withTheme(ThemeAwareView);