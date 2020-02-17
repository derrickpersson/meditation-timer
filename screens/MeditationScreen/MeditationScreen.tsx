import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FooterButton } from "../../components/FooterButton/FooterButton";
import { BackNavigation } from "../../components/BackNavigation";
import { BackHandler } from 'react-native';
import { useMeditationPlaylistPlayer } from "../../utilities/useMeditationPlaylist/useMeditationPlaylistPlayer";

export interface State {
    playbackInstancePosition: number | null;
    playbackInstanceDuration: number | null;
    shouldPlay: boolean;
    isPlaying: boolean;
    isBuffering: boolean;
    isLoading: boolean;
    volume: number;
    muted: boolean;
    currentIndex: number;
    numberOfLoops: number;
    elapsedPlaytime: number,
    sumOfPreviousPlaylistDurations: number;
}

export const MeditationScreen = ({
    navigation,
}) => {
    const completeMeditation = () => {
        navigation.navigate('MeditationSuccess', {
            duration: navigation.state.params && navigation.state.params.duration,
            intention: navigation.state.params && navigation.state.params.intention,
        });
    }

    const {
        handlePlayPause,
        isPlaying,
        elapsedPlaytime,
        handleBackButtonAndroid,
    } = useMeditationPlaylistPlayer({
        duration: navigation.state.params.duration,
        handleOnComplete: completeMeditation,
    });

    const handleOnPressPlayPause = () => {
        handlePlayPause((isPlaying) => {
            navigation.setParams({ isPlaying });
        });
    }

    const getMMSSFromMillis = (millis) => {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);

        const padWithZero = number => {
            const string = number.toString();
            if (number < 10) {
                return "0" + string;
            }
            return string;
        };
        return padWithZero(minutes) + ":" + padWithZero(seconds);
    }

    const handleBackButtonPressAndroid = () => {
        handleBackButtonAndroid();
    }

    useEffect(() => {
        BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackButtonPressAndroid
        );

        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButtonPressAndroid
            );
        }
    }, []);

    return (
        <View style={styles.screenContainer}>
            <View style={styles.timerDisplayContainer}>
                <Text style={[styles.timerDisplay, !isPlaying ? styles.pausedTimerDisplay: {}]}>{getMMSSFromMillis(elapsedPlaytime)}</Text>
            </View>
            <View style={styles.footerSpacer}></View>
            <FooterButton
                onPress={handleOnPressPlayPause}
                // onLongPress={this.completeMeditation}
                content={isPlaying ? "Pause" : "Play"}
            />
        </View>
    )
}

MeditationScreen.navigationOptions = ( { navigation }) => ({
    headerLeft: () => <BackNavigation navigation={navigation} hideBackButton={navigation.getParam('isPlaying')} />,
    title: `${navigation.getParam('duration')} minute meditation`,
    headerTitleStyle: {
        fontWeight: '100',
        paddingTop: 25,
        paddingHorizontal: 25,
    },
});

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    timerDisplayContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerDisplay: {
        fontSize: 65,
    },
    pausedTimerDisplay: {
        opacity: 0.2,
    },
    footerSpacer: {
        flex: 1,
    },
});

export default MeditationScreen;