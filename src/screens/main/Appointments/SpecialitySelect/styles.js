import { StyleSheet } from "react-native";
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
        backgroundColor: colors.extraLightGrey,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchInput: {
        padding: 15,
        color: colors.darkGrey,
        textAlign: 'left',
        fontFamily: fontFamilies('normalText'),
    },
    innerContainer: {
        width: WP('92'),
        alignSelf: 'center',
    }
})