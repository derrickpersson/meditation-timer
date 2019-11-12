import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen, MeditationSelectionScreen, MeditationScreen, MeditationSuccessScreen } from "./screens";

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
    }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        shadowColor: 'transparent',
        elevation: 0,
      },
    },
  }
);

const AppContainer = createAppContainer(MainNavigator);

class App extends React.Component {
  public render() {
    return (<AppContainer />);
  }
}

export default App;
