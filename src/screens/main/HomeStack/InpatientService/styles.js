import {Dimensions, I18nManager, StyleSheet} from 'react-native';
import {colors, fontFamilies} from '../../../../services';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },

    row: {
      flexDirection: 'row',
      marginBottom: 5,
      alignItems: 'flex-end',
    },
    mainIcons: {
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    activeTab: {
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: colors.skyBlue,
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.skyBlue,
    },
    inActiveTab: {
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: colors.skyBlue,
      flex: 1,
      alignItems: 'center',
    },
    tabsContainer: {
      width: '100%',
      flexDirection: 'row',
      marginTop: 20,
      marginBottom: 10,
      paddingHorizontal: 20,
    },
  });
