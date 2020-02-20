import React, { useCallback, FC } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { MeditationHighlightsDivider } from '../../components';
import { FooterButton } from '../../components/FooterButton/FooterButton';
import { QuotationDisplay } from '../../components/QuotationDisplay';
import { numberFormatter } from '../../utilities';
import { ThemeAwareView } from '../../components/ThemeAwareView';
import withTheme, { InjectedThemeProps } from '../../utilities/Styles/withTheme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SettingsGear } from '../../components/SvgIcons/SettingsGear';
import { withStatsPresenter, InjectedStatsPresenterProps } from '../../utilities/useStatsPresenter';
import { compose, branch, renderComponent } from "recompose";
import HomeScreenWithoutStats from './HomeScreenWithoutStats';
import { useFocusEffect } from '@react-navigation/native';
import { withMeditationState, InjectedMeditationStateProps } from '../../utilities/useMeditationState';
import { MainNavigatorParamList } from '../../components/MainNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

export interface Props {
  navigation: StackNavigationProp<MainNavigatorParamList, 'Home'>;
  theme: InjectedThemeProps;
  statsPresenter: InjectedStatsPresenterProps;
  meditation: InjectedMeditationStateProps;
}

export const HomeScreen: FC<Props> = ({
  navigation,
  meditation,
}) => {

  const setStatusBar = () => {
    StatusBar.setBarStyle('light-content');
  }

  useFocusEffect(useCallback(() => {
    setStatusBar();
  }, []));

  return (
    <ThemeAwareView style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
      <ThemeAwareView style={styles.meditationHighlightsContainer} isPrimary={true}>
        <View style={styles.meditationHighlighsHeaderContainer}>
          <Text style={[styles.meditationStatsHeader, styles.lightText]}>Your practice</Text>
          <TouchableOpacity onPress={() => navigation.push('Settings')}>
            <SettingsGear width={"35px"} height={"35px"} fill={"#FFFFFF"}/>
          </TouchableOpacity>
        </View>
        <View style={styles.meditationStatsContainer}>
          <View style={styles.individualStatsContainer}>
            <Text style={[styles.headingText, styles.lightText]}>{numberFormatter(meditation.meditationState.weeklyMinutes)}</Text>
            <Text style={[styles.subheadingText, styles.lightText]}>minutes this week</Text>
          </View>
          <View style={styles.individualStatsContainer}>
            <Text style={[styles.headingText, styles.lightText]}>{numberFormatter(meditation.meditationState.dayStreak)}</Text>
            <Text style={[styles.subheadingText, styles.lightText]}>day streak</Text>
          </View>
          <View style={styles.individualStatsContainer}>
            <Text style={[styles.headingText, styles.lightText]}>{numberFormatter(meditation.meditationState.totalMinutes)}</Text>
            <Text style={[styles.subheadingText, styles.lightText]}>minutes total</Text>
          </View>
        </View>
      </ThemeAwareView>
      <View style={styles.dividers}>
        <MeditationHighlightsDivider isPrimary={true}/>
      </View>
      <QuotationDisplay />
        <FooterButton
          content="Meditate"
          onPress={() => navigation.push('MeditationSelection')}
        />
    </ThemeAwareView>);
}

const styles = StyleSheet.create({
  meditationHighlightsContainer: {
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

const withThemeHomeScreen = compose(
  withTheme,
  withStatsPresenter,
  branch((props: Props) => props.statsPresenter.isStatsHidden,
    renderComponent(HomeScreenWithoutStats)
  ),
  withMeditationState,
)(HomeScreen);

withThemeHomeScreen.navigationOptions = { header: null };

export default withThemeHomeScreen;