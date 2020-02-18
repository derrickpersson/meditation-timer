import { StyleSheet } from "react-native";

export const colorPalette = {
    primaryColor: "#4464FF",
    white: "#FFFFFF",
    black: "#000000",
    darkBackground: "#212121",
}

const themeLight = StyleSheet.create({
    primaryBackgroundColor: {
        backgroundColor: colorPalette.primaryColor,
    },
    defaultBackgroundColor: {
        backgroundColor: colorPalette.white,
    },
    defaultText: {
        color: colorPalette.black,
    },
    primaryText: {
        color: colorPalette.white,
    },
    defaultSVG: {},
    primarySVG: {},
});

themeLight.defaultSVG = {
    fill: colorPalette.black,
    stroke: colorPalette.black,
}

themeLight.primarySVG = {
    fill: colorPalette.primaryColor,
    stroke: colorPalette.primaryColor,
}

const themeDark = StyleSheet.create({
    primaryBackgroundColor: {
        backgroundColor: colorPalette.primaryColor,
    },
    defaultBackgroundColor: {
        backgroundColor: colorPalette.darkBackground,
    },
    defaultText: {
        color: colorPalette.white,
    },
    primaryText: {
        color: colorPalette.black,
    },
    defaultSVG: {},
    primarySVG: {},
});

themeDark.defaultSVG = {
    fill: colorPalette.white,
    stroke: colorPalette.white,
}

themeDark.primarySVG = {
    fill: colorPalette.primaryColor,
    stroke: colorPalette.primaryColor,
}

export const themeColors = themeType => (themeType === "dark" ? themeDark: themeLight);

export default themeColors;