import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamilies, i18n, shadows} from '../../../../services';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.greyishWhite,
    },
    header: {
      paddingTop: 40,
      paddingBottom: 20,
      paddingHorizontal: 20,
      backgroundColor: colors.white,
      borderBottomColor: colors.grey,
      borderBottomWidth: 1,
    },
    headerTxt: {
      fontFamily: fontFamilies('boldTextHeader'),
      fontSize: 18,
      color: colors.black,
    },
    profileDetails: {
      backgroundColor: colors.white,
      marginTop: 100,
      marginHorizontal: 20,
      flex: 1,
      ...shadows.lightShadowGreyLowSpread,
      borderRadius: 10,
      elevation: 3,
    },
    profilePicContainer: {
      width: 100,
      height: 100,
      borderRadius: 100,
      backgroundColor: colors.skyBlue,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      top: -50,
      ...shadows.lightShadowGrey,
      borderWidth: 5,
      borderColor: colors.whiteAbsolute,
    },
    dataRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      paddingVertical: 20,
      borderBottomColor: colors.greyishWhite,
      borderBottomWidth: 2,
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    title: {
      color: colors.grey,
      fontFamily: fontFamilies('lightText'),
      fontSize: 14,
    },
    value: {
      fontFamily: fontFamilies('normalTextHeader'),
      fontSize: 14,
      color: colors.black,
    },
    formGroup: {
      backgroundColor: colors.white,
      marginTop: 50,
      marginHorizontal: 20,
      flex: 1,
      ...shadows.lightShadowGreyLowSpread,
      borderRadius: 10,
      elevation: 3,
      padding: 20,
    },
    error: {
      color: 'red',
      marginVertical: 5,
      fontFamily: fontFamilies('normalText'),
      textAlign: i18n.locale === 'ar' ? 'left' : 'auto',
    },
  });
