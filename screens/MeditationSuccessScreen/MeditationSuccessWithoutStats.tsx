import React, { useEffect, FC } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { FooterButton } from "../../components/FooterButton/FooterButton";
import { ScreenContainerView } from "../../components/ScreenContainerView";
import { MainNavigatorParamList } from "../../components/MainNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ThemeAwareText } from "../../components/ThemeAwareText";
import { compose } from "recompose";
import { withMeditationState, InjectedMeditationStateProps } from "../../utilities/useMeditationState";
import { InjectedStatsPresenterProps } from "../../utilities/useStatsPresenter";
import { MeditationHighlightsDivider } from "../../components";
import randomTextGetter from "../../utilities/randomTextGetter";


export interface Props {
    route: RouteProp<MainNavigatorParamList, 'MeditationSuccess'>;
    navigation: StackNavigationProp<MainNavigatorParamList, 'MeditationSuccess'>;
    meditation: InjectedMeditationStateProps;
    statsPresenter: InjectedStatsPresenterProps;
}

export const MeditationSuccessWithoutStats: FC<Props> = ({
    meditation,
    navigation,
    route,
}) => {
    const setStatusBar = () => {
        StatusBar.setBarStyle('light-content');
    }

    useEffect(() => {
        setStatusBar();
    }, []);

    useEffect(() => {
       meditation.updateMeditationSessions({
            duration: route.params && route.params.duration,
            intention: route.params && route.params.intention,
            createdDate: new Date(),
       });
    }, []);

    return (
        <ScreenContainerView style={styles.screenContainer}>
            <MeditationHighlightsDivider isPrimary={true} />
            <View style={styles.encouragingTextContainer}>
                <ThemeAwareText style={styles.encouragingText}>{getEncouragingText()}</ThemeAwareText>
            </View>
            <FooterButton
                content="Finish"
                onPress={() => (navigation as any).popToTop()}
            />
        </ScreenContainerView>
    )
};

const getEncouragingText = () => {
    const quotes = [
        "Have a great day!",
        "Keep being amazing!",
        "Enjoy your day!",
        "Way to go!",
        "Great session, keep it up!",
    ];

    return randomTextGetter(quotes);
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    encouragingTextContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 40,
    },
    encouragingText: {
        fontSize: 30,
    },
})

export default compose(
    withMeditationState,
)(MeditationSuccessWithoutStats);

