import { compose, withProps } from "recompose";
import withTheme from "../../../utilities/Styles/withTheme";

export const withThemeSVG = compose(
    withTheme,
    withProps((props) => {
        const computedSVGStyles = props.isPrimary ? props.theme.themeColors.primarySVG:
            props.theme.themeColors.defaultSVG;

        return {
            ...props,
            fill: computedSVGStyles.fill,
            stroke: computedSVGStyles.stroke,
        };
    }),
);

export default withThemeSVG;