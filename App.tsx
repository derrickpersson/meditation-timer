import React from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { HomeScreen, MeditationScreen } from "./screens";

const MainNavigator = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    Meditation: { screen: MeditationScreen },
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(MainNavigator);

const App = () => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <AppContainer />
  </ApplicationProvider>
);

export default App;
