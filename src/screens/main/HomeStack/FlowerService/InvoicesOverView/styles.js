import {StyleSheet} from 'react-native';
import {colors, fontFamilies} from '../../../../../services';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    heading: {
      fontFamily: fontFamilies('boldText'),
      marginBottom: 10,
      backgroundColor: colors.skyBlue,
      paddingHorizontal: 20,
      paddingVertical: 10,
      color: colors.whiteAbsolute,
      textAlign: 'center',
    },
  });
