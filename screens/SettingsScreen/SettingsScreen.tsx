import React from "react";
import { StyleSheet, View } from "react-native";
import { SettingsItem } from "./SettingsItem";
import withTheme from "../../utilities/Styles/withTheme";
import { ThemeAwareView } from "../../components/ThemeAwareView";
import { Sun } from "../../components/SvgIcons";
import { Moon } from "../../components/SvgIcons";
import { ThemeAwareStatusBar } from "../../components/ThemeAwareStatusBar";

export const SettingsScreen = ({
    theme,
}) => (
    <ThemeAwareView style={styles.settingsScreenContainer}>
        <ThemeAwareStatusBar />
        <View style={styles.settingsScreenHeaderContainer}>
            <SettingsItem 
                name={"Dark Mode"}
                Icon={() => {
                    return (theme.theme.type === "dark") ? <Sun />: <Moon />;
                }}
                handleOnPress={theme.toggle}
            />
        </View>
    </ThemeAwareView>
);

const styles = StyleSheet.create({
    settingsScreenContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    settingsScreenHeaderContainer: {
        flex: 1,
    },
    settingsScreenHeader: {
        fontSize: 24,
        fontWeight: "bold",
    }
})

const SettingsScreenWithTheme = withTheme(SettingsScreen);

export default SettingsScreenWithTheme;