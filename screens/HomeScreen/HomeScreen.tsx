import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OpenQuotationMark, CloseQuotationMark, MeditationHighlightsDivider } from '../../components';
import { Button } from '../../components/Button';
import { asyncStorageMeditationSessionRepository, MeditationRecords } from '../../utilities/MeditationSessionRepository';
import { meditationAnalysisService } from '../../utilities/MeditationAnalysisService';
import { Quote, quotationService } from '../../utilities/QuotationService';
import { FooterButton } from '../../components/FooterButton/FooterButton';

export interface Props {
  navigation: any;
}

export interface State {
  weeklyMinutes: number;
  dayStreak: number;
  totalMinutes: number;
  quote: Quote;
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
      quote: { author: "", text: "" },
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
        quote: quotationService.getQuote(),
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
        <Text style={styles.headingText}>{this.state.quote.text}</Text>
        <View style={[styles.quotationMarkContainer, styles.closeQuotation]}>
          <View style={styles.quotationMark}>
            <CloseQuotationMark />
          </View>
        </View>
        <View style={styles.authorTextContainer}>
          <Text style={styles.authorText}>- {this.state.quote.author}</Text>
        </View>
      </View>
        <FooterButton
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
    fontSize: 12,
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
    paddingBottom: 50,
    paddingHorizontal: 50,
  },
  closeQuotation: {
    flex: 0.1,
    alignItems: "flex-end",
    width: "100%",
    paddingHorizontal: 50,
    paddingTop: 50,
  },
  authorTextContainer: {
    flex: 0.5,
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 25,
    paddingTop: 50,
  },
  authorText: {
    color: "#A6A3A3",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 20,
  },
  footerContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  }
})

export default HomeScreen;