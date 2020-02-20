import React, { useEffect, FC, useState } from "react";
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
import { FadeInView } from "../../components/FadeInView";


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
    const [encouragingText, setEncouragingText] = useState("");

    useEffect(() => {
        setEncouragingText(getEncouragingText());
        return () => {
            setEncouragingText("");
        }
    });

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
            <FadeInView style={styles.encouragingTextContainer} duration={1500}>
                <ThemeAwareText style={styles.encouragingText}>{encouragingText}</ThemeAwareText>
            </FadeInView>
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

