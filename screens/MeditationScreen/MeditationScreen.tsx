import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Slider } from "react-native";
import { Audio } from "expo-av";

class MeditationScreen extends React.Component<any, any> {
    private playbackInstance: any;
    private isSeeking: boolean;
    private shouldPlayAtEndOfSeek: boolean;

    constructor(props) {
        super(props);
        this.playbackInstance = null;
        this.isSeeking = false;
        this.shouldPlayAtEndOfSeek = false;
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
                <Slider 
                    style={styles.playbackSlider}
                    value={this.getSeekSliderPosition()}
                    onValueChange={this.onSeekSliderValueChange}
                    onSlidingComplete={this.onSeekSliderSlidingComplete}
                    disabled={this.state.isLoading}
                />
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

    private getSeekSliderPosition() {
        if (
          this.playbackInstance != null &&
          this.state.playbackInstancePosition != null &&
          this.state.playbackInstanceDuration != null
        ) {
          return (
            this.state.playbackInstancePosition /
            this.state.playbackInstanceDuration
          );
        }
        return 0;
    }

    private onSeekSliderValueChange = value => {
        if (this.playbackInstance != null && !this.isSeeking) {
          this.isSeeking = true;
          this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
          this.playbackInstance.pauseAsync();
        }
    };

    private onSeekSliderSlidingComplete = async value => {
        if (this.playbackInstance != null) {
          this.isSeeking = false;
          const seekPosition = value * this.state.playbackInstanceDuration;
          if (this.shouldPlayAtEndOfSeek) {
            this.playbackInstance.playFromPositionAsync(seekPosition);
          } else {
            this.playbackInstance.setPositionAsync(seekPosition);
          }
        }
    };

    private completeMeditation = () => {
        this.unloadPlaybackInstance();
        this.props.navigation.navigate('MeditationSuccess', {
            duration: this.props.navigation.state.params.duration,
        });
    }
}

const styles = StyleSheet.create({
    playbackSlider:   {
        alignSelf: "stretch"
    }
});

export default MeditationScreen;