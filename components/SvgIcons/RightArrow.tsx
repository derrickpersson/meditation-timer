import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { View } from 'react-native';
import { compose } from "recompose";
import { withThemeSVG } from "./withThemeSVG";
import { colorPalette } from '../../utilities/Styles';

const RightArrow = ({
    stroke = colorPalette.primaryColor,
    ...props
}) => {
    return (
        <View
            style={[
                // StyleSheet.absoluteFill,
                { alignItems: 'center', justifyContent: 'center' },
                props.style,
            ]}
        >
            <Svg width="45px" height="44px" viewBox="0 0 45 44">
                <G id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <Path d="M8,29 C14.6359956,19 19.6359956,14 23,14 C26.3640044,14 31.3640044,19 38,29" id="Path-5" stroke={stroke} strokeWidth="4.643887" transform="translate(23.000000, 21.500000) rotate(90.000000) translate(-23.000000, -21.500000) "></Path>
                </G>
            </Svg>
        </View>
    )
}


export default compose(
    withThemeSVG,
)(RightArrow);