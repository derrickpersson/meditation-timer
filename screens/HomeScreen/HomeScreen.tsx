import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OpenQuotationMark, CloseQuotationMark, MeditationHighlightsDivider } from '../../components';
import { Button } from '../../components/Button';
import { asyncStorageMeditationSessionRepository, MeditationRecords } from '../../utilities/MeditationSessionRepository';
import { meditationAnalysisService } from '../../utilities/MeditationAnalysisService';
import { Quote, quotationService } from '../../utilities/QuotationService';
import { FooterButton } from '../../components/FooterButton/FooterButton';
import { QuotationDisplay } from '../../components/QuotationDisplay';
import { numberFormatter } from '../../utilities';

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
  
  private didFocusSubscription;

  constructor(props){
    super(props);
    this.state = {
      weeklyMinutes: 0,
      dayStreak: 0,
      totalMinutes: 0,
    }
  }

  public async componentDidMount() {
    await this.fetchData();
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.fetchData();
      }
    );
  }

  public componentWillUnmount() {
    this.didFocusSubscription.remove();
  }

  public render() {
  
    return (
    <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
      <View style={styles.meditationHighlightsContainer}>
        <Text style={[styles.meditationStatsHeader, styles.whiteText]}>Your practice</Text>
        <View style={styles.meditationStatsContainer}>
          <View style={styles.individualStatsContainer}>
            <Text style={[styles.headingText, styles.whiteText]}>{numberFormatter(this.state.weeklyMinutes)}</Text>
            <Text style={[styles.subheadingText, styles.whiteText]}>minutes this week</Text>
          </View>
          <View style={styles.individualStatsContainer}>
            <Text style={[styles.headingText, styles.whiteText]}>{numberFormatter(this.state.dayStreak)}</Text>
            <Text style={[styles.subheadingText, styles.whiteText]}>day streak</Text>
          </View>
          <View style={styles.individualStatsContainer}>
            <Text style={[styles.headingText, styles.whiteText]}>{numberFormatter(this.state.totalMinutes)}</Text>
            <Text style={[styles.subheadingText, styles.whiteText]}>minutes total</Text>
          </View>
        </View>
      </View>
      <View style={styles.dividers}>
        <MeditationHighlightsDivider />
      </View>
      <QuotationDisplay />
        <FooterButton
          content="Meditate"
          onPress={() => this.props.navigation.push('MeditationSelection')}
        />
    </View>)
  }

  private async fetchData() {
    const meditationRecords: MeditationRecords = await asyncStorageMeditationSessionRepository.getMeditationSessions();
    const sessions = meditationRecords.meditationSessions;
    this.setState({
        ...this.state,
        totalMinutes: meditationAnalysisService.getTotalMeditatedMinutes(sessions),
        weeklyMinutes: meditationAnalysisService.getWeeklyMeditatedMinutes(sessions),
        dayStreak: meditationAnalysisService.getDayStreakCount(sessions),
    });
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
    fontSize: 12,
  },
  dividers: {
    flex: 0.5,
    width: "100%",
    flexDirection: "row",
  },
  footerSpacer: {
    flex: 1,
    width: "100%",
  },
})

export default HomeScreen;