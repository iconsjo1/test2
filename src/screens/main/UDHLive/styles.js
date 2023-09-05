import { StyleSheet } from "react-native";
import { WP } from "../../../services";

export default () => StyleSheet.create({
    contianer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    comingSoonImage: {
        width: WP('50'),
        height: WP('50'),
        maxWidth: 200,
        maxHeight: 200,
        marginVertical: 30
    }
})