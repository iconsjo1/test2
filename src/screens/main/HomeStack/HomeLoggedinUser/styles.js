import {StyleSheet} from 'react-native';
import {colors} from '../../../../services';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    mainIcons: {
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
  });
