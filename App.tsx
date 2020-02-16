import React, { useEffect } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Text, View } from "react-native";
import { HomeScreen, MeditationSelectionScreen, MeditationScreen, MeditationSuccessScreen, SettingsScreen } from "./screens";
import { handleFontScaling } from './utilities/Styles';
import { useTheme, themeContext } from "./utilities/Styles/theme";
import { themeColors } from "./utilities/Styles/themeColors";
import { HeaderBackground } from './components/HeaderBackground';

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    MeditationSelection: { 
      screen: MeditationSelectionScreen 
    },
    Meditation: {
      screen: MeditationScreen
    },
    MeditationSuccess: {
      screen: MeditationSuccessScreen,
    },
    Settings: {
      screen: SettingsScreen,
    }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        shadowColor: 'transparent',
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerTransparent: true,
      headerBackground: HeaderBackground,
    },
  }
);

const AppContainer = createAppContainer(MainNavigator);

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
      type: themeState.theme.type === "light" ? "dark": "light"
    },
  });

  const calculatedThemeColors = themeColors(themeState.theme.type);

  if(!themeState.hasThemeMounted){
    return <View><Text>LOADING</Text></View>
  }

  return (
    <themeContext.Provider value={{
      theme: themeState.theme,
      themeColors: calculatedThemeColors,
      toggle,
    }}>
        <AppContainer />
    </themeContext.Provider>
  );
}

export default App;
