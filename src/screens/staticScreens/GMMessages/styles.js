import { StyleSheet } from "react-native";
import { WP, i18n, fontFamilies, colors, lineHeights } from "../../../services";

export default () => StyleSheet.create({
    shadowContainer: {
        width: WP('94'),
        alignSelf: 'center',
        backgroundColor: colors.white,
        marginVertical: 20,
        borderRadius: 15,
        padding: 10,
        paddingTop: 0
    },
    image: {
        width: WP('94'),
        alignSelf: 'center',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        height: WP('70'),
        marginBottom: 20,
    },
    header: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlign: 'center',
        fontFamily: fontFamilies('normalTextHeader'),
        fontSize: 18,
        color: colors.primary
    },
    headersm: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 10,
        textAlign: i18n.locale === 'ar' ? 'left' : 'justify',
        fontFamily: fontFamilies('normalTextHeader'),
        fontSize: 18,
        color: colors.skyBlueDark
    },
    description: {
        width: WP('94'),
        alignSelf: 'center',
        fontFamily: fontFamilies('normalText'),
        lineHeight: lineHeights('normal'),
        paddingHorizontal: 15,
        fontSize: 16,
        color: colors.darkGrey,
        textAlign: i18n.locale === 'ar' ? 'left' : 'justify'
    },
    lvl1: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: colors.primary,
        alignItems: 'center',
        padding: 10,
        marginVertical: 5
    },
    lvl2: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: colors.skyBlueDark + 'CC',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5
    },
    lvl3: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: colors.skyBlueDark + 'FF',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5
    },
    lvlText: {
        textAlign: 'center',
        color: colors.whiteAbsolute
    },
    strong: {
        width: '100%',
        fontFamily: fontFamilies('normalText'),
        lineHeight: lineHeights('normal'),
        paddingHorizontal: 15,
        color: colors.red
    }
})