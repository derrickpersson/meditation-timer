import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { DownArrow, UpArrow } from "../../components/SvgIcons";
import { FooterButton } from "../../components/FooterButton/FooterButton";
import GrattitudeCircle from "../../components/SvgIcons/GrattitudeCircle";
import HeartCircle from "../../components/SvgIcons/HeartCircle";
import BalanceCircle from "../../components/SvgIcons/BalanceCircle";
import { IntentionSelection } from "./IntentionSelection";
import { ThemeAwareText } from "../../components/ThemeAwareText";
import { ScreenContainerView } from "../../components/ScreenContainerView";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainNavigatorParamList } from "../../components/MainNavigator";
import randomTextGetter from "../../utilities/randomTextGetter";
import { compose } from "recompose";
import { withMeditationState, InjectedMeditationStateProps } from "../../utilities/useMeditationState";

const MAX_DURATION = 60;
const MIN_DURATION = 1;
const HALF_WAY_POINT = 30;
const INITIAL_CHANGE_SPEED = 500;
const HIGH_END_CHANGE_SPEED = 100;
const LOW_END_CHANGE_SPEED = 150;
const SPEED_CHANGE = 150;


type InjectedNavigationProp = {
    navigation: StackNavigationProp<MainNavigatorParamList, 'MeditationSelection'>;
};

export interface Props {
    meditation: InjectedMeditationStateProps;
}

export class MeditationScreen extends React.Component<Props & InjectedNavigationProp, any> {
    private touched: boolean;
    private timeOut;

    public constructor(props) {
        super(props);
        this.state = {
            selectedDuration: 0,
            instructionText: "",
            selectedIntention: "",
        };
    }

    private handleIncreaseSelection = (event) => {
        this.touched = true;
        this.setState({
            selectedDuration: this.state.selectedDuration === MAX_DURATION ? MAX_DURATION: this.state.selectedDuration + 1,
        });
        let int = INITIAL_CHANGE_SPEED;
        const increase = () => {
            this.timeOut = setTimeout(() => {
                if (this.touched) {
                    this.setState({
                        selectedDuration: this.state.selectedDuration === MAX_DURATION ? MAX_DURATION : this.state.selectedDuration + 1,
                    });
                    int = this.getChangedSpeed(int, this.state.selectedDuration > HALF_WAY_POINT );
                    increase();
                }
            }, int)
        }
        increase();
    }

    private handleDeselection = (event) => {
        this.touched = false;
        clearTimeout(this.timeOut);
    }

    private handleDecreaseSelection = (event) => {
        this.touched = true;
        this.setState({
            selectedDuration: this.state.selectedDuration === MIN_DURATION ? MIN_DURATION : this.state.selectedDuration - 1,
        });

        let int = INITIAL_CHANGE_SPEED;
        const decrease = () => {
            this.timeOut = setTimeout(() => {
                if (this.touched) {
                    this.setState({
                        selectedDuration: this.state.selectedDuration === MIN_DURATION ? MIN_DURATION : this.state.selectedDuration - 1,
                    });
                    int = this.getChangedSpeed(int, this.state.selectedDuration < HALF_WAY_POINT);
                    decrease();
                }
            }, int)
        }
        decrease();
    }

    private getChangedSpeed = (int, isHighEnd: boolean) => {
        return isHighEnd ?
            (int <= HIGH_END_CHANGE_SPEED ? HIGH_END_CHANGE_SPEED: int - SPEED_CHANGE):
            (int <= LOW_END_CHANGE_SPEED ? LOW_END_CHANGE_SPEED : int - SPEED_CHANGE );
    }

    public componentDidMount() {
        let sessionDuration = 10;
        if(this.props.meditation.meditationState.meditationSessions.length > 0){
            sessionDuration = this.props.meditation.meditationState.meditationSessions[0].duration;
        }
        this.setState({
            ...this.state,
            selectedDuration: sessionDuration,
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
                        <UpArrow style={maxSelected ? styles.disabledArrow : styles.enabledArrow} />
                    </TouchableOpacity>
                    <View style={styles.durationDisplayContainer}>
                        <View style={{ flex: 1 }}>

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
                        <DownArrow style={minSelected ? styles.disabledArrow : styles.enabledArrow} />
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
        )
    }

    private getInstructionText() {
        const instructionTexts = [
            "Take a minute for yourself",
            "Be present",
            "Your to do’s can wait",
            "Just focus on your breath",
            "You deserve this",
        ];
        return randomTextGetter(instructionTexts);
    }

    private handleIntentionSelection = (value) => {
        if (this.state.selectedIntention === value) {
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


export default compose(
    withMeditationState,
)(MeditationScreen);