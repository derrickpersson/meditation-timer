import React, { useState } from "react";
import { compose, withHandlers, toClass } from "recompose";
import { Audio } from "expo-av";
import { Text, Button, View, TouchableOpacity, StyleSheet } from "react-native";
import { DownArrow, UpArrow } from "../../components/SvgIcons";

export interface Props {
    playMeditation: (duration: number) => void;
    navigation: any;
}

class MeditationScreen extends React.Component<Props, any> {
    static navigationOptions = {
        title: "Get some peace"
    };

    private durationOptions = [3, 5, 10, 15, 20, 30];

    public constructor(props){
        super(props);
        this.state = {
            selectedDuration: 0,
        };
    }

    public render() {

    const {
        playMeditation,
    } = this.props;

    return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <TouchableOpacity
                        style={styles.upArrowContainer}
                        onPress={() => {
                            this.setState({
                                selectedDuration: this.state.selectedDuration === 0 ? 0 : this.state.selectedDuration - 1,
                            });
                        }}
                    >
                        <DownArrow style={styles.upArrow}/>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.durationDisplay}>{this.durationOptions[this.state.selectedDuration]} Minutes</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.downArrow}
                        onPress={() => {
                            this.setState({
                                selectedDuration: this.state.selectedDuration === (this.durationOptions.length - 1) ? (this.durationOptions.length - 1) : this.state.selectedDuration + 1,
                            });
                        }}
                    >
                        <DownArrow style={{ flex: 1 }}/>
                    </TouchableOpacity>
                </View>
                <Button
                    title="Meditate"
                    onPress={() => playMeditation(this.durationOptions[this.state.selectedDuration])}
                />
            </View>
    )}
};

const styles = StyleSheet.create({
    upArrowContainer: {
        height: "50%", 
        width: "50%", 
        alignItems: "center", 
        justifyContent: "center", 
    },
    upArrow: { 
        transform: [{ rotate: '180deg' }],
    },
    downArrow: { 
        height: "50%", 
        width: "50%", 
        alignItems: "center", 
        justifyContent: "center" 
    },
    durationDisplay: {
        fontSize: 30,
    },

});


export default compose(
    withHandlers({
        playMeditation: () => async (meditationDuration: number) => {
            const soundObject = new Audio.Sound();

            const mediationFiles = {
                "3": require(`./media/3-minute-meditation.mp3`),
                "5": require(`./media/5-minute-meditation.mp3`),
                "10": require(`./media/10-minute-meditation.mp3`),
                "15": require(`./media/15-minute-meditation.mp3`),
                "20": require(`./media/20-minute-meditation.mp3`),
                "30": require(`./media/30-minute-meditation.mp3`),
            }

            try {
                await soundObject.loadAsync(mediationFiles[meditationDuration]);
                await soundObject.playAsync();
            // Your sound is playing!
            } catch (error) {
            // An error occurred!
            }
        }
    }),
)(MeditationScreen);