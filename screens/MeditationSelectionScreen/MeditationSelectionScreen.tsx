import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { DownArrow, UpArrow } from "../../components/SvgIcons";
import { NavigationInjectedProps } from "react-navigation";
import { FooterButton } from "../../components/FooterButton/FooterButton";
import { BackNavigation } from "../../components/BackNavigation";

class MeditationScreen extends React.Component<NavigationInjectedProps, any> {
    static navigationOptions = ( { navigation }) => ({
        headerLeft: () => <BackNavigation navigation={navigation} />,
    });

    private durationOptions = [3, 5, 10, 15, 20, 30];

    public constructor(props){
        super(props);
        this.state = {
            selectedDuration: 0,
            instructionText: "",
        };
    }

    public componentDidMount(){
        this.setState({
            ...this.state,
            instructionText: this.getInstructionText(),
        });
    }

    public render() {
    const duration = this.durationOptions[this.state.selectedDuration];

    return (
            <View style={styles.screenContainer}>
                <View style={styles.instructionsContainer}>
                    <Text style={styles.instructionsText}>{this.state.instructionText}</Text>
                </View>
                <View style={styles.selectionContainer}>
                    <TouchableOpacity
                        style={styles.upArrowContainer}
                        onPress={() => {
                            this.setState({
                                selectedDuration: this.state.selectedDuration === 0 ? 0 : this.state.selectedDuration - 1,
                            });
                        }}
                    >
                        <UpArrow />
                    </TouchableOpacity>
                    <View style={styles.durationDisplayContainer}>
                        <View style={{flex: 1}}>

                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.durationDisplay}>{duration}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.durationUnitText}>minutes</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.downArrow}
                        onPress={() => {
                            this.setState({
                                selectedDuration: this.state.selectedDuration === (this.durationOptions.length - 1) ? (this.durationOptions.length - 1) : this.state.selectedDuration + 1,
                            });
                        }}
                    >
                        <DownArrow />
                    </TouchableOpacity>
                </View>
                <View style={styles.footerSpacer}></View>
                    <FooterButton
                        content="Set Meditation"
                        onPress={() => this.props.navigation.navigate('Meditation', { duration })}
                    />
            </View>
    )}

    private getInstructionText() {
        const instructionTexts = [
            "Take a minute for yourself",
            "Be present.",
            "Your to do’s can wait",
            "Just focus on your breathe",
            "You deserve this",
        ];

        const randomIndex = (Math.floor(Math.random() * 100)) % instructionTexts.length;
        return instructionTexts[randomIndex];
    }
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'space-around', 
        alignItems: 'center',
    },
    instructionsContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    instructionsText: {
        fontSize: 25,
        fontStyle: "italic",
    },
    selectionContainer: {
        flex: 4,
        justifyContent: "flex-start",
        width: "100%",
    },
    upArrowContainer: {
        flex: 0.5,
        alignItems: "center", 
        justifyContent: "center", 
    },
    downArrow: { 
        flex: 0.5,
        alignItems: "center", 
        justifyContent: "center" 
    },
    durationDisplayContainer: {
        flex: 0.25,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        width: "100%",
    },
    durationDisplay: {
        textAlign: "center",
        fontSize: 45,
    },
    durationUnitText: {
        fontSize: 20,
        paddingBottom: 5,
    },
    footerSpacer: {
        flex: 1,
    },
});


export default MeditationScreen;