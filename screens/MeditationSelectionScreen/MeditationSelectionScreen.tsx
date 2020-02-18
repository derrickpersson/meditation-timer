import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { DownArrow, UpArrow } from "../../components/SvgIcons";
import { FooterButton } from "../../components/FooterButton/FooterButton";
import { BackNavigation } from "../../components/BackNavigation";
import GrattitudeCircle from "../../components/SvgIcons/GrattitudeCircle";
import HeartCircle from "../../components/SvgIcons/HeartCircle";
import BalanceCircle from "../../components/SvgIcons/BalanceCircle";
import { IntentionSelection } from "./IntentionSelection";
import { ThemeAwareText } from "../../components/ThemeAwareText";
import { ScreenContainerView } from "../../components/ScreenContainerView";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainNavigatorParamList } from "../../components/MainNavigator";

const MAX_DURATION = 60;
const MIN_DURATION = 1;


type InjectedNavigationProp = {
    navigation: StackNavigationProp<MainNavigatorParamList, 'MeditationSelection'>;
};

class MeditationScreen extends React.Component<InjectedNavigationProp, any> {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: () => <BackNavigation navigation={navigation} />,
    });

    private interval;

    public constructor(props){
        super(props);
        this.state = {
            selectedDuration: 10,
            instructionText: "",
            selectedIntention: "",
        };
    }

    private handleIncreaseSelection = (event) => {
        this.setState({
            selectedDuration: this.state.selectedDuration === MAX_DURATION ? MAX_DURATION: this.state.selectedDuration + 1,
        });
        this.interval = setInterval(() => {
            this.setState({
                selectedDuration: this.state.selectedDuration === MAX_DURATION ? MAX_DURATION: this.state.selectedDuration + 1,
            });
        }, 250);
    }

    private handleDeselection = (event) => {
        clearInterval(this.interval);
    }

    private handleDecreaseSelection = (event) => {
        this.setState({
            selectedDuration: this.state.selectedDuration === MIN_DURATION ? MIN_DURATION : this.state.selectedDuration - 1,
        });
        this.interval = setInterval(() => {
            this.setState({
                selectedDuration: this.state.selectedDuration === MIN_DURATION ? MIN_DURATION : this.state.selectedDuration - 1,
            });
        }, 250);
    }

    public componentDidMount(){
        this.setState({
            ...this.state,
            instructionText: this.getInstructionText(),
        });
    }

    public render() {

    const minSelected = this.state.selectedDuration === MIN_DURATION;
    const maxSelected = this.state.selectedDuration === MAX_DURATION;

    return (
            <ScreenContainerView style={styles.screenContainer}>
                <View style={styles.headingTextContainer}>
                    <ThemeAwareText style={styles.headingText}>{this.state.instructionText}</ThemeAwareText>
                </View>
                <View style={styles.selectionContainer}>
                    <TouchableOpacity
                        style={[styles.upArrowContainer]}
                        onPressIn={this.handleIncreaseSelection}
                        onPressOut={this.handleDeselection}
                    >
                        <UpArrow style={maxSelected ? styles.disabledArrow: styles.enabledArrow}/>
                    </TouchableOpacity>
                    <View style={styles.durationDisplayContainer}>
                        <View style={{flex: 1}}>

                        </View>
                        <View style={{ flex: 1 }}>
                            <ThemeAwareText style={styles.durationDisplay}>{this.state.selectedDuration}</ThemeAwareText>
                        </View>
                        <View style={{ flex: 1 }}>
                            <ThemeAwareText style={styles.durationUnitText}>{this.state.selectedDuration === 1 ?
                                "minute" : "minutes"}</ThemeAwareText>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={[styles.downArrow]}
                        onPressIn={this.handleDecreaseSelection}
                        onPressOut={this.handleDeselection}
                    >
                        <DownArrow style={minSelected ? styles.disabledArrow: styles.enabledArrow}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.headingTextContainer}>
                    <ThemeAwareText style={styles.headingText}>Set today's intention</ThemeAwareText>
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
                        duration: this.state.selectedDuration,
                        intention: this.state.selectedIntention,
                     })}
                />
            </ScreenContainerView>
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