import React from 'react';
import Svg, { G, Path, Circle } from 'react-native-svg';
import { View } from 'react-native';

const HeartCircle = (props) => {
    return (
        <View
            style={[
            // StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'center' },
            props.style,
            ]}
        >
            <Svg width="50px" height="50px" viewBox="0 0 50 50">
                <G id="Icons-/-Circle-/-Heart" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <G id="Icons-/-Heart" transform="translate(9.000000, 12.000000)" fill={props.colour ||"#979797"}>
                        <Path d="M3.30466259,15.5403568 C1.29060879,13.9426481 0,11.4811418 0,8.71986499 C0,3.90401654 3.9257292,0 8.76836158,0 C11.7700354,0 14.4194297,1.49994607 16,3.78725698 C17.5805703,1.49994607 20.2299646,0 23.2316384,0 C28.0742708,0 32,3.90401654 32,8.71986499 C32,11.0914744 31.0479472,13.2419498 29.5031837,14.8139366 C29.293945,15.0837335 29.0541195,15.3362889 28.7841046,15.5665938 L17.2573028,25.3981941 C16.2822372,26.2298606 14.8394231,26.2014856 13.8978107,25.3321249 L3.51724408,15.7480796 C3.44422931,15.6806674 3.37335338,15.6113912 3.30466259,15.5403568 Z" id="Heart"></Path>
                    </G>
                    <Circle id="Oval" stroke={props.colour ||"#979797"} stroke-width="4" cx="25" cy="25" r="24"></Circle>
                </G>
            </Svg>
        </View>
    )
}


export default HeartCircle;
