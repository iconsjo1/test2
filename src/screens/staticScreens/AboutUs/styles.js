import { StyleSheet } from "react-native";
import { WP, fontFamilies, colors, i18n } from "../../../services";

export default () => StyleSheet.create({
    container: {
        flex: 1,
    },
    aboutContainer: {
        width: WP('92'),
        alignSelf: 'center'
    },
    aboutImageContainer: {
        width: WP('100'),
        height: WP('60'),
        alignSelf: 'center'
    },
    title: {
        fontFamily: fontFamilies('normalTextHeader'),
        fontSize: 18,
        color: colors.primary,
        width: '100%',
        textAlign: 'center',
        textTransform: 'uppercase',
        paddingVertical: 10,
    },
    shdaowTitle: {
        fontFamily: fontFamilies('normalTextHeader'),
        fontSize: 18,
        color: colors.whiteAbsolute,
        width: '100%',
        textAlign: 'left',
        textTransform: 'uppercase',
        padding: 10,
    },
    desc: {
        width: '100%',
        alignSelf: 'center',
        paddingVertical: 10,
        backgroundColor: colors.whiteBg,
        textAlign: i18n.locale === 'ar' ? 'left' : 'justify',
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7
    },
    shadowWrapper: {
        width: WP('92'),
        borderRadius: 7,
        alignSelf: 'center',
        backgroundColor: colors.primary,
        overflow: 'visible',
        marginTop: 20,
    }
})