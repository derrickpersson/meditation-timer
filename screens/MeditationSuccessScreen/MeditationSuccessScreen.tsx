import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { asyncStorageMeditationSessionRepository, MeditationRecords } from "../../utilities/MeditationSessionRepository";
import { meditationAnalysisService } from "../../utilities/MeditationAnalysisService";
import { FooterButton } from "../../components/FooterButton/FooterButton";
import AnimateNumber from "react-native-animate-number";
import { numberFormatter } from "../../utilities/numberFormatter";
import { NavigationInjectedProps } from "react-navigation";

export interface State {
    totalMinutes: number;
    dayStreak: number;
    weeklyMinutes: number;
}

export class MeditationSuccessScreen extends React.Component<NavigationInjectedProps, State> {
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
                duration: this.props.navigation.state.params && this.props.navigation.state.params.duration,
                intention: this.props.navigation.state.params && this.props.navigation.state.params.intention,
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
            style: styles.headingText,
            timing: "easeIn",
            countBy: 1
        }

        return (
            <View style={styles.screenContainer}>
                <View style={styles.footerSpacer}></View>                
                <View style={styles.individualStatsContainer}>
                    {!!this.state.dayStreak && <AnimateNumber 
                        value={this.state.dayStreak || 0}
                        {...animatedNumberSettings}
                    />}
                    <Text style={styles.subheadingText}>day streak</Text>
                </View>
                <View style={styles.individualStatsContainer}>
                    {!!this.state.weeklyMinutes && <AnimateNumber 
                        value={this.state.weeklyMinutes || 0} 
                        {...animatedNumberSettings}
                    />}
                    <Text style={styles.subheadingText}>minutes this week</Text>
                </View>
                <View style={styles.individualStatsContainer}>
                    {!!this.state.totalMinutes && <AnimateNumber 
                        value={this.state.totalMinutes || 0} 
                        {...animatedNumberSettings}
                    />}
                    <Text style={styles.subheadingText}>minutes total</Text>
                </View>
                <View style={styles.footerSpacer}></View>
                <FooterButton
                    content="Finish"
                    onPress={() => (this.props.navigation as any).popToTop()}
                />
            </View>
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

export default MeditationSuccessScreen;