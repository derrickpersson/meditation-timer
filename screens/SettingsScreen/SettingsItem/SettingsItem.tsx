import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeAwareText } from "../../../components/ThemeAwareText";

export interface Props {
    name: string;
    Icon: React.ComponentType;
    handleOnPress?: (event: any) => void;
}

export const SettingsItem: FC<Props> = ({
    name,
    Icon,
    handleOnPress,
}) => (
    <View style={styles.settingsItemContainer}>
        <ThemeAwareText style={styles.settingsItemTitleText}>{name}</ThemeAwareText>
        {!!handleOnPress ? <TouchableOpacity onPress={handleOnPress}>
            <Icon />
        </TouchableOpacity>:
        <Icon/>
        }
    </View>
);

const styles = StyleSheet.create({
    settingsItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 24,
        alignItems: "center",
        height: 44,
    },
    settingsItemTitleText: {
        fontSize: 18,
    }
})

export default SettingsItem;