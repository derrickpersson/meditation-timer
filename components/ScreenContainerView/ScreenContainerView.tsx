import React from "react";
import { useHeaderHeight } from "@react-navigation/stack";
import { ThemeAwareView } from "../ThemeAwareView";
import withTheme from "../../utilities/Styles/withTheme";
import { ThemeAwareStatusBar } from "../ThemeAwareStatusBar";

export const ScreenContainerView = ({ 
    theme,
    ...props
}) => {
    const headerHeight = useHeaderHeight();
    return (
        <ThemeAwareView style={[{ paddingTop: headerHeight }, props.style]}>
            <ThemeAwareStatusBar />
            {props.children}
        </ThemeAwareView>
    );
};

export default withTheme(ScreenContainerView);