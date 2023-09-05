import {StyleSheet} from 'react-native';
import {colors, fontFamilies} from '../../../../services';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    categorieContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.lightGrey,
    },
    categorieText: {
      fontFamily: fontFamilies('boldText'),
      marginLeft: 20,
      color: colors.black,
    },
    categorieIcon: {
      marginRight: 20,
    },
  });
