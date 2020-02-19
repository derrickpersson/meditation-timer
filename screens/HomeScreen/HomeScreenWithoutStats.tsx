import React from "react";
import { ThemeAwareView } from "../../components/ThemeAwareView";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SettingsGear } from "../../components/SvgIcons/SettingsGear";
import { MeditationHighlightsDivider } from "../../components";
import { QuotationDisplay } from "../../components/QuotationDisplay";
import { FooterButton } from "../../components/FooterButton/FooterButton";

export const HomeScreenWithoutStats = ({
    navigation,
}) => (
        <ThemeAwareView style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
          <View style={styles.meditationHighlightsContainer}>
            <View style={styles.meditationHighlighsHeaderContainer}>
              <TouchableOpacity onPress={() => navigation.push('Settings')}>
                <SettingsGear width={"35px"} height={"35px"} fill={"#FFFFFF"}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.dividers}>
            <MeditationHighlightsDivider />
          </View>
            <QuotationDisplay />
            <FooterButton
              content="Meditate"
              onPress={() => navigation.push('MeditationSelection')}
            />
        </ThemeAwareView>
);

const styles = StyleSheet.create({
    meditationHighlightsContainer: {
      backgroundColor: "#4464FF",
      flex: 0.25,
      paddingTop: 50,
      paddingHorizontal: 25,
      width: "100%",
    },
    meditationHighlighsHeaderContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    dividers: {
      flex: 0.5,
      width: "100%",
      flexDirection: "row",
    },
    footerSpacer: {
      flex: 1,
      width: "100%",
    },
})

export default HomeScreenWithoutStats;