import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen, MeditationScreen } from "./screens";

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Meditation: { 
      screen: MeditationScreen 
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(MainNavigator);

class App extends React.Component {
  public render() {
    return (<AppContainer />);
  }
}

export default App;
