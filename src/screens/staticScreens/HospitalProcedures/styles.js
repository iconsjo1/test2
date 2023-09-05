import { StyleSheet, Platform } from "react-native";
import { WP, fontFamilies, colors, i18n } from "../../../services";

export default () => StyleSheet.create({
    container: {
        width: WP('100'),
    },
    shadowContainer: {
        width: WP('94'),
        alignSelf: 'center',
        backgroundColor: colors.white,
        marginVertical: 20,
        borderRadius: 15,
    },
    iconContainer: {
        // width: '100',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: WP('40'),
        height: WP('40'),
        backgroundColor: colors.extraLightGrey,
        borderRadius: WP('40'),
        marginVertical: 20,
    },
    image: {
        width: WP('100'),
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
        padding: 15,
        fontSize: 16,
        color: colors.darkGrey,
        textAlign: i18n.locale === 'ar' ? 'left' : 'justify'
    }
})