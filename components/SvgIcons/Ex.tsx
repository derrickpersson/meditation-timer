import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';
import { compose } from "recompose";
import { withThemeSVG } from './withThemeSVG';

export const Ex = ({
    fill = "#4464FF",
    stroke = "#4464FF",
    ...props
}) => {
    const { 
        containerStyle = { alignItems: 'center', justifyContent: 'center' },
    } = props;
    return (
        <View
            style={[
            StyleSheet.absoluteFill,
            containerStyle,
            ]}
        >
            <Svg width="26px" height="26px" viewBox="0 0 26 26" {...props}>
                <G id="Concepts" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
                    <G id="iPhone-8-Copy-2" transform="translate(-22.000000, -24.000000)" fill={fill} stroke={stroke} strokeWidth="3">
                        <Path d="M35.5,37 L24,48.5 L35.5,37 L24,25.5 L35.5,37 Z M35.5,37 L47,25.5 L35.5,37 L47,48.5 L35.5,37 Z" id="Combined-Shape"></Path>
                    </G>
                </G>
            </Svg>
        </View>
    )
}

export default compose(
    withThemeSVG,
)(Ex);
