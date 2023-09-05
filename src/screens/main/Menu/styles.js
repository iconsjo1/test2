import { StyleSheet } from "react-native";
import { WP, colors } from "../../../services";

export default () => StyleSheet.create({
    iconContainer: {
        width: 40,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: WP('100'),
        paddingVertical: 10,
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        flex: 1,
        fontSize: 16,
        textAlign: 'left',
        paddingHorizontal: 10,
        color: colors.darkGrey,
    },
    rightIcon: {
        width: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    langContainer: {
        marginLeft: 10,
    },
    langTouch: {
        borderColor: colors.grey,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    langShadow: {
        position: 'absolute',
        top: 10,
        right: 0,
        paddingVertical: 5,
        backgroundColor: colors.white,
        borderRadius: 10,
        zIndex: 10,
    },
    languageButton: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    flagImage: {
        width: 30,
        height: 20
    },
    langText: {
        width: 100,
        textAlign: 'left',
        paddingHorizontal: 10,
    }
});