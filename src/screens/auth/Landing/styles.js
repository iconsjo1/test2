import { StyleSheet, PixelRatio } from "react-native";
import { colors, WP, fontFamilies, lineHeights, HP } from '../../../services'

const imageSize = WP('100');
const topMargin = 100;

export default () => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.skyBlue
    },
    pager: {
        width: imageSize,
        height: (imageSize * 1000 / 667) - (HP('100') < 700 && WP('100') > 350 ? topMargin : 0),
    },
    picContainer: {
        width: imageSize,
        height: (imageSize * 1000 / 667) - (HP('100') < 700 && WP('100') > 350 ? topMargin : 0),
        overflow: 'hidden',
    },
    bottomContainer: {
        flex: 1,
        paddingHorizontal: WP('20'),
        width: WP('100'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        width: imageSize,
        height: imageSize * 1000 / 667,
        top: (HP('100') < 700 && WP('100') > 350 ? -topMargin : 0)
    },
    indicatorsContainer: {
        width: WP('100'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradientContainer: {
        width: WP('100'),
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: 30,
    },
    labelText: {
        width: '100%',
        textAlign: 'left',
        color: "#000000",
        fontSize: 20,


    }
});
