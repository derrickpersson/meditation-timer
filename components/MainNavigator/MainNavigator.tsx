import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, MeditationSelectionScreen, MeditationScreen, MeditationSuccessScreen, SettingsScreen } from "../../screens";
import { HeaderBackground } from "../HeaderBackground";
import { BackNavigation } from "../BackNavigation";

const MainStack = createStackNavigator();

const navigationProps = {
    initialRouteName: 'Home',
};

const headerStyle = {
    shadowColor: 'transparent',
    borderBottomWidth: 0,
    elevation: 0,
};

const screenOptions = ({ navigation }) => ({
    headerStyle,
    headerTransparent: true,
    headerBackground: HeaderBackground,
    headerLeft: () => <BackNavigation navigation={navigation} />,
    headerTitle: null,
});

export const MainNavigator = () => (
    <MainStack.Navigator {...navigationProps }>
        <MainStack.Screen name="Home"
            component={HomeScreen}
            options={{
                ...screenOptions,
                headerShown: false
            }}
        />
        <MainStack.Screen name="MeditationSelection" component={MeditationSelectionScreen} options={screenOptions}/>
        <MainStack.Screen name="Meditation" component={MeditationScreen} options={(props) => ({ 
            ...screenOptions(props),
            headerTitle: `${props.route.params && (props.route.params as any).duration} minute meditation`,
            headerTitleStyle: {
              fontWeight: '100',
              paddingTop: 25,
              paddingHorizontal: 25,
            }, 
        })}/>
        <MainStack.Screen name="MeditationSuccess" component={MeditationSuccessScreen} options={screenOptions}/>
        <MainStack.Screen name="Settings" component={SettingsScreen} options={{ 
            headerStyle 
        }}/>
    </MainStack.Navigator>
);

export default MainNavigator;