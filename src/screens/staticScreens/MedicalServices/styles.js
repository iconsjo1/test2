import { StyleSheet, Platform } from "react-native";
import { WP, fontFamilies, colors, i18n, lineHeights } from "../../../services";

export default () => StyleSheet.create({
    container: {
        width: WP('100'),
    },
    shadowContainer: {
        width: WP('94'),
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        marginVertical: 20,
        borderRadius: 15,
        // padding: 10,
        paddingTop: 0
    },
    mainContainer: {
        flex: 1,
    },
    image: {
        width: WP('94'),
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        height: WP('70'),
    },
    title: {
        width: '100%',
        textAlign: 'left',
        paddingHorizontal: 15,
        paddingTop: 15,
        fontFamily: fontFamilies('lightTextHeader'),
        fontSize: 18,
        color: colors.primary
    },
    description: {
        width: '100%',
        fontFamily: fontFamilies('normalText'),
        lineHeight: lineHeights('normal'),
        padding: 15,
        fontSize: 16,
        color: colors.darkGrey,
        textAlign: i18n.locale === 'ar' ? 'left' : 'justify'
    },
    heading: {
        width: '100%',
        paddingVertical: 30,
        fontFamily: fontFamilies('semiboldText'),
        lineHeight: lineHeights('normal'),
        paddingHorizontal: 15,
        color: colors.green,
        fontSize: 16,
        textAlign: i18n.locale === 'ar' ? 'left' : 'justify'
    }
})