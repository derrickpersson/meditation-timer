import React, { FC } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { SettingsItem } from "./SettingsItem";
import withTheme, { InjectedThemeProps } from "../../utilities/Styles/withTheme";
import { ThemeAwareView } from "../../components/ThemeAwareView";
import { Sun, RightArrow } from "../../components/SvgIcons";
import { Moon } from "../../components/SvgIcons";
import { ThemeAwareStatusBar } from "../../components/ThemeAwareStatusBar";
import { Switch } from "react-native-gesture-handler";
import { withStatsPresenter, InjectedStatsPresenterProps } from "../../utilities/useStatsPresenter";
import { compose } from "recompose";
import { MainNavigatorParamList } from "../../components/MainNavigator";
import { StackNavigationProp } from "@react-navigation/stack";

export interface Props {
    theme: InjectedThemeProps;
    statsPresenter: InjectedStatsPresenterProps;
    navigation: StackNavigationProp<MainNavigatorParamList, 'Settings'>;
}

export const SettingsScreen: FC<Props> = ({
    theme,
    statsPresenter,
    navigation,
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
                    thumbColor={Platform.OS === 'ios' ? null: theme.themeColors.defaultBackgroundColor.backgroundColor}
                    />
                }
            />
            <SettingsItem
                name={"Thank You"}
                Icon={() => <RightArrow isPrimary={true} style={{ padding: 8 }} />}
                handleOnPress={() => navigation.navigate('ThankYou')}
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