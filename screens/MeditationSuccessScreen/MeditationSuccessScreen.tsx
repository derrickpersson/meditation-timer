import React, { useEffect, FC } from "react";
import { View, StyleSheet } from "react-native";
import { FooterButton } from "../../components/FooterButton/FooterButton";
import AnimateNumber from "react-native-animate-number";
import { numberFormatter } from "../../utilities/numberFormatter";
import { ScreenContainerView } from "../../components/ScreenContainerView";
import { MainNavigatorParamList } from "../../components/MainNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ThemeAwareText } from "../../components/ThemeAwareText";
import withTheme, { InjectedThemeProps } from "../../utilities/Styles/withTheme";
import { compose, branch, renderComponent } from "recompose";
import { withMeditationState, InjectedMeditationStateProps } from "../../utilities/useMeditationState";
import { InjectedStatsPresenterProps, withStatsPresenter } from "../../utilities/useStatsPresenter";
import MeditationSuccessWithoutStats from "./MeditationSuccessWithoutStats";

export interface Props {
    route: RouteProp<MainNavigatorParamList, 'MeditationSuccess'>;
    navigation: StackNavigationProp<MainNavigatorParamList, 'MeditationSuccess'>;
    theme: InjectedThemeProps;
    meditation: InjectedMeditationStateProps;
    statsPresenter: InjectedStatsPresenterProps;
}

export const MeditationSuccessScreen: FC<Props> = ({
    meditation,
    navigation,
    route,
    theme,
}) => {
    useEffect(() => {
       meditation.updateMeditationSessions({
            duration: route.params && route.params.duration,
            intention: route.params && route.params.intention,
            createdDate: new Date(),
       });
    }, []);

    const animatedNumberSettings = {
        formatter: numberFormatter,
        style: [styles.headingText, theme.themeColors.defaultText],
        timing: "easeIn",
        countBy: 1
    }

    return (
        <ScreenContainerView style={styles.screenContainer}>
            <View style={styles.footerSpacer}></View>                
            <View style={styles.individualStatsContainer}>
                {!!meditation.meditationState.dayStreak && <AnimateNumber 
                    value={meditation.meditationState.dayStreak}
                    {...animatedNumberSettings}
                />}
                <ThemeAwareText style={styles.subheadingText}>day streak</ThemeAwareText>
            </View>
            <View style={styles.individualStatsContainer}>
                {!!meditation.meditationState.weeklyMinutes && <AnimateNumber 
                    value={meditation.meditationState.weeklyMinutes} 
                    {...animatedNumberSettings}
                />}
                <ThemeAwareText style={styles.subheadingText}>minutes this week</ThemeAwareText>
            </View>
            <View style={styles.individualStatsContainer}>
                {!!meditation.meditationState.totalMinutes && <AnimateNumber 
                    value={meditation.meditationState.totalMinutes} 
                    {...animatedNumberSettings}
                    countBy={3}
                />}
                <ThemeAwareText style={styles.subheadingText}>minutes total</ThemeAwareText>
            </View>
            <View style={styles.footerSpacer}></View>
            <FooterButton
                content="Finish"
                onPress={() => (navigation as any).popToTop()}
            />
        </ScreenContainerView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    individualStatsContainer: {
        flex: 1,
    },
    headingText: {
        fontSize: 45,
        textAlign: "center",
    },
    subheadingText: {
        textAlign: "center",
        fontSize: 20,
    },
    footerSpacer: {
        flex: 1,
    },
})

const MeditationSuccessScreenWithInjectedProps = compose(
    withTheme,
    withMeditationState,
    withStatsPresenter,
    branch((props: Props) => props.statsPresenter.isStatsHidden,
        renderComponent(MeditationSuccessWithoutStats),
    ),
)(MeditationSuccessScreen);

MeditationSuccessScreenWithInjectedProps.navigationOptions = { header: null };

export default MeditationSuccessScreenWithInjectedProps;