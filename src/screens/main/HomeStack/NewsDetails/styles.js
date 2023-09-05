import { StyleSheet } from "react-native";
import { WP, colors } from "../../../../services";

export default () => StyleSheet.create({
    imageBg: {
        width: WP('100'),
        height: WP('70'),
    },
    backTouch: {
        borderColor: colors.lightGrey,
        borderWidth: 1,
        backgroundColor: "#00000088",
        padding: 10,
        borderRadius: 10,
    },
    backButtonContainer: {
        flexDirection: 'row',
        padding: 15,
    }
})