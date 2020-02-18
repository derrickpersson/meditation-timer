import React from 'react';
import { View, Text, StyleSheet, StatusBar, Switch } from 'react-native';
import { MeditationHighlightsDivider } from '../../components';
import { asyncStorageMeditationSessionRepository, MeditationRecords } from '../../utilities/MeditationSessionRepository';
import { meditationAnalysisService } from '../../utilities/MeditationAnalysisService';
import { FooterButton } from '../../components/FooterButton/FooterButton';
import { QuotationDisplay } from '../../components/QuotationDisplay';
import { numberFormatter } from '../../utilities';
import { ThemeAwareView } from '../../components/ThemeAwareView';
import withTheme, { InjectedThemeProps } from '../../utilities/Styles/withTheme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SettingsGear } from '../../components/SvgIcons/SettingsGear';

export interface Props {
  navigation: any;
  theme: InjectedThemeProps;
}

export interface State {
  weeklyMinutes: number;
  dayStreak: number;
  totalMinutes: number;
}

export class HomeScreen extends React.Component<Props, State> {
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
        this.setStatusBar();
      }
    );
  }

  public componentWillUnmount() {
    this.didFocusSubscription.remove();
  }

  public render() {
    return (
    <ThemeAwareView style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
      <StatusBar barStyle="light-content" />
      <View style={styles.meditationHighlightsContainer}>
        <View style={styles.meditationHighlighsHeaderContainer}>
          <Text style={[styles.meditationStatsHeader, styles.lightText]}>Your practice</Text>
          <TouchableOpacity onPress={() => this.props.navigation.push('Settings')}>
            <SettingsGear width={"35px"} height={"35px"} fill={"#FFFFFF"}/>
          </TouchableOpacity>
        </View>
        <View style={styles.meditationStatsContainer}>
          <View style={styles.individualStatsContainer}>
            <Text style={[styles.headingText, styles.lightText]}>{numberFormatter(this.state.weeklyMinutes)}</Text>
            <Text style={[styles.subheadingText, styles.lightText]}>minutes this week</Text>
          </View>
          <View style={styles.individualStatsContainer}>
            <Text style={[styles.headingText, styles.lightText]}>{numberFormatter(this.state.dayStreak)}</Text>
            <Text style={[styles.subheadingText, styles.lightText]}>day streak</Text>
          </View>
          <View style={styles.individualStatsContainer}>
            <Text style={[styles.headingText, styles.lightText]}>{numberFormatter(this.state.totalMinutes)}</Text>
            <Text style={[styles.subheadingText, styles.lightText]}>minutes total</Text>
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
    </ThemeAwareView>)
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

  private setStatusBar() {
    StatusBar.setBarStyle('light-content');
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
  meditationHighlighsHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  lightText: {
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

const withThemeHomeScreen = withTheme(HomeScreen);
withThemeHomeScreen.navigationOptions = { header: null };

export default withThemeHomeScreen;