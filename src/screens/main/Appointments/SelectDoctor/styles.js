import { StyleSheet, I18nManager } from "react-native";
import { colors, WP, fontFamilies, lineHeights } from "../../../../services";

export default () => StyleSheet.create({
    stepText: {
        color: colors.darkGrey,
        paddingVertical: 5,
        textAlign: 'left',


    },
    scrollContainer: {
        width: WP('100'),
    },
    selectText: {
        color: colors.black,
        fontSize: 18,
        paddingVertical: 10,
        textAlign: 'left',
    },
    searchContainer: {
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: colors.extraLightGrey,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchInput: {
        padding: 15,
        flex: 1,
        color: colors.darkGrey,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
        fontFamily: fontFamilies('normalText'),
    },
    innerContainer: {
        width: WP('92'),
        alignSelf: 'center',
    },
    filterIcon: {
        padding: 10,
        borderColor: colors.grey,
        borderWidth: 1,
        borderRadius: 10
    }
})