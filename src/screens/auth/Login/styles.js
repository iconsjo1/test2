import {StyleSheet} from 'react-native';
import {colors, fontFamilies} from '../../../services';
import {smallScreens} from '../../../services/utilities/responsive';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
      // padding: 20,
      marginBottom: 0,
    },
    btnLink: {
      color: '#4194f0',
      alignSelf: 'flex-end',
      marginBottom: 10,
      fontSize: smallScreens ? 10 : 15,
    },
    heading: {
      fontSize: 16,
      alignSelf: 'center',
      fontFamily: fontFamilies('normalTextHeader'),
    },
    logoImg: {
      width: 100,
      height: 100,
      borderRadius: 60,
      alignSelf: 'center',
      marginTop: 20,
    },
    formGroup: {},
    greyTxt: {
      fontSize: smallScreens ? 12 : 15,
      color: colors.grey,
      marginVertical: 10,
      fontFamily: fontFamilies('normalText'),
    },
    formAction: {
      padding: 10,
    },
    footer: {
      flex: 1,

      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    error: {
      color: 'red',
      marginVertical: 5,
      fontFamily: fontFamilies('normalText'),
    },
  });
