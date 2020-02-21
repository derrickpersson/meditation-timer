import React from 'react';
import Svg, { G, Rect, Ellipse, Polygon } from 'react-native-svg';
import { View } from 'react-native';
import { compose } from "recompose";
import { withThemeSVG } from './withThemeSVG';
import { colorPalette } from '../../utilities/Styles';

export const Sun = ({
    fill = colorPalette.black,
    stroke = colorPalette.black,
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
            <Svg width={width} height={height} viewBox="0 0 45 44" {...props}>
                <G id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <G id="Artboard" transform="translate(-273.000000, -482.000000)">
                        <G id="Sun" transform="translate(273.000000, 482.000000)">
                            <Ellipse id="Oval" stroke={stroke} stroke-width="1.15979381" cx="22.5765921" cy="22.5789474" rx="10.7860825" ry="10.7684211"></Ellipse>
                            <Rect id="Rectangle" fill={fill} x="21.9966952" y="0" width="1.15979381" height="9.49473684"></Rect>
                            <Polygon id="Rectangle" fill={fill} transform="translate(34.057309, 8.919165) rotate(40.000000) translate(-34.057309, -8.919165) " points="33.4816383 4.16904746 34.6406475 4.16811235 34.6329795 13.6692833 33.4739704 13.6702185"></Polygon>
                            <Polygon id="Rectangle" fill={fill} transform="translate(40.166071, 19.482526) rotate(80.000000) translate(-40.166071, -19.482526) " points="39.5884263 14.7277687 40.7463783 14.7274439 40.7437152 24.2372837 39.5857632 24.2376084"></Polygon>
                            <Polygon id="Rectangle" fill={fill} transform="translate(38.044520, 31.494737) rotate(120.000000) translate(-38.044520, -31.494737) " points="37.4619638 26.7411176 38.6203333 26.7419399 38.6270763 36.2483561 37.4687068 36.2475338"></Polygon>
                            <Polygon id="Rectangle" fill={fill} transform="translate(28.685354, 39.335151) rotate(160.000000) translate(-28.685354, -39.335151) " points="28.1030656 34.5865661 29.2626373 34.5871765 29.2676422 44.0837349 28.1080705 44.0831246"></Polygon>
                            <Polygon id="Rectangle" fill={fill} transform="translate(16.467830, 39.335151) rotate(200.000000) translate(-16.467830, -39.335151) " points="15.8905469 34.5871765 17.0501185 34.5865661 17.0451136 44.0831246 15.885542 44.0837349"></Polygon>
                            <Polygon id="Rectangle" fill={fill} transform="translate(7.108664, 31.494737) rotate(240.000000) translate(-7.108664, -31.494737) " points="6.5328509 26.7419399 7.69122041 26.7411176 7.68447735 36.2475338 6.52610784 36.2483561"></Polygon>
                            <Polygon id="Rectangle" fill={fill} transform="translate(4.987113, 19.482526) rotate(280.000000) translate(-4.987113, -19.482526) " points="4.40680588 14.7274439 5.56475788 14.7277687 5.56742092 24.2376084 4.40946892 24.2372837"></Polygon>
                            <Polygon id="Rectangle" fill={fill} transform="translate(11.095875, 8.919165) rotate(320.000000) translate(-11.095875, -8.919165) " points="10.5125367 4.16811235 11.6715459 4.16904746 11.6792138 13.6702185 10.5202046 13.6692833"></Polygon>
                        </G>
                    </G>
                </G>
            </Svg>
        </View>
    );

export default compose(
    withThemeSVG,
)(Sun);