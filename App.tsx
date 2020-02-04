import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Text } from "react-native";
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
        borderBottomWidth: 0,
        elevation: 0,
      },
    },
  }
);

const AppContainer = createAppContainer(MainNavigator);

class App extends React.Component {
  public constructor(props){
    super(props);
    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = true;
    Text.defaultProps.maxFontSizeMultiplier = 1.25;
  }

  public render() {
    return (<AppContainer />);
  }
}

export default App;
