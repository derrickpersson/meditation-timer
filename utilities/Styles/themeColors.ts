import { StyleSheet } from "react-native";

// Color Definitions:

// Default -> what the default color is.
// Primary -> an actual color. (i.e. blue)
// Secondary -> The next color

const themeLight = StyleSheet.create({
    primaryBackgroundColor: {
        backgroundColor: "#4464FF",
    },
    defaultBackgroundColor: {
        backgroundColor: "#FFF",
    },
    defaultText: {
        color: "#000",
    },
    primaryText: {
        color: "#FFF",
    },
    defaultSVG: {},
    primarySVG: {},
});

themeLight.defaultSVG = {
    fill: "#000000",
    stroke: "#000000",
}

themeLight.primarySVG = {
    fill: "#4464FF",
    stroke: "#4464FF",
}

const themeDark = StyleSheet.create({
    primaryBackgroundColor: {
        backgroundColor: "#4464FF",
    },
    defaultBackgroundColor: {
        backgroundColor: "#212121",
    },
    defaultText: {
        color: "#FFF",
    },
    primaryText: {
        color: "#000",
    },
    defaultSVG: {},
    primarySVG: {},
});

themeDark.defaultSVG = {
    fill: "#FFFFFF",
    stroke: "#FFFFFF",
}

export const themeColors = themeType => (themeType === "dark" ? themeDark: themeLight);

export default themeColors;