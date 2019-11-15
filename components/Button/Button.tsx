import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

export const Button = ({
    containerStyles = {},
    buttonStyles = {},
    content = "",
    onPress,
    ...props
}) => (
    <View style={[styles.actionContainer, containerStyles]}>
        <TouchableOpacity
            style={[styles.baseButtonStyles, buttonStyles]}
            onPress={onPress}
            {...props}
        >
            <Text style={styles.baseButtonContentStyle}>{content}</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    actionContainer: {
        flex: 1,
        width: '90%',
    },
    baseButtonStyles: {
        backgroundColor: "#4464FF",
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