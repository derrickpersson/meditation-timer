import React, { useState } from "react";
import { compose, withHandlers, toClass } from "recompose";
import { Audio } from "expo-av";
import { Text, Button, View, Picker } from "react-native";
import { DownArrow, UpArrow } from "../../components/SvgIcons";

export interface Props {
    playThree: () => void;
    navigation: any;
}

class MeditationScreen extends React.Component<Props, any> {
    static navigationOptions = {
        title: "Get some peace"
    };

    public constructor(props){
        super(props);
        this.state = {
            duration: 0
        };
    }

    public render() {

    const {
        playThree,
    } = this.props;

    return (
            <View style={{ flex: 1 }}>
                <Text>Focus on your breath:</Text>
                <UpArrow />
                <DownArrow />
                <Button
                    title="Meditate"
                    onPress={playThree}
                />
            </View>
    )}
};

export default compose(
    withHandlers({
        playThree: () => async () => {
            const soundObject = new Audio.Sound();
            try {
                await soundObject.loadAsync(require('./media/3-minute-meditation.mp3'));
                await soundObject.playAsync();
            // Your sound is playing!
            } catch (error) {
            // An error occurred!
            }
        }
    }),
)(MeditationScreen);