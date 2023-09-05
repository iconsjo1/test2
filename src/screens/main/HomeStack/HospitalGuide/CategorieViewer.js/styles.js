import {StyleSheet} from 'react-native';
import {colors, HP, WP} from '../../../../../services';
import {smallScreens} from '../../../../../services/utilities/responsive';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    controllersView: {
      position: 'absolute',
      bottom: HP('3'),
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: WP('82'),
      zIndex: 10,
      backgroundColor: colors.bgColor,
    },
    bottomFrame: {
      transform: [{scaleY: -1}],
      width: WP('100'),
      resizeMode: 'stretch',
      position: 'absolute',
      bottom: 0,
    },
    topFrame: {
      width: WP('100'),
      resizeMode: 'stretch',
    },
    htmlContent: {
      padding: 20,
      paddingTop: 40,
      alignItems: 'center',
      alignSelf: 'center',
      position: 'absolute',
      top: HP('10'),
      width: WP('90'),
    },
    image: {
      height: HP('20'),
      width: WP('80'),
      resizeMode: 'stretch',
    },
  });
