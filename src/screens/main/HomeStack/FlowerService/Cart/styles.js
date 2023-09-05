import {StyleSheet, Dimensions, I18nManager, Platform} from 'react-native';
import {colors, fontFamilies, HP, shadows, WP} from '../../../../../services';
import {smallScreens} from '../../../../../services/utilities/responsive';

export default styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    itemsContainer: {
      padding: 20,
    },
    orderContainer: {
      padding: 20,
      backgroundColor: colors.white,
      ...shadows.lightShadowGrey,
      elevation: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    inputStyle: {
      width: smallScreens ? WP('89') : WP('90'),
      paddingHorizontal: 20,
      paddingTop: 10,
      marginTop: 10,
      borderWidth: 1,
      borderColor: colors.lightGrey,
      borderRadius: 10,
      fontFamily: fontFamilies('normalText'),
      lineHeight: 23,
      textAlign: I18nManager.isRTL ? 'right' : 'auto',
      textAlignVertical: 'top',
      height: smallScreens ? HP('10') : HP('13'),
      marginBottom: 10,
      maxWidth: WP('80'),
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
    error: {
      color: 'red',
      marginVertical: 5,
      fontFamily: fontFamilies('normalText'),
      alignSelf: 'flex-start',
    },
    iconImage: {
      width: 70,
      height: 70,
      alignSelf: 'center',
      marginVertical: 10,
    },
    modalStyle: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    notes: {
      alignSelf: I18nManager.isRTL ? 'flex-start' : 'flex-start',
      fontFamily: fontFamilies('normalText'),
      marginTop: 10,
    },
  });
