import React from "react";
import { Text } from "react-native";
import { withTheme } from "../../utilities/Styles/withTheme";
import { compose } from "recompose";

export const ThemeAwareText = ({
    children,
    ...props
}) => {
    const themeColors = props && props.theme && props.theme.themeColors;
    const computedThemeColor = props.isPrimary ? 
        themeColors && themeColors.primaryText:
        themeColors && themeColors.defaultText;
    return (
        <Text
            {...props}
            style={[props.style, computedThemeColor]}
        >
            {children}
        </Text>
    )
}

export default compose(
    withTheme,
)(ThemeAwareText);