import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, MeditationSelectionScreen, MeditationScreen, MeditationSuccessScreen, SettingsScreen } from "../../screens";
import { BackNavigation } from "../BackNavigation";
import { ThankYouScreen } from "../../screens/ThankYouScreen";

export type MainNavigatorParamList = {
    Home: undefined;
    MeditationSelection: { duration: number };
    MeditationSuccess: { 
        duration: number,
        intention: string,
    };
    Meditation: { 
        duration: number,
        intention: string,
    };
    Settings: undefined;
    ThankYou: undefined;
}

const MainStack = createStackNavigator<MainNavigatorParamList>();

const navigationProps = {
    initialRouteName: 'Home' as MainNavigatorParamList["Home"],
};

const headerStyle = {
    shadowColor: 'transparent',
    borderBottomWidth: 0,
    elevation: 0,
};

const screenOptions = ({ navigation }) => ({
    headerStyle,
    headerTransparent: true,
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
        <MainStack.Screen name="MeditationSuccess" component={MeditationSuccessScreen} options={(props) => ({
            ...screenOptions(props),
            headerLeft: null,
        })}/>
        <MainStack.Screen name="Settings" component={SettingsScreen} options={{ 
            headerStyle 
        }}/>
        <MainStack.Screen name="ThankYou" component={ThankYouScreen} options={{
            headerStyle,
            headerTitle: "Thank You",
        }}/>
    </MainStack.Navigator>
);

export default MainNavigator;