import React from "react";
import { Platform, View, StyleSheet } from "react-native";
import { Button } from "../Button";
import { ForceTouchGestureHandlerProperties } from "react-native-gesture-handler";

export const FooterButton = ({
    content,
    onPress,
    style = {},
    ...props
}) => (
    <View style={[styles.footerContainer, style]}>
        <Button
            content={content}
            onPress={onPress}
            {...props}
        />
    </View>
)

const styles = StyleSheet.create({
    footerContainer: {
        position: "absolute",
        bottom: Platform.OS === 'ios' ? 40 : 20,
        width: "100%",
        alignItems: "center",
    },
});

export default ForceTouchGestureHandlerProperties;