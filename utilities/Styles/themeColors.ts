import { StyleSheet } from "react-native";

export const colorPalette = {
    primaryColor: "#4285F5",
    darkPrimaryColor: "#4285F5",
    white: "#FFFFFF",
    black: "#000000",
    grey: "#A6A3A3",
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
    secondaryText: {
        color: colorPalette.grey,
    },
    primaryText: {
        color: colorPalette.primaryColor,
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
        backgroundColor: colorPalette.darkPrimaryColor,
    },
    defaultBackgroundColor: {
        backgroundColor: colorPalette.darkBackground,
    },
    defaultText: {
        color: colorPalette.white,
    },
    primaryText: {
        color: colorPalette.darkPrimaryColor,
    },
    defaultSVG: {},
    primarySVG: {},
});

themeDark.defaultSVG = {
    fill: colorPalette.white,
    stroke: colorPalette.white,
}

themeDark.primarySVG = {
    fill: colorPalette.darkPrimaryColor,
    stroke: colorPalette.darkPrimaryColor,
}

export const themeColors = themeType => (themeType === "dark" ? themeDark: themeLight);

export default themeColors;