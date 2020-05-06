import React, { useEffect } from 'react';
import { ActivityIndicator } from "react-native";
import { handleFontScaling } from './utilities/Styles';
import { useTheme, themeContext } from "./utilities/Styles/theme";
import { themeColors, colorPalette } from "./utilities/Styles/themeColors";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native'
import { MainNavigator } from './components/MainNavigator';
import { useStatsPresenter } from './utilities/useStatsPresenter';
import { statsPresenterContext } from './utilities/useStatsPresenter';
import { useMeditationState, meditationStateContext } from './utilities/useMeditationState';

const MyDarkTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    background: colorPalette.darkBackground,
    card: colorPalette.darkBackground,
    primary: colorPalette.darkPrimaryColor,
  }
}

const MyDefaultTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: colorPalette.primaryColor,
  }
}

const App = () => {
  useEffect(() => {
    handleFontScaling();
  }, []);

  const {
    themeState,
    setThemeState,
  } = useTheme();

  const toggle = () => setThemeState({
    ...themeState,
    theme: {
      type: themeState.theme.type === "light" ? "dark" : "light"
    },
  });

  const calculatedThemeColors = themeColors(themeState.theme.type);

  const { isStatsHidden, setStatsHidden } = useStatsPresenter();
  const toggleStats = () => setStatsHidden(!isStatsHidden);

  const { meditationState, updateMeditationSessions } = useMeditationState();

  if (!themeState.hasThemeMounted) {
    return <ActivityIndicator size="large" color={colorPalette.primaryColor}/>
  }

  return (
    <themeContext.Provider value={{
      theme: themeState.theme,
      themeColors: calculatedThemeColors,
      toggle,
    }}>
      <statsPresenterContext.Provider value={{
        isStatsHidden,
        toggleStats,
      }}>
        <meditationStateContext.Provider value={{
          meditationState,
          updateMeditationSessions,
        }}>
          <NavigationContainer
            theme={themeState.theme.type === "dark" ? MyDarkTheme : MyDefaultTheme}
          >
            <MainNavigator />
          </NavigationContainer>
        </meditationStateContext.Provider>
      </statsPresenterContext.Provider>
    </themeContext.Provider>
  );
}

export default App;
