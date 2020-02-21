import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ThemeAwareTouchableOpacity } from "../ThemeAwareTouchableOpacity";

export const Button = ({
    containerStyles = {},
    buttonStyles = {},
    content = "",
    onPress,
    ...props
}) => (
    <View style={[styles.actionContainer, containerStyles]}>
        <ThemeAwareTouchableOpacity
            style={[styles.baseButtonStyles, buttonStyles]}
            onPress={onPress}
            isPrimary={true}
            {...props}
        >
            <Text style={styles.baseButtonContentStyle}>{content}</Text>
        </ThemeAwareTouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    actionContainer: {
        flex: 1,
        width: '90%',
    },
    baseButtonStyles: {
        borderRadius: 10,
        padding: 10,
    },
    baseButtonContentStyle: {
        textAlign: "center",
        color: "#FFF",
        fontSize: 20,
    }
});

export default Button;