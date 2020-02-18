import React from 'react';
import Svg, { G, Rect, Ellipse, Polygon, Path } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';
import { compose } from "recompose";
import { withThemeSVG } from './withThemeSVG';

export const Moon = ({
    fill = "#000000",
    stroke = "#000000",
    height = "44px",
    width = "45px",
    ...props
}) => (
        <View
            style={[
                // StyleSheet.absoluteFill,
                { alignItems: 'center', justifyContent: 'center' },
                props.style
            ]}
        >
        <Svg width={width} height={height} viewBox="0 0 45 44">
            <G id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <Path d="M24.9175652,8.00070462 C22.1285257,10.5013814 20.422026,13.8568274 20.422026,17.5454545 C20.422026,25.2300732 27.8286676,31.4686011 37,31.5447499 C33.9427409,34.2859147 29.5847161,36 24.7477696,36 C15.4982319,36 8,29.7319865 8,22 C8,14.2680135 15.4982319,8 24.7477696,8 C24.8044343,8 24.8610333,8.00023524 24.9175652,8.00070462 Z" id="Combined-Shape" stroke={stroke} stroke-width="0.747555556"></Path>
            </G>
        </Svg>
        </View>
    );

export default compose(
    withThemeSVG,
)(Moon);