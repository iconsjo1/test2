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
      flexDirection: 'row',
      flexWrap: 'wrap',
      height: '100%',
    },
    image: {
      width: windowWidth / 3 - 5,
      height: windowHeight / 5.4,
      alignSelf: 'center',
      margin: 2,
      resizeMode: 'cover',
      alignSelf: 'center',
    },
    icon: {
      top: 12,
      flex: 1,
      color: colors.black,
      alignSelf: 'center',
      textAlign: 'center',
    },
    headerText: {
      fontFamily: fontFamilies('boldText'),
      flex: 4,
      textAlign: 'center',
      top: 12,
      color: colors.black,
      alignSelf: 'center',
    },
    header: {
      borderBottomWidth: 1,
      borderColor: colors.extraLightGrey,
      height: windowHeight / 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });
