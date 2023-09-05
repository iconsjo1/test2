import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { colors, fontFamilies, images, shadows } from '../../../../services';

const IconCard = ({ isPrimary, name, icon, navigation, link, param, cta, gallery }) => {
  return (
    <View style={isPrimary ? styles().PrimaryContainer : styles().container}>
      <TouchableOpacity
        style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
        onPress={() => (cta ? cta() : navigation.navigate(link, param))}
        activeOpacity={0.7}>
        <View style={styles().imageContainer}>
          <Image source={icon} style={gallery ? [{ tintColor: colors.skyBlue }, styles().image] : styles().image} />
        </View>
        <View style={styles().headerContainer}>
          <Text style={isPrimary ? styles().headingInvoice : styles().heading}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default IconCard;

const styles = () =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('screen').width / 2 - 35,
      backgroundColor: colors.white,
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      marginVertical: 10,
      marginHorizontal: 5,
      ...shadows.extraLightShadowGrey,
      elevation: 5,
    },
    PrimaryContainer: {
      width: Dimensions.get('screen').width / 2 - 35,
      backgroundColor: colors.skyBlue,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      marginVertical: 10,
      marginHorizontal: 5,
      ...shadows.extraLightShadowGrey,
      elevation: 5,
    },
    imageContainer: {
      width: 50,
      height: 50,
      marginVertical: 15,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    heading: {
      fontFamily: fontFamilies('normalTextHeader'),
      fontSize: 14,
      textAlign: 'center',
      color: colors.black,
    },
    headingInvoice: {
      fontFamily: fontFamilies('normalTextHeader'),
      fontSize: 14,
      color: colors.whiteAbsolute,
      textAlign: 'center',
    },
    headerContainer: {
      width: '100%',
    },
  });
