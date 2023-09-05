import {I18nManager, StyleSheet} from 'react-native';
import {colors, fontFamilies} from '../../../../../services';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: colors.skyBlue,
    },
    headerName: {
      fontFamily: fontFamilies('boldTextHeader'),
      color: colors.whiteAbsolute,
      fontSize: 12,
      alignSelf: I18nManager.isRTL ? 'flex-start' : 'flex-end',
    },
    headerDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
      alignItems: 'center',
    },
    detailTxt: {
      fontFamily: fontFamilies('normalTextHeader'),
      color: colors.whiteAbsolute,
      marginHorizontal: 5,
      fontSize: 12,
    },
    detailTxtBold: {
      fontFamily: fontFamilies('boldTextHeader'),
    },
    mainIcons: {
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
  });
