import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { asyncStorageMeditationSessionRepository, MeditationRecords } from "../../utilities/MeditationSessionRepository";
import { meditationAnalysisService } from "../../utilities/MeditationAnalysisService";
import { FooterButton } from "../../components/FooterButton/FooterButton";

export interface Props {
    navigation: any;
}

export interface State {
    totalMinutes: number;
    dayStreak: number;
    weeklyMinutes: number;
}

export class MeditationSuccessScreen extends React.Component<Props, State> {
    static navigationOptions = {
        header: null,
    }

    constructor(props){
        super(props);

        this.state = {
            totalMinutes: 0,
            dayStreak: 0,
            weeklyMinutes: 0,
        }
    }


    public async componentDidMount() {
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
    }

    public render() {
        return (
            <View style={styles.screenContainer}>
                <View style={styles.footerSpacer}></View>                
                <View style={styles.individualStatsContainer}>
                    <Text style={styles.headingText}>{this.state.dayStreak}</Text>
                    <Text style={styles.subheadingText}>day streak</Text>
                </View>
                <View style={styles.individualStatsContainer}>
                    <Text style={styles.headingText}>{this.state.weeklyMinutes}</Text>
                    <Text style={styles.subheadingText}>minutes this week</Text>
                </View>
                <View style={styles.individualStatsContainer}>
                    <Text style={styles.headingText}>{this.state.totalMinutes}</Text>
                    <Text style={styles.subheadingText}>minutes total</Text>
                </View>
                <View style={styles.footerSpacer}></View>
                <FooterButton
                    content="Finish"
                    onPress={() => this.props.navigation.navigate('Home')}
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