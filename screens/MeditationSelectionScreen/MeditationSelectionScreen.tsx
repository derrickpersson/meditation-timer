import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { DownArrow, UpArrow } from "../../components/SvgIcons";
import { NavigationInjectedProps } from "react-navigation";
import { FooterButton } from "../../components/FooterButton/FooterButton";
import { BackNavigation } from "../../components/BackNavigation";
import GrattitudeCircle from "../../components/SvgIcons/GrattitudeCircle";
import HeartCircle from "../../components/SvgIcons/HeartCircle";
import BalanceCircle from "../../components/SvgIcons/BalanceCircle";
import { IntentionSelection } from "./IntentionSelection";

class MeditationScreen extends React.Component<NavigationInjectedProps, any> {
    static navigationOptions = ( { navigation }) => ({
        headerLeft: () => <BackNavigation navigation={navigation} />,
    });

    private durationOptions = [3, 5, 10, 15, 20, 30];

    public constructor(props){
        super(props);
        this.state = {
            selectedDuration: 2,
            instructionText: "",
            selectedIntention: "",
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

    const minSelected = this.state.selectedDuration === 0;
    const maxSelected = this.state.selectedDuration === (this.durationOptions.length - 1);

    return (
            <View style={styles.screenContainer}>
                <View style={styles.headingTextContainer}>
                    <Text style={styles.headingText}>{this.state.instructionText}</Text>
                </View>
                <View style={styles.selectionContainer}>
                    <TouchableOpacity
                        style={[styles.upArrowContainer]}
                        onPress={() => {
                            this.setState({
                                selectedDuration: this.state.selectedDuration === (this.durationOptions.length - 1) ? (this.durationOptions.length - 1) : this.state.selectedDuration + 1,
                            });
                        }}
                    >
                        <UpArrow style={maxSelected ? styles.disabledArrow: styles.enabledArrow}/>
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
                        style={[styles.downArrow]}
                        onPress={() => {
                            this.setState({
                                selectedDuration: this.state.selectedDuration === 0 ? 0 : this.state.selectedDuration - 1,
                            });
                        }}
                    >
                        <DownArrow style={minSelected ? styles.disabledArrow: styles.enabledArrow}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.headingTextContainer}>
                    <Text style={styles.headingText}>Set today's intention</Text>
                </View>
                <View style={styles.intentionContainer}>
                    <IntentionSelection
                        handleSelection={this.handleIntentionSelection}
                        SVGIcon={GrattitudeCircle}
                        value={"gratitude"}
                        isSelected={this.state.selectedIntention === "gratitude"}
                    />
                    <IntentionSelection
                        handleSelection={this.handleIntentionSelection}
                        SVGIcon={HeartCircle}
                        value={"love"}
                        isSelected={this.state.selectedIntention === "love"}
                    />
                    <IntentionSelection
                        handleSelection={this.handleIntentionSelection}
                        SVGIcon={BalanceCircle}
                        value={"balance"}
                        isSelected={this.state.selectedIntention === "balance"}
                    />
                </View>
                <View style={styles.footerSpacer}></View>
                <FooterButton
                    content="Set Meditation"
                    onPress={() => this.props.navigation.navigate('Meditation', { 
                        duration,
                        intention: this.state.selectedIntention,
                     })}
                />
            </View>
    )}

    private getInstructionText() {
        const instructionTexts = [
            "Take a minute for yourself",
            "Be present",
            "Your to do’s can wait",
            "Just focus on your breath",
            "You deserve this",
        ];

        const randomIndex = (Math.floor(Math.random() * 100)) % instructionTexts.length;
        return instructionTexts[randomIndex];
    }

    private handleIntentionSelection = (value) => {
        if(this.state.selectedIntention === value) {
            this.setState({
                ...this.state,
                selectedIntention: "",
            });
        } else {
            this.setState({
                ...this.state,
                selectedIntention: value,
            });
        }
    }
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'space-around', 
        alignItems: 'center',
    },
    headingTextContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingText: {
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
    enabledArrow: {
        opacity: 1,
    },
    disabledArrow: {
        opacity: 0.2,
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
    intentionContainer: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 25,
        paddingVertical: 25,
        justifyContent: "space-around",
    },
    footerSpacer: {
        flex: 1,
    },
});


export default MeditationScreen;