import { StyleSheet, I18nManager } from "react-native"
import { colors, fontFamilies, WP } from "../../../../services"

export default () => StyleSheet.create({
    searchContainer: {
        paddingHorizontal: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchContainerInner: {
        paddingHorizontal: 10,
        backgroundColor: colors.extraLightGrey,
        borderRadius: 10,
        flex: 1,
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
    cancelText: {
        color: colors.primary,
        padding: 10,
    },
    listScroller: {
        width: WP('100'),
        backgroundColor: colors.lightGrey,
    },
    newsItemContainer: {
        width: WP('100'),
        padding: 15,
    },
    shadowContainer: {
        width: WP('92'),
        backgroundColor: colors.white,
        borderRadius: 15,
        alignSelf: 'center'
    },
    thumbnail: {
        width: WP('92'),
        height: WP("60")
    },
    newsTitle: {
        textAlign: 'left',
        color: colors.skyBlueDark,
        fontFamily: fontFamilies('normalTextHeader'),
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    newsDesc: {
        textAlign: 'left',
        color: colors.darkGrey,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    seeMore: {
        width: '100%',
        textAlign: 'right',
        color: colors.primary,
        padding: 10
    }
})