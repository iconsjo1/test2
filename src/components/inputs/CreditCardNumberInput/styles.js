import { StyleSheet, I18nManager } from "react-native";
import { i18n, fontFamilies, lineHeights, colors } from "../../../services";

export default () => StyleSheet.create({
    numebrInputContainer: {
        alignItems: "center",
        backgroundColor: colors.lightGreyColor,
        borderRadius: 15,
        width: "100%"
    },
    numebrInput: {
        backgroundColor: colors.lightGreyColor,
        borderRadius: 15,
        color: colors.black,
        fontFamily: fontFamilies('lightText'),
        fontSize: 18,
        fontWeight: "100",
        lineHeight: lineHeights('normal'),
        padding: 15,
        textAlign: I18nManager.isRTL ? "right" : "left",
        textAlignVertical: "center"
    },
    expNcvcContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    halfOuterContainer: {
        width: "47%"
    },
    halfWrapperInner: {
        backgroundColor: colors.lightGreyColor,
        borderRadius: 15,
        width: "100%"
    },
    cvcInput: {
        backgroundColor: colors.lightGreyColor,
        borderRadius: 15,
        fontFamily: fontFamilies('lightText'),
        fontSize: 18,
        fontWeight: "100",
        lineHeight: lineHeights('normal'),
        padding: 15,
        color: colors.black,
        textAlign: "center",
        textAlignVertical: "center"
    },
    inputTopLabel: {
        backgroundColor: colors.whiteBg,
        color: colors.black,
        fontFamily: fontFamilies('lightText'),
        left: 10,
        lineHeight: lineHeights('normal'),
        paddingHorizontal: 10,
        position: "absolute",
        textAlignVertical: "center",
        top: i18n.locale === 'ar' ? -13 : -10,
    },
    wrapper: {
        borderColor: colors.black,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        width: "100%"
    }
});
