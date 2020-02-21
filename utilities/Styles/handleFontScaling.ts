import { Text } from "react-native";

export const handleFontScaling = () => {
    if (Text.defaultProps == null){
        Text.defaultProps = {};
    };
    Text.defaultProps.allowFontScaling = true;
    Text.defaultProps.maxFontSizeMultiplier = 1.25;
};

export default handleFontScaling;