import React from "react";
import { View, StyleSheet, Text, Linking } from "react-native";
import { ThemeAwareText } from "../../components/ThemeAwareText";
import { ThemeAwareView } from "../../components/ThemeAwareView";
import { ScrollView } from "react-native-gesture-handler";
import { colorPalette } from "../../utilities/Styles";
import { TouchableOpacity } from "react-native-gesture-handler";

export const ThankYouScreen = () => (
    <ScrollView>
        <ThemeAwareView style={styles.contentContainer}>
            <View style={styles.headerTextContainer}>
                <ThemeAwareText style={[styles.headerText, styles.boldText]}>Hi 👋</ThemeAwareText>
            </View>
            <View>
                <ThemeAwareText style={styles.paragraphText}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thank you so much for downloading this app. 
                    It means a lot to me that you would give this app a try, 
                    meditation is an important exercise in my life & I'm grateful to be able to play a role in that 
                    practice for you. I personally know the transformative power of meditation; and I know 
                    what a gift it is each day. 
                </ThemeAwareText>
                <ThemeAwareText style={styles.paragraphText}>
                    That's why this app is <ThemeAwareText style={styles.boldText}>free</ThemeAwareText>, and <ThemeAwareText style={styles.boldText}>always will be.</ThemeAwareText>
                </ThemeAwareText>

                <ThemeAwareText style={styles.paragraphText}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My goal is to build products that help you live with more&nbsp;
                <ThemeAwareText style={styles.boldText}>intention</ThemeAwareText>&nbsp;&&nbsp; 
                <ThemeAwareText style={styles.boldText}>purpose</ThemeAwareText>. 
                If you'd like to hear about other products I'm building - sign up for my&nbsp;
                    <ThemeAwareText style={styles.callToActionText} isPrimary={true} onPress={handleOpenNewsletterPage}>newsletter</ThemeAwareText>.
                </ThemeAwareText>

                <ThemeAwareText style={styles.paragraphText}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you'd like to help continue the development of this app, you can support me on patreon&nbsp;
                <ThemeAwareText style={styles.callToActionText} isPrimary={true} onPress={handleOpenPatreonPage}>here</ThemeAwareText>.
                </ThemeAwareText>
            </View>
            <View style={styles.footerContainer}>
                <ThemeAwareText style={styles.footerText}>
                    Much Gratitude,
                </ThemeAwareText>
                <ThemeAwareText style={styles.footerText}>
                    Derrick
                </ThemeAwareText>
            </View>
        </ThemeAwareView>
    </ScrollView>
);

const handleOpenNewsletterPage = () => {
    Linking.openURL("https://intentfulapp.com/newsletter-sign-up");
}

const handleOpenPatreonPage = () => {
    Linking.openURL("https://www.patreon.com/derrickpersson");
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    headerTextContainer: {
        margin: 16,
    },
    headerText: {
        fontSize: 18,
    },
    boldText: {
        fontWeight: "bold",
    },
    paragraphText: {
        fontSize: 18,
        margin: 16,
        textAlign: "left",
        lineHeight: 23,
    },
    callToActionContainer: {
        flex: 1,
        borderColor: "red",
        borderWidth: 10,
    },
    callToActionText: {
        fontWeight: "bold",
    },
    footerText: {
        fontSize: 18,
        textAlign: "right",
        margin: 16,
        marginVertical: 8,
    },
    footerContainer: {
        paddingBottom: 20,
    }
})

export default ThankYouScreen;