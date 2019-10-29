import React from "react";
import { Text, Button } from "react-native-ui-kitten";
import Sound from "react-native-sound";

Sound.setCategory('Playback');

const MeditationScreen = () => {
    const threeMin = new Sound("./media/3-minute-meditation.mp3", Sound.MAIN_BUNDLE);
    return (
        <>
            <Text>Focus on your breath:</Text>
            <Button
                onPress={() => {
                    threeMin.play();
                }}
            >
                3 minute meditation
            </Button>
        </>
)};

export default MeditationScreen;