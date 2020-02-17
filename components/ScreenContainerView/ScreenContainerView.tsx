import React from "react";
import { useHeaderHeight } from "@react-navigation/stack";
import { ThemeAwareView } from "../ThemeAwareView";
import withTheme from "../../utilities/Styles/withTheme";
import { StatusBar } from "react-native";

export const ScreenContainerView = ({ 
    theme,
    ...props
}) => {
    const headerHeight = useHeaderHeight();
    return (
        <ThemeAwareView style={[{ paddingTop: headerHeight }, props.style]}>
            <StatusBar barStyle={theme.theme.type === "dark" ? "light-content": "dark-content"} />
            {props.children}
        </ThemeAwareView>
    );
};

export default withTheme(ScreenContainerView);