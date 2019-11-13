import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { asyncStorageMeditationSessionRepository, MeditationRecords } from "../../utilities/MeditationSessionRepository";
import { meditationAnalysisService } from "../../utilities/MeditationAnalysisService";
import { FooterButton } from "../../components/FooterButton/FooterButton";
import AnimatedNumber from "react-native-animated-number";
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
                duration: this.props.navigation.state.params.duration,
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
            steps: 100,
            time: 30,
            formatter: numberFormatter,
            style: styles.headingText,
        }

        return (
            <View style={styles.screenContainer}>
                <View style={styles.footerSpacer}></View>                
                <View style={styles.individualStatsContainer}>
                    {this.state.dayStreak && <AnimatedNumber 
                        value={this.state.dayStreak}
                        {...animatedNumberSettings}
                    />}
                    <Text style={styles.subheadingText}>day streak</Text>
                </View>
                <View style={styles.individualStatsContainer}>
                    {this.state.weeklyMinutes && <AnimatedNumber 
                        value={this.state.weeklyMinutes} 
                        {...animatedNumberSettings}
                    />}
                    <Text style={styles.subheadingText}>minutes this week</Text>
                </View>
                <View style={styles.individualStatsContainer}>
                    {this.state.totalMinutes && <AnimatedNumber 
                        value={this.state.totalMinutes} 
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