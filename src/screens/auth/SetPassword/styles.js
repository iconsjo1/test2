import {Platform, StyleSheet} from 'react-native';
import {colors, fontFamilies, i18n} from '../../../services';
import {smallScreens} from '../../../services/utilities/responsive';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    fromGroup: {
      marginTop: 50,
    },
    headerTxt: {
      fontSize: smallScreens ? 14 : 16,
      textAlign: i18n.locale === 'ar' ? 'left' : 'auto',
      fontFamily: fontFamilies('normalText'),
      lineHeight: i18n.locale === 'ar' ? 30 : 25,
      color: colors.darkGrey,
    },

    icon: {
      position: 'absolute',
      right: 5,
      bottom: Platform.OS === 'ios' ? 0 : smallScreens ? 0 : 5,
    },
  });
