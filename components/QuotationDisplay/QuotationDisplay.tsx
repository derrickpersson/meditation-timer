import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { OpenQuotationMark, CloseQuotationMark } from "../SvgIcons";
import { quotationService } from "../../utilities/QuotationService";
import { FadeInView } from "../FadeInView";
import { ThemeAwareText } from "../ThemeAwareText";

export const QuotationDisplay = () => {
    const [quote, setQuote] = useState({ author: "", text: ""});

    useEffect(() => {
        setQuote(quotationService.getQuote());
    }, []);

    return (
    <FadeInView 
        style={styles.quoteContainer}
        duration={2000}
    >
        <View style={[styles.quotationMarkContainer, styles.openQuotation]}>
            <View style={styles.quotationMark}>
                <OpenQuotationMark />
            </View>
        </View>
        <ThemeAwareText style={styles.headingText} adjustsFontSizeToFit={true}>{quote.text}</ThemeAwareText>
        <View style={[styles.quotationMarkContainer, styles.closeQuotation]}>
            <View style={styles.quotationMark}>
                <CloseQuotationMark />
            </View>
        </View>
        <View style={styles.authorTextContainer}>
            <ThemeAwareText style={styles.authorText}>- {quote.author}</ThemeAwareText>
        </View>
    </FadeInView>
)}

const styles = StyleSheet.create({
    quoteContainer: {
        flex: 3,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      },
      headingText: {
        fontSize: 25,
        lineHeight: 30,
        textAlign: "center",
        textAlignVertical: "center",
        paddingHorizontal: 25,
      },
      quotationMarkContainer: {
        flex: 0.1,
        paddingHorizontal: 25,
        width: "100%",
      },
      quotationMark: {
        flex: 1, 
        paddingHorizontal: 25 
      },
      openQuotation: {
        alignItems: "flex-start",
        width: "100%",
        paddingBottom: 25,
        paddingHorizontal: 50,
      },
      closeQuotation: {
        flex: 0.1,
        alignItems: "flex-end",
        width: "100%",
        paddingHorizontal: 50,
        paddingTop: 25,
      },
      authorTextContainer: {
        flex: 1,
        width: "100%",
        alignItems: "flex-end",
        paddingHorizontal: 25,
        paddingTop: 25,
      },
      authorText: {
        color: "#A6A3A3",
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: 20,
      },
});

export default QuotationDisplay;