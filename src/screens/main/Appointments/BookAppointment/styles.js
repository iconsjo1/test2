import { StyleSheet } from "react-native";
import { colors, WP, fontFamilies, lineHeights, i18n } from "../../../../services";

const imageSize = WP('20');

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
    innerContainer: {
        width: WP('92'),
        alignSelf: 'center',
    },
    completeInfo: {
        fontFamily: fontFamilies('normalTextHeader'),
        fontSize: 17,
        marginLeft: 20,
        textAlign: 'left',
        flex: 1,
    },
    scrollInner: {
        width: WP('92'),
        alignSelf: 'center',
        backgroundColor: colors.whiteBg,
        borderRadius: 10,
        marginTop: 30
    },
    topRow: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    servicePrice: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontFamily: fontFamilies('normalTextHeader'),
    },
    taxLine: {
        color: colors.grey,
        marginBottom: 10,
        width: '100%',
        textAlign: 'right'
    },
    iconContainer: {
        padding: 6,
        backgroundColor: colors.lightGrey,
        borderRadius: 5,
        marginRight: 10
    },
    iconContainerRed: {
        padding: 6,
        backgroundColor: colors.red,
        borderRadius: 5,
        marginRight: 10
    },
    schedulesOn: {
        width: '100%',
        textAlign: 'center',
        fontSize: 16,
        color: colors.black,
        marginVertical: 15,
    },
    selected: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: colors.lightGrey,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 7
    },
    selectedText: {
        backgroundColor: colors.green,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        overflow: 'hidden',
        color: colors.whiteAbsolute
    },
    paymentHeader: {
        padding: 15,
        overflow: 'hidden',
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1
    },
    cards: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center'
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardImageContainer: {
        width: imageSize,
        height: imageSize,
        borderRadius: 20,
        borderColor: colors.lightGrey,
        borderWidth: 1,
        padding: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardImageStyle: {
        width: '100%',
        height: '100%'
    },
    cardText: {
        width: '100%',
        textAlign: 'center',
        marginVertical: 10
    },
    loaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    cardNumber: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonContainer: {
        width: WP('90'),
        alignSelf: 'center',
        marginVertical: 30,
    },
    typeSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: 'transparent',
        marginTop: 10,
    },
    typeSelectorText: {
        paddingVertical: 10,
        marginHorizontal: 7,
        borderRadius: 10,
        fontSize: 12,
        fontFamily: fontFamilies('normalTextHeader'),
        lineHeight: lineHeights('small')
    },
    previewModal: {
        flex: 1,
        margin: 0,
        padding: 0
    },
    previewHeader: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center'
    },
    previewContainer: {
        width: WP('100'),
        backgroundColor: colors.white,
        alignSelf: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    reviewText: {
        color: colors.whiteAbsolute,
        width: '100%',
        paddingVertical: 15,
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        fontFamily: fontFamilies('normalTextHeader'),
        backgroundColor: colors.primary
    },
    detailItemLabel: {
        color: colors.skyBlueDark,
        textAlign: 'left'
    },
    detailItem: {
        marginLeft: 10,
        padding: 5,
        textAlign: 'left',
        color: colors.darkGrey,
    },
    detailItemContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    callAlert: {
        width: WP('85'),
        maxWidth: 400,
        alignSelf: 'center',
        padding: 20,
        backgroundColor: colors.white,
        borderRadius: 10,
    },
    callAlerttextStyle: {
        paddingVertical: 20,
        width: '100%',
        textAlign: i18n.locale !== 'ar' ? "justify" : "left"
    }
})