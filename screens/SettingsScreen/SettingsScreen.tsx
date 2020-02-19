import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SettingsItem } from "./SettingsItem";
import withTheme, { InjectedThemeProps } from "../../utilities/Styles/withTheme";
import { ThemeAwareView } from "../../components/ThemeAwareView";
import { Sun } from "../../components/SvgIcons";
import { Moon } from "../../components/SvgIcons";
import { ThemeAwareStatusBar } from "../../components/ThemeAwareStatusBar";
import { Switch } from "react-native-gesture-handler";
import { withStatsPresenter, InjectedStatsPresenterProps } from "../../utilities/useStatsPresenter";
import { compose } from "recompose";

export interface Props {
    theme: InjectedThemeProps;
    statsPresenter: InjectedStatsPresenterProps;
}

export const SettingsScreen: FC<Props> = ({
    theme,
    statsPresenter,
}) => (
    <ThemeAwareView style={styles.settingsScreenContainer}>
        <ThemeAwareStatusBar />
        <View style={styles.settingsScreenHeaderContainer}>
            <SettingsItem 
                name={"Dark Mode"}
                Icon={() => {
                    return (theme.theme.type === "dark") ? <Sun />: <Moon />;
                }}
                handleOnPress={theme.toggle}
            />
            <SettingsItem 
                name={"Hide Stats"}
                Icon={() => <Switch 
                    value={statsPresenter.isStatsHidden} 
                    onValueChange={statsPresenter.toggleStats}
                    trackColor={{ true: theme.themeColors.primaryBackgroundColor.backgroundColor, 
                        false: null }}
                    />
                }
            />
            <SettingsItem
                name={"Thank You"}
                Icon={() => <View><Text>Stuff</Text></View>}
                handleOnPress={() => null}
            />
        </View>
    </ThemeAwareView>
);

const styles = StyleSheet.create({
    settingsScreenContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    settingsScreenHeaderContainer: {
        flex: 1,
    },
    settingsScreenHeader: {
        fontSize: 24,
        fontWeight: "bold",
    }
})

const SettingsScreenWithTheme = compose(
    withTheme,
    withStatsPresenter,
)(SettingsScreen);

export default SettingsScreenWithTheme;