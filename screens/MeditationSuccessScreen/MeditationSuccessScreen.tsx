import React from "react";
import { View, Text } from "react-native";
import { asyncStorageMeditationSessionRepository, MeditationSession, MeditationRecords } from "../../utilities/MeditationSessionRepository";
import { meditationAnalysisService } from "../../utilities/MeditationAnalysisService";

export interface Props {
    navigation: any;
}

export interface State {
    totalMinutes: number;
    streak: number;
    weeklyMinutes: number;
}

export class MeditationSuccessScreen extends React.Component<Props, State> {
    constructor(props){
        super(props);

        this.state = {
            totalMinutes: 0,
            streak: 0,
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
            streak: meditationAnalysisService.getDayStreakCount(sessions),
        });
    }

    public render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>Congrats! You meditated!</Text>
                <Text>Total Minutes: {this.state.totalMinutes}</Text>
                <Text>Weekly Minutes: {this.state.weeklyMinutes}</Text>
                <Text>Streak: {this.state.streak}</Text>
            </View>
        )
    }
}

export default MeditationSuccessScreen;