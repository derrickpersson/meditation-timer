import React from "react";
import { StyleSheet, View } from "react-native";
import { SettingsItem } from "./SettingsItem";
import withTheme from "../../utilities/Styles/withTheme";
import { ThemeAwareView } from "../../components/ThemeAwareView";
import { ThemeAwareText } from "../../components/ThemeAwareText";

export const SettingsScreen = ({
    theme,
}) => (
    <ThemeAwareView style={styles.settingsScreenContainer}>
        <View style={styles.settingsScreenHeaderContainer}>
            <SettingsItem 
                name={"Dark Mode"}
                Icon={() => <View><ThemeAwareText>Turn to {theme.theme.type === "dark" ? "light": "dark"}</ThemeAwareText></View>}
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