import React from "react";
import { compose, withHandlers, toClass } from "recompose";
import { Audio } from "expo-av";
import { Text, Button, View } from "react-native";

export interface Props {
    playThree: () => void;
    navigation: any;
}

class MeditationScreen extends React.Component<Props, {}> {
    static navigationOptions = {
        title: "Get some peace"
    };

    public render() {

    // const {
    //     playThree,
    // } = this.props;

    return (
            <View style={{ flex: 1 }}>
                <Text>Focus on your breath:</Text>
                <Button
                    title="Meditate"
                    onPress={() => console.log("Clicked Three!")}
                />
                <Button
                    title="Go back"
                    onPress={() => {
                        console.log("Clicked!");
                        this.props.navigation.goBack();
                    }}
                />
            </View>
    )}
};

// export default compose(
//     withHandlers({
//         playThree: () => async () => {
//             const soundObject = new Audio.Sound();
//             try {
//                 await soundObject.loadAsync(require('./media/3-minute-meditation.mp3'));
//                 await soundObject.playAsync();
//             // Your sound is playing!
//             } catch (error) {
//             // An error occurred!
//             }
//         }
//     }),
// )(MeditationScreen);
export default MeditationScreen;