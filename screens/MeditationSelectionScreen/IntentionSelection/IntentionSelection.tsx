import React, { FC } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { ThemeAwareText } from "../../../components/ThemeAwareText";
import { colorPalette } from "../../../utilities/Styles";

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
        <SVGIcon colour={isSelected ? colorPalette.primaryColor : false}/>
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