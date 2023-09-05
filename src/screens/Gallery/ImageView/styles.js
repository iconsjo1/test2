import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamilies} from '../../../services';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default () =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
    },
    container: {
      backgroundColor: colors.white,
      flex: 1,
    },
    image: {
      height: '100%',
      resizeMode: 'cover',
    },

    iconfooter: {
      fontSize: 18,
      color: colors.black,
      alignSelf: 'center',
      textAlign: 'center',
    },
    footerText: {
      fontSize: 14,
      flex: 4,
      textAlign: 'center',
      fontFamily: fontFamilies('boldText'),
      marginTop: 5,
      color: colors.black,
      alignSelf: 'center',
    },
    headerText: {
      fontSize: 14,
      flex: 4,
      textAlign: 'center',
      top: 12,
      fontWeight: 'bold',
      color: '#000',
      alignSelf: 'center',
    },

    footer: {
      backgroundColor: colors.white,
      borderWidth: 1,
      bottom: 0,
      position: 'absolute',
      borderColor: colors.extraLightGrey,
      width: '100%',
      height: windowHeight / 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });
