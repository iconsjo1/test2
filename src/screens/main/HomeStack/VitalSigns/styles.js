import {StyleSheet} from 'react-native';
import {colors} from '../../../../services';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    activeTab: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: 'center',
      borderLeftColor: colors.skyBlue,
    },
    tabsContainer: {
      marginHorizontal: 20,
      borderWidth: 1,
      borderColor: colors.skyBlue,
      //   alignItems: 'center',
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      overflow: 'hidden',
    },
  });
