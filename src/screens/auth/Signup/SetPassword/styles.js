import {Platform, StyleSheet} from 'react-native';
import {colors, fontFamilies, i18n} from '../../../../services';
import {smallScreens} from '../../../../services/utilities/responsive';
export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
      marginBottom: 20,
    },
    headerImg: {
      height: 200,
      width: 200,
      alignSelf: 'center',
      marginBottom: 20,
    },
    heading: {
      fontSize: 16,
      textAlign: i18n.locale === 'ar' ? 'left' : 'justify',
      fontFamily: fontFamilies('normalText'),
      marginTop: 5,
    },
    form: {},
    icon: {
      position: 'absolute',
      right: 15,
      bottom: Platform.OS === 'ios' ? 0 : smallScreens ? 0 : 5,
    },
  });
