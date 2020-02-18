import React from "react";
import { StatusBar } from "react-native";
import withTheme from "../../utilities/Styles/withTheme";

export const ThemeAwareStatusBar = ({
    theme,
}) => (
    <StatusBar barStyle={theme.theme.type === "dark" ? "light-content": "dark-content"} />
);

export default withTheme(ThemeAwareStatusBar);