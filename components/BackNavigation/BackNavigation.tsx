import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ex } from "../SvgIcons";
import { NavigationInjectedProps } from "react-navigation";

export interface Props {
    hideBackButton?: boolean;
}

export class BackNavigation extends React.Component<Props & NavigationInjectedProps, any> {

    public render() {
    return (
        <View style={styles.backNavigationContainer}>
            {!this.props.hideBackButton && <TouchableOpacity
                style={styles.backNavigation}
                onPress={() => this.props.navigation.goBack()}
            >
                <Ex
                    containerStyle={styles.backNavigationIcon}
                    isPrimary={true}
                />
            </TouchableOpacity>}
        </View>
        )
    }
}

const styles = StyleSheet.create({
    backNavigationContainer: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 25,
        paddingHorizontal: 25,
    },
    backNavigation: {
        flex: 1,
        padding: 20,
    },
    backNavigationIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',        
    },
});

export default BackNavigation;