import {StyleSheet} from 'react-native';
import {colors, fontFamilies, shadows, WP} from '../../../../services';
import {HP, smallScreens} from '../../../../services/utilities/responsive';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    overlayView: {
      backgroundColor: colors.greyishWhite,
      zIndex: 1,
      width: '100%',
      height: '100%',
      position: 'absolute',
      opacity: 0.3,
      justifyContent: 'center',
      padding: 20,
    },
    blackOverlayView: {
      backgroundColor: colors.black,
      zIndex: 1,
      width: '100%',
      height: '100%',
      position: 'absolute',
      opacity: 0.3,
      justifyContent: 'center',
      padding: 20,
    },
    imageSlide: {
      height: HP('35'),
      width: WP('100'),
      resizeMode: 'cover',
    },
    activeTab: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.skyBlue,
      marginHorizontal: 3,
      borderRadius: 5,
    },
    inActiveTab: {
      paddingVertical: 10,
      paddingHorizontal: 10,

      flex: 1,
      alignItems: 'center',
      marginHorizontal: 3,
      borderRadius: 5,
    },
    tabsContainer: {
      marginTop: 10,
      marginBottom: 10,
      borderBottomColor: colors.lightGrey,
      borderBottomWidth: 1,
      paddingBottom: 10,
      alignItems: 'flex-start',
    },
    activeTabfont: {
      color: colors.whiteAbsolute,
      fontSize: smallScreens ? 10 : 12,
      fontFamily: fontFamilies('boldText'),
    },
    inActiveTabFont: {
      color: colors.skyBlue,
      fontSize: smallScreens ? 10 : 12,
      fontFamily: fontFamilies('boldText'),
    },
    ListHeaderComponent: {
      marginLeft: -20,
      width: WP('100'),
    },
  });
