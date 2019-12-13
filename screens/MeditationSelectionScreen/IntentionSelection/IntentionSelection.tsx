import React, { FC } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, StyleSheet } from "react-native";

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
        <Text>{value.toUpperCase()}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    intentionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default IntentionSelection;