import {I18nManager, StyleSheet} from 'react-native';
import {colors, fontFamilies, HP} from '../../../../../services';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
    },
    headingOrder: {
      fontFamily: fontFamilies('normalText'),
      fontSize: 15,
      textAlign: I18nManager.isRTL ? 'left' : 'auto',
    },
    summary: {
      marginVertical: 20,
    },
    priceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    borderBottom: {
      borderBottomColor: colors.lightGrey,
      paddingBottom: 10,
      borderBottomWidth: 1,
    },
    heading: {
      fontFamily: fontFamilies('semiboldText'),
      color: colors.black,
      fontSize: 14,
    },
    subHeading: {
      fontFamily: fontFamilies('semiboldText'),
      color: colors.grey,
      fontSize: 14,
    },
    primaryHeading: {
      fontFamily: fontFamilies('semiboldText'),
      color: colors.skyBlue,
      fontSize: 18,
    },
    rateBtn: {
      padding: 8,
      backgroundColor: colors.golden,
      alignItems: 'center',
      borderRadius: 5,
    },
    baseFont: {
      fontFamily: fontFamilies('boldText'),
      color: colors.black,
    },
    inputStyle: {
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      height: 100,
      paddingHorizontal: 20,
      paddingTop: 10,
      backgroundColor: colors.white,
      marginTop: 10,
      borderWidth: 1,
      borderColor: colors.lightGrey,
      borderRadius: 10,
      fontFamily: fontFamilies('normalText'),
      lineHeight: 25,
      textAlign: I18nManager.isRTL ? 'right' : 'auto',
      textAlignVertical: 'top',
    },
  });
