import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "../Button";
import { ForceTouchGestureHandlerProperties } from "react-native-gesture-handler";

export const FooterButton = ({
    content,
    onPress,
    style = {},
}) => (
    <View style={[styles.footerContainer, style]}>
        <Button
            content={content}
            onPress={onPress}
        />
    </View>
)

const styles = StyleSheet.create({
    footerContainer: {
        position: "absolute",
        bottom: 20,
        width: "100%",
        alignItems: "center",
    },
});

export default ForceTouchGestureHandlerProperties;