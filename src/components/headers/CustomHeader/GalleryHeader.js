import React from 'react';
import {StyleSheet, Text, View, Dimensions, I18nManager} from 'react-native';
import {colors, fontFamilies, i18n, images} from '../../../services';
import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GalleryHeader = ({navigation, main, handleMainPress}) => {
  return (
    <View style={styles().header}>
      <Icon
        size={24}
        onPress={() => navigation.goBack()}
        name={I18nManager.isRTL ? 'arrow-forward' : 'arrow-back'}
        style={styles().icon}
      />
      <Text style={styles().headerText}>
        {i18n.t('inpatientGallery.gallery')}
      </Text>
      {main ? (
        <Icon
          size={24}
          onPress={handleMainPress}
          name="camera-outline"
          style={styles().icon}
        />
      ) : (
        <View style={styles().icon}></View>
      )}
    </View>
  );
};

export default GalleryHeader;

const styles = () =>
  StyleSheet.create({
    header: {
      borderBottomWidth: 1,
      borderColor: colors.extraLightGrey,
      height: windowHeight / 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    headerText: {
      fontFamily: fontFamilies('boldText'),
      flex: 4,
      textAlign: 'center',
      top: 12,
      color: colors.black,
      alignSelf: 'center',
    },
    icon: {
      top: 12,
      flex: 1,
      color: colors.black,
      alignSelf: 'center',
      textAlign: 'center',
    },
  });
