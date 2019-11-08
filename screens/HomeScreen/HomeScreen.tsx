import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OpenQuotationMark, CloseQuotationMark, MeditationHighlightsDivider } from '../../components';
import { Button } from '../../components/Button';
import { asyncStorageMeditationSessionRepository, MeditationRecords } from '../../utilities/MeditationSessionRepository';
import { meditationAnalysisService } from '../../utilities/MeditationAnalysisService';

export interface Props {
  navigation: any;
}

export interface State {
  weeklyMinutes: number;
  dayStreak: number;
  totalMinutes: number;
}

class HomeScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  }

  constructor(props){
    super(props);
    this.state = {
      weeklyMinutes: 0,
      dayStreak: 0,
      totalMinutes: 0,
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
    });
  }

  public render() {
  
    return (
    <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
      <View style={styles.meditationHighlightsContainer}>
        <Text style={[styles.meditationStatsHeader, styles.whiteText]}>Your practice</Text>
        <View style={styles.meditationStatsContainer}>
          <View style={styles.individualStatsContainer}>
            <Text style={[styles.headingText, styles.whiteText]}>{this.state.weeklyMinutes}</Text>
            <Text style={[styles.subheadingText, styles.whiteText]}>minutes this week</Text>
          </View>
          <View style={styles.individualStatsContainer}>
            <Text style={[styles.headingText, styles.whiteText]}>{this.state.dayStreak}</Text>
            <Text style={[styles.subheadingText, styles.whiteText]}>day streak</Text>
          </View>
          <View style={styles.individualStatsContainer}>
            <Text style={[styles.headingText, styles.whiteText]}>{this.state.totalMinutes}</Text>
            <Text style={[styles.subheadingText, styles.whiteText]}>minutes total</Text>
          </View>
        </View>
      </View>
      <View style={styles.dividers}>
        <MeditationHighlightsDivider />
      </View>
      <View style={styles.quoteContainer}>
        <View style={[styles.quotationMarkContainer, styles.openQuotation]}>
          <View style={styles.quotationMark}>
            <OpenQuotationMark />
          </View>
        </View>
        <Text style={styles.headingText}>The biggest gap is between knowing and doing</Text>
        <View style={[styles.quotationMarkContainer, styles.closeQuotation]}>
          <View style={styles.quotationMark}>
            <CloseQuotationMark />
          </View>
        </View>
      </View>
        <Button
          content="Meditate"
          onPress={() => this.props.navigation.push('MeditationSelection')}
        />
    </View>)
  }
}

const styles = StyleSheet.create({
  meditationHighlightsContainer: {
    backgroundColor: "#4464FF",
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 25,
    width: "100%",
  },
  meditationStatsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  meditationStatsHeader: {
    fontWeight: "bold",
    fontSize: 25,
  },
  individualStatsContainer: {
    flex: 1,
  },
  whiteText: {
    color: "#FFF",
  },
  headingText: {
    fontSize: 25,
    textAlign: "center",
  },
  subheadingText: {
    textAlign: "center",
    fontSize: 10,
  },
  dividers: {
    flex: 0.5,
    width: "100%",
    flexDirection: "row",
  },
  quoteContainer: {
    flex: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  quotationMarkContainer: {
    flex: 0.1,
    paddingHorizontal: 25,
    width: "100%",
  },
  quotationMark: {
    flex: 1, 
    paddingHorizontal: 25 
  },
  openQuotation: {
    alignItems: "flex-start",
    width: "100%",
    padding: 50,
  },
  closeQuotation: {
    flex: 0.1,
    alignItems: "flex-end",
    width: "100%",
    padding: 50,
  }
})

export default HomeScreen;