import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { asyncStorageMeditationSessionRepository, MeditationRecords } from "../../utilities/MeditationSessionRepository";
import { meditationAnalysisService } from "../../utilities/MeditationAnalysisService";
import { FooterButton } from "../../components/FooterButton/FooterButton";
import AnimateNumber from "react-native-animate-number";
import { numberFormatter } from "../../utilities/numberFormatter";
import { ScreenContainerView } from "../../components/ScreenContainerView";
import { MainNavigatorParamList } from "../../components/MainNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ThemeAwareText } from "../../components/ThemeAwareText";
import withTheme, { InjectedThemeProps } from "../../utilities/Styles/withTheme";

export interface State {
    totalMinutes: number;
    dayStreak: number;
    weeklyMinutes: number;
}

export type Prop = {
    route: RouteProp<MainNavigatorParamList, 'MeditationSuccess'>,
    navigation: StackNavigationProp<MainNavigatorParamList, 'MeditationSuccess'>,
    theme: InjectedThemeProps,
}

export class MeditationSuccessScreen extends React.Component<Prop, State> {
    static navigationOptions = {
        header: null,
    }

    public constructor(props){
        super(props);

        this.state = {
            totalMinutes: null,
            dayStreak: null,
            weeklyMinutes: null,
        }
    }


    public async componentDidMount() {
        const meditationRecords: MeditationRecords = await asyncStorageMeditationSessionRepository.getMeditationSessions();
        const sessions = meditationRecords.meditationSessions;
        this.setState({
            ...this.state,
            totalMinutes: meditationAnalysisService.getTotalMeditatedMinutes(sessions),
            weeklyMinutes: meditationAnalysisService.getWeeklyMeditatedMinutes(sessions),
            dayStreak: meditationAnalysisService.getDayStreakCount(sessions),
        }, async () => {
            await asyncStorageMeditationSessionRepository.createMeditationSession({
                duration: this.props.route.params && this.props.route.params.duration,
                intention: this.props.route.params && this.props.route.params.intention,
                createdDate: new Date(),
            });
            const meditationRecords: MeditationRecords = await asyncStorageMeditationSessionRepository.getMeditationSessions();
            const sessions = meditationRecords.meditationSessions;
            this.setState({
                ...this.state,
                totalMinutes: meditationAnalysisService.getTotalMeditatedMinutes(sessions),
                weeklyMinutes: meditationAnalysisService.getWeeklyMeditatedMinutes(sessions),
                dayStreak: meditationAnalysisService.getDayStreakCount(sessions),
            });
        });
    }

    public render() {

        const animatedNumberSettings = {
            formatter: numberFormatter,
            style: [styles.headingText, this.props.theme.themeColors.defaultText],
            timing: "easeIn",
            countBy: 1
        }

        return (
            <ScreenContainerView style={styles.screenContainer}>
                <View style={styles.footerSpacer}></View>                
                <View style={styles.individualStatsContainer}>
                    {!!this.state.dayStreak && <AnimateNumber 
                        value={this.state.dayStreak || 0}
                        {...animatedNumberSettings}
                    />}
                    <ThemeAwareText style={styles.subheadingText}>day streak</ThemeAwareText>
                </View>
                <View style={styles.individualStatsContainer}>
                    {!!this.state.weeklyMinutes && <AnimateNumber 
                        value={this.state.weeklyMinutes || 0} 
                        {...animatedNumberSettings}
                    />}
                    <ThemeAwareText style={styles.subheadingText}>minutes this week</ThemeAwareText>
                </View>
                <View style={styles.individualStatsContainer}>
                    {!!this.state.totalMinutes && <AnimateNumber 
                        value={this.state.totalMinutes || 0} 
                        {...animatedNumberSettings}
                    />}
                    <ThemeAwareText style={styles.subheadingText}>minutes total</ThemeAwareText>
                </View>
                <View style={styles.footerSpacer}></View>
                <FooterButton
                    content="Finish"
                    onPress={() => (this.props.navigation as any).popToTop()}
                />
            </ScreenContainerView>
        )
    }
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

export default withTheme(MeditationSuccessScreen);