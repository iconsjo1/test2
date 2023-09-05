import {I18nManager, StyleSheet} from 'react-native';
import {colors, fontFamilies, WP} from '../../../../../services';
import {smallScreens} from '../../../../../services/utilities/responsive';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    heading: {
      fontFamily: fontFamilies('boldText'),
      fontSize: 18,
      marginBottom: 10,
      color: colors.black,
    },
    productInfo: {
      padding: 20,
      paddingHorizontal: 40,
      justifyContent: 'space-between',
    },
    price: {
      fontFamily: fontFamilies('boldText'),
      color: colors.skyBlue,
      fontSize: smallScreens ? 12 : 14,
      marginHorizontal: 10,
    },
    infoHeading: {
      fontFamily: fontFamilies('boldText'),
      color: colors.grey,
      fontSize: smallScreens ? 12 : 14,
      marginTop: 20,
      marginBottom: 5,
    },
    info: {
      fontFamily: fontFamilies('semiboldText'),
      color: colors.mediumGrey,
      fontSize: smallScreens ? 12 : 14,
      marginTop: 5,
      textAlign: I18nManager.isRTL ? 'left' : 'auto',
    },
    addToCart: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      alignItems: 'center',
    },
    controllersView: {
      flexDirection: 'row',
      width: WP(40),
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.lightGrey,
    },
    controllerBtn: {
      paddingVertical: smallScreens ? 5 : 10,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: colors.lightGrey,
    },
    controllerText: {
      fontFamily: fontFamilies('boldText'),
      fontSize: smallScreens ? 14 : 16,
      color: colors.darkGrey,
    },
    mainBtn: {
      marginVertical: 20,
      paddingHorizontal: 20,
      height: smallScreens ? 35 : 50,
      backgroundColor: colors.skyBlue,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnTxt: {
      fontFamily: fontFamilies('boldText'),
      color: colors.whiteAbsolute,
    },
    qunatity: {
      fontFamily: fontFamilies('boldText'),
    },
  });
