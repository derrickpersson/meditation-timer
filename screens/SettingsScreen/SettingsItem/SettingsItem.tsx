import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeAwareText } from "../../../components/ThemeAwareText";

export const SettingsItem = ({
    name,
    Icon,
    handleOnPress,
}) => (
    <View style={styles.settingsItemContainer}>
        <ThemeAwareText style={styles.settingsItemTitleText}>{name}</ThemeAwareText>
        <TouchableOpacity onPress={handleOnPress}>
            <Icon />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    settingsItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 24,
        alignItems: "center",
    },
    settingsItemTitleText: {
        fontSize: 18,
    }
})

export default SettingsItem;