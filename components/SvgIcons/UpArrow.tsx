import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';

const UpArrow = (props) => {
    return (
        <View
            style={[
            StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'center' },
            props.style,
            ]}
        >
            <Svg width="95px" height="30px" viewBox="0 0 95 30" {...props}>
                <G id="Concepts" stroke="none" stroke-width="10" fill="none" fill-rule="evenodd">
                    <G id="iPhone-8-Copy-2" transform="translate(-139.000000, -234.000000)" stroke="#000000" stroke-width="5">
                        <Path d="M141,261.555893 C161.154001,245.185298 176.339365,237 186.55609,237 C196.772816,237 211.95818,245.185298 232.112181,261.555893" id="Path-5" strokeWidth="5" ></Path>
                    </G>
                </G>
            </Svg>
        </View>
    )
}


export default UpArrow;
