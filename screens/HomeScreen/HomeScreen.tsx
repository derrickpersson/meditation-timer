import React from 'react';
import { Layout, Text, Button } from "react-native-ui-kitten";

const ApplicationContent = ({
    navigation
}) => (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Today is your 14,022 day on this beautiful planet.</Text>
      <Text>Make the most of it!</Text>
      <Button
        onPress={() => {
            navigation.navigate('Meditation');
        }}
      >Meditate</Button>
    </Layout>
); 

export default ApplicationContent;