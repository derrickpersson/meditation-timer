import React, { useEffect } from 'react';
import { Text, View } from "react-native";
import { handleFontScaling } from './utilities/Styles';
import { useTheme, themeContext } from "./utilities/Styles/theme";
import { themeColors, colorPalette } from "./utilities/Styles/themeColors";
import { 
  NavigationContainer,
  DarkTheme,
  DefaultTheme, 
} from '@react-navigation/native'
import { MainNavigator } from './components/MainNavigator';

const MyDarkTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    background: colorPalette.darkBackground,
    card: colorPalette.darkBackground,
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
        <NavigationContainer
          theme={themeState.theme.type === "dark" ? MyDarkTheme: DefaultTheme }
        >
          <MainNavigator />
        </NavigationContainer>
    </themeContext.Provider>
  );
}

export default App;
