import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ThemeAwareView } from "../../components/ThemeAwareView";
import { ThemeAwareText } from "../../components/ThemeAwareText";
import { SettingsItem } from "./SettingsItem";
import withTheme from "../../utilities/Styles/withTheme";

export const SettingsScreen = ({
    theme,
}) => (
    <ThemeAwareView style={styles.settingsScreenContainer}>
        <View style={styles.settingsScreenHeaderContainer}>
            <ThemeAwareText style={styles.settingsScreenHeader}>Settings</ThemeAwareText>
            <SettingsItem 
                name={"Dark Mode"}
                Icon={() => <View><Text>Turn to {theme.theme.type === "dark" ? "light": "dark"}</Text></View>}
                handleOnPress={theme.toggle}
            />
        </View>
    </ThemeAwareView>
);

const styles = StyleSheet.create({
    settingsScreenContainer: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 80,
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