import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

class MeditationScreen extends React.Component<any, any> {
    private playbackInstance: any;

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
        this.loadNewPlaybackInstance(this.state.isPlaying);
    }

    public render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}>
                <Text>This is the meditation screen.</Text>
                <Text>{this.getMMSSFromMillis(this.state.playbackInstancePosition)}</Text>
                <TouchableOpacity
                    onPress={this.onPlayPausePressed}
                >
                    <Text>{this.state.isPlaying ? "Pause" : "Play"}</Text>
                </TouchableOpacity>
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

    private async loadNewPlaybackInstance(playing) {
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
            shouldPlay: playing,
            volume: this.state.volume,
            isMuted: this.state.muted,
        };

        const { sound, status } = await Audio.Sound.createAsync(
            source,
            initialStatus,
            this.onPlaybackStatusUpdate
        );

        this.playbackInstance = sound;

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
}

export default MeditationScreen;