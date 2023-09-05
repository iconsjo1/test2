import {StyleSheet} from 'react-native';
import {smallScreens} from '../../../../../services/utilities/responsive';
import {colors, fontFamilies} from '../../../../../services';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
      alignItems: 'center',
    },
    headerImage: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
      marginTop: 40,
    },
    headerTxt: {
      fontSize: 16,
      fontFamily: fontFamilies('boldTextHeader'),
      marginTop: 20,
      color: colors.darkGrey,
    },
    formGroup: {
      marginTop: 10,
    },
    primaryButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.skyBlue,
      paddingVertical: smallScreens ? 12 : 15,
      borderRadius: smallScreens ? 10 : 15,
      marginVertical: 20,
    },
    btnText: {
      color: colors.whiteAbsolute,
      fontSize: smallScreens ? 12 : 14,
      fontFamily: fontFamilies('boldText'),
      marginHorizontal: 10,
    },
  });
