import React from 'react';
import { View, Text, Button } from 'react-native';

export interface Props {
  navigation: any;
}

class HomeScreen extends React.Component<Props, {}> {
  static navigationOptions = {
    title: 'Home',
  };

  public render() {
  
    return (
    <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
      <Text>Today is your 14,022 day on this beautiful planet.</Text>
      <Text>Make the most of it!</Text>
      <View style={{ width: '90%' }}>
        <Button
          title="Meditate"
          
          onPress={() => this.props.navigation.push('Meditation')}
        />
      </View>
    </View>)
  }
}

export default HomeScreen;