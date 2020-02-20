import React, { FC } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, StyleSheet } from "react-native";
import { ThemeAwareText } from "../../../components/ThemeAwareText";

interface Props {
    handleSelection: (value: string) => void;
    isSelected: boolean;
    SVGIcon: React.ReactElement | any;
    value: string;
}

export const IntentionSelection: FC<Props> = ({
    handleSelection,
    isSelected,
    SVGIcon,
    value
}) => (
    <TouchableOpacity
        onPress={() => handleSelection(value)}
        style={styles.intentionContainer}
    >
        <SVGIcon colour={isSelected ? "#4464FF" : false}/>
        <ThemeAwareText style={styles.intentionText}>{value}</ThemeAwareText>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    intentionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    intentionText: {
        marginTop: 8,
    }
})

export default IntentionSelection;