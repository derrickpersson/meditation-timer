import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Slider } from "react-native";
import { Audio } from "expo-av";
import { Ex } from "../../components";
import { FooterButton } from "../../components/FooterButton/FooterButton";

class MeditationScreen extends React.Component<any, any> {
    private playbackInstance: any;
    static navigationOptions = {
        header: null,
    };

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

    public componentDidMount() {
        this.loadNewPlaybackInstance();
    }

    public render() {
        return (
            <View style={styles.screenContainer}>
                <View style={styles.backNavigationContainer}>
                    <TouchableOpacity
                        style={styles.backNavigation}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Ex 
                            containerStyle={styles.backNavigationIcon}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text>{this.props.navigation.state.params.duration} minute meditation</Text>
                    </View>
                </View>
                <Text style={styles.timerDisplay}>{this.getMMSSFromMillis(this.state.playbackInstancePosition)}</Text>
                <FooterButton
                    onPress={this.onPlayPausePressed}
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
            } else {
                this.playbackInstance.playAsync();
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
        justifyContent: 'flex-start', 
        alignItems: 'center',
    },
    backNavigationContainer: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 25,
    },
    backNavigation: {
        flex: 1,
        width: "100%",
        alignItems: 'flex-start',
    },
    backNavigationIcon: {
        flex: 0.5,
    },
    timerDisplay: {
        flex: 3,
        fontSize: 50,
        justifyContent: "center",
    }
});

export default MeditationScreen;