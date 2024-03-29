import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';
import { compose } from "recompose";
import { withThemeSVG } from './withThemeSVG';
import { colorPalette } from '../../utilities/Styles';

const MeditationHighlightsDivider = ({
    fill = colorPalette.primaryColor,
    stroke = colorPalette.primaryColor,
    ...props
}) => {
    return(
        <View
            style={[
            StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'flex-start' },
            ]}
        >
            <Svg width="100%" height="78px" viewBox="0 0 375 78" preserveAspectRatio="none">
                <G id="Concepts" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <G id="iPhone-8-Copy" transform="translate(0.000000, -117.000000)" fill={fill} stroke={stroke}>
                        <Path d="M0.5,117.5 L0.5,169.148455 C31.8617487,151.718255 63.1224152,143 94.276611,143 C125.678547,143 156.837968,151.857484 187.735294,169.558824 C218.915089,186.188047 250.084911,194.5 281.25,194.5 C312.326895,194.5 343.408497,186.235024 374.5,169.6998 L374.5,117.5 L0.5,117.5 Z" id="Rectangle"></Path>
                    </G>
                </G>
            </Svg>
        </View>
    );
}
export default compose(
    withThemeSVG,
)(MeditationHighlightsDivider);
