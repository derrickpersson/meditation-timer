import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { FooterButton } from "../../components/FooterButton/FooterButton";
import { BackNavigation } from "../../components/BackNavigation";
import { NavigationInjectedProps } from "react-navigation";
import { INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS, INTERRUPTION_MODE_ANDROID_DUCK_OTHERS } from "expo-av/build/Audio";

export interface State {
    playbackInstancePosition: number | null;
    playbackInstanceDuration: number | null;
    shouldPlay: boolean;
    isPlaying: boolean;
    isBuffering: boolean;
    isLoading: boolean;
    volume: number;
    muted: boolean;
}

class MeditationScreen extends React.Component<NavigationInjectedProps, State> {
    private playbackInstance: any;
    static navigationOptions = ( { navigation }) => ({
        headerLeft: () => <BackNavigation navigation={navigation} hideBackButton={navigation.getParam('isPlaying')} />,
        title: `${navigation.getParam('duration')} minute meditation`,
        headerTitleStyle: {
          fontWeight: '100',
          paddingTop: 25,
          paddingHorizontal: 25,
        },
    });

    constructor(props) {
        super(props);
        this.playbackInstance = null;
        this.state = {
            playbackInstancePosition: null,
            playbackInstanceDuration: null,
            shouldPlay: false,
            isPlaying: false,
            isBuffering: false,
            isLoading: true,
            volume: 1.0,
            muted: false,
        }
    }

    public async componentDidMount() {
        const defaultOptions = {
            playsInSilentModeIOS: false,
            allowsRecordingIOS: false,
            staysActiveInBackground: false,
            interruptionModeIOS: INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
            shouldDuckAndroid: true,
            interruptionModeAndroid: INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            playThroughEarpieceAndroid: false,
        }

        const mode = {
            ...defaultOptions,
            staysActiveInBackground: true,
        };

        try {
            await Audio.setAudioModeAsync(mode);
        } catch (error) {
            console.log("Error: ", error);
        }
        this.loadNewPlaybackInstance();
    }

    public render() {
        return (
            <View style={styles.screenContainer}>
                <View style={styles.timerDisplayContainer}>
                    <Text style={[styles.timerDisplay, !this.state.isPlaying ? styles.pausedTimerDisplay: {}]}>{this.getMMSSFromMillis(this.state.playbackInstancePosition)}</Text>
                </View>
                <View style={styles.footerSpacer}></View>
                <FooterButton
                    onPress={this.onPlayPausePressed}
                    // onLongPress={this.completeMeditation}
                    content={this.state.isPlaying ? "Pause" : "Play"}
                />
            </View>
        )
    }

    public componentWillUnmount() {
        this.unloadPlaybackInstance();
    }

    private async unloadPlaybackInstance() {
        if (this.playbackInstance != null) {
            await this.playbackInstance.unloadAsync();
            this.playbackInstance = null;
        }
    }

    private async loadNewPlaybackInstance() {
        if (this.playbackInstance != null) {
            await this.playbackInstance.stopAsync();
            await this.playbackInstance.unloadAsync();
            this.playbackInstance = null;
        }

        const duration = this.props.navigation.state.params.duration;

        const mediationFiles = {
            "3": require(`./media/3-minute-meditation.mp3`),
            "5": require(`./media/5-minute-meditation.mp3`),
            "10": require(`./media/10-minute-meditation.mp3`),
            "15": require(`./media/15-minute-meditation.mp3`),
            "20": require(`./media/20-minute-meditation.mp3`),
            "30": require(`./media/30-minute-meditation.mp3`),
        }

        const source = mediationFiles[duration];

        const initialStatus = {
            shouldPlay: false,
            volume: this.state.volume,
            isMuted: this.state.muted,
        };

        try {
            const { sound, status } = await Audio.Sound.createAsync(
                source,
                initialStatus,
                this.onPlaybackStatusUpdate,
                true, // TODO: make this false & handle buffering events
            );
        this.playbackInstance = sound;
        } catch (error) {
            console.error(`Fatal error: `, error);
            this.loadNewPlaybackInstance();
        }

        this.updateScreenForLoading(false);
    }

    private onPlaybackStatusUpdate = status => {
        if (status.isLoaded) {
            this.setState({
                playbackInstancePosition: status.positionMillis,
                playbackInstanceDuration: status.durationMillis,
                shouldPlay: status.shouldPlay,
                isPlaying: status.isPlaying,
                isBuffering: status.isBuffering,
                muted: status.isMuted,
                volume: status.volume,
            });
            if (status.didJustFinish) {
                this.completeMeditation();
            }
        } else {
            if (status.error) {
                console.log(`FATAL PLAYER ERROR: ${status.error}`);
            }
        }
    };

    private updateScreenForLoading(isLoading) {
        if (isLoading) {
            this.setState({
                isPlaying: false,
                playbackInstanceDuration: null,
                playbackInstancePosition: null,
                isLoading: true
            });
        } else {
            this.setState({
                isLoading: false
            });
        }
    }

    private onPlayPausePressed = () => {
        if (this.playbackInstance != null) {
            if (this.state.isPlaying) {
                this.playbackInstance.pauseAsync();
                this.props.navigation.setParams({ isPlaying: false });
            } else {
                this.playbackInstance.playAsync();
                this.props.navigation.setParams({ isPlaying: true });
            }
        }
    };

    private getMMSSFromMillis(millis) {
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

    private completeMeditation = () => {
        this.unloadPlaybackInstance();
        this.props.navigation.navigate('MeditationSuccess', {
            duration: this.props.navigation.state.params.duration,
        });
    }
}

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