import React from "react";
import { Text, Button, View, TouchableOpacity, StyleSheet } from "react-native";
import { DownArrow } from "../../components/SvgIcons";

export interface Props {
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
    const duration = this.durationOptions[this.state.selectedDuration];

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
                        <Text style={styles.durationDisplay}>{duration} Minutes</Text>
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
                    onPress={() => this.props.navigation.navigate('Meditation', { duration })}
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


export default MeditationScreen;