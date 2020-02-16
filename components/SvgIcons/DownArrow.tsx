import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';
import { compose } from "recompose";
import { withThemeSVG } from "./withThemeSVG";

const DownArrow = ({
    stroke = "#000000",
    ...props
}) => {
    return (
        <View
            style={[
            StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'center' },
            props.style,
            ]}
        >
            <Svg width="95px" height="30px" viewBox="0 0 95 30">
                <G id="Concepts" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
                    <G id="iPhone-8-Copy-2" transform="translate(-139.000000, -428.000000)" stroke={stroke} strokeWidth="5">
                        <Path d="M141,454.555893 C161.154001,438.185298 176.339365,430 186.55609,430 C196.772816,430 211.95818,438.185298 232.112181,454.555893" id="Path-5" transform="translate(186.556090, 442.277947) rotate(-180.000000) translate(-186.556090, -442.277947) "></Path>
                    </G>
                </G>
            </Svg>
        </View>
    )
}


export default compose(
    withThemeSVG,
)(DownArrow);
