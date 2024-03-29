import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';
import { compose } from "recompose";
import { withThemeSVG } from './withThemeSVG';
import { colorPalette } from '../../utilities/Styles';

const CloseQuotationMark = ({
    fill = colorPalette.black,
    stroke = colorPalette.black,
    ...props
}) => {
    return(
        <View
            style={[
            StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'center' },
            ]}
        >
            <Svg width="41px" height="29px" viewBox="0 0 41 29" {...props} >
                <G id="Concepts" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <G id="iPhone-8-Copy" transform="translate(-299.000000, -390.000000)" fill={fill} stroke={stroke}>
                        <Path d="M311.656424,393.048772 C312.829843,393.596603 313.624482,394.085414 314.040342,394.515206 C316.943334,397.515455 317,400.387842 317,401.200995 C317,403.157238 316.265203,408.991712 312.360539,413.208626 C310.836074,414.854999 307.715894,416.452124 303,418 L303,415.678186 C307.227116,413.796482 309.888446,411.862369 310.983989,409.875845 C311.969387,408.089044 313.082446,405.172486 312.556258,401.352535 C312.518837,401.080868 312.186735,400.702361 311.559952,400.217012 C310.44765,401.890063 308.49327,403 306.268068,403 C302.80631,403 300,400.313708 300,397 C300,393.686292 302.80631,391 306.268068,391 C307.957691,391 310.154286,392.106305 311.656424,393.048772 Z M333.656424,393.048772 C334.829843,393.596603 335.624482,394.085414 336.040342,394.515206 C338.943334,397.515455 339,400.387842 339,401.200995 C339,403.157238 338.265203,408.991712 334.360539,413.208626 C332.836074,414.854999 329.715894,416.452124 325,418 L325,415.678186 C329.227116,413.796482 331.888446,411.862369 332.983989,409.875845 C333.969387,408.089044 335.082446,405.172486 334.556258,401.352535 C334.518837,401.080868 334.186735,400.702361 333.559952,400.217012 C332.44765,401.890063 330.49327,403 328.268068,403 C324.80631,403 322,400.313708 322,397 C322,393.686292 324.80631,391 328.268068,391 C329.957691,391 332.154286,392.106305 333.656424,393.048772 Z" id="Combined-Shape">
                        </Path>
                    </G>
                </G>
            </Svg>
        </View>
    );
}


export default compose(
    withThemeSVG,
)(CloseQuotationMark);
