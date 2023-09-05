import {StyleSheet, Dimensions} from 'react-native';
import {WP, i18n, fontFamilies, colors, lineHeights} from '../../../services';

export default () =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    headerImgContainer: {
      alignItems: 'center',
      marginVertical: 20,
      width: 250,
      height: 250,
      alignSelf: 'center',
    },
    headerImg: {
      width: '100%',
      height: '100%',
      marginBottom: 10,
    },
    imgTxt: {
      fontSize: 16,
      alignSelf: 'flex-start',
      textAlign: i18n.locale === 'ar' ? 'left' : 'justify',
      lineHeight: i18n.locale === 'ar' ? 30 : 25,
      fontFamily: fontFamilies('normalText'),
      color: colors.darkGrey,
    },
    error: {
      color: 'red',
      marginBottom: 2,
      fontFamily: fontFamilies('normalText'),
    },
  });
