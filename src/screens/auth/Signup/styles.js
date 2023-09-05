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
      marginTop: 30,
    },
    headerImg: {
      width: 100,
      height: 100,
      borderRadius: 200,
      alignSelf: 'center',
    },
    formGroup: {
      marginTop: 5,
    },
    footer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 20,
    },
    btnLink: {
      color: '#4194f0',
      textDecorationLine: 'underline',
      marginLeft: 10,
    },
    error: {
      color: 'red',
      marginVertical: 5,
      fontFamily: fontFamilies('normalText'),
    },
    txt: {
      color: colors.grey,
      fontFamily: fontFamilies('normalText'),
      fontSize: smallScreens ? 10 : 15,
    },
  });
