import {StyleSheet} from 'react-native';
import {colors, fontFamilies, i18n} from '../../../../services';
import {smallScreens} from '../../../../services/utilities/responsive';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    headerTxt: {
      marginTop: 50,
      fontSize: smallScreens ? 14 : 15,
      fontFamily: fontFamilies('normalText'),
      textAlign: i18n.locale === 'ar' ? 'left' : 'justify',
      lineHeight: i18n.locale === 'ar' ? 30 : 25,
      color: colors.darkGrey,
    },
    verificationCode: {
      marginTop: 20,
    },
    root: {padding: 20, minHeight: 300},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {
      marginTop: 20,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    cellRoot: {
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: '#ccc',
      borderBottomWidth: 5,
      margin: 2,
    },
    cellText: {
      color: colors.darkGrey,
      fontSize: 36,
      textAlign: 'center',
    },
    focusCell: {
      borderBottomColor: '#007AFF',
      borderBottomWidth: 2,
    },
    row: {
      marginVertical: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    timer: {
      color: colors.primary,
      fontFamily: fontFamilies('boldTextHeader'),
      fontSize: smallScreens ? 12 : 15,
    },
    txt: {
      color: colors.darkGrey,
      fontFamily: fontFamilies('normalTextHeader'),
      fontSize: smallScreens ? 12 : 15,
    },
    error: {
      color: 'red',
      marginBottom: 2,
      fontFamily: fontFamilies('normalText'),
      fontSize: smallScreens ? 12 : 14,
    },
  });
