import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  I18nManager,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import NetworkImage from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

import {
  colors,
  fontFamilies,
  i18n,
  images,
  routesNames,
  shadows,
} from '../../../../../services';
import {converENDigitsToAr} from '../../../../../services/utilities/helpers';
import {smallScreens} from '../../../../../services/utilities/responsive';

const ProductComponent = ({product, navigation}) => {
  //   console.log(product);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(routesNames.productOverview, {
          product,
        })
      }
      activeOpacity={0.8}
      style={styles().productContainer}>
      <View
        style={
          product.images.length > 0
            ? {
                ...styles().imageContainer,
                width: '100%',
                padding: 0,
                height: 130,
                flex: 2,
              }
            : styles().imageContainer
        }>
        {product.images.length > 0 ? (
          <NetworkImage
            source={{uri: product.images[0].url}}
            indicator={Progress.Pie}
            style={
              product.images.length > 0
                ? {
                    ...styles().image,
                    height: '100%',
                    width: '100%',
                    borderRadius: 10,
                    resizeMode: 'cover',
                  }
                : styles().image
            }
          />
        ) : (
          <Image style={styles().image} source={images.restaurantDefault} />
        )}
      </View>
      <View style={styles().detailsColumn}>
        <View
          style={{
            alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-start',
          }}>
          <Text style={styles().heroHeading}>
            {product.showServiceNameEn || product.showServiceNameAr
              ? I18nManager.isRTL
                ? product.showServiceNameAr
                : product.showServiceNameEn
              : I18nManager.isRTL
              ? 'اسم المنتج'
              : 'Product Name'}
          </Text>
          <Text style={styles().hintHeading}>
            {product.optionsNote
              ? product.optionsNote
              : I18nManager.isRTL
              ? 'لا يوجد خيارات'
              : 'Option notes not available'}
          </Text>
          <Text
            style={{
              ...styles().secondaryText,
              textAlign: I18nManager.isRTL ? 'left' : 'auto',
            }}>
            {product.descriptionEn || product.descriptionAr
              ? I18nManager.isRTL
                ? product.descriptionAr
                : product.descriptionEn
              : I18nManager.isRTL
              ? 'لا يوجد وصف'
              : 'Description not available'}
          </Text>
        </View>
        <View style={styles().extraInfoRow}>
          {product.calories ? (
            <View style={styles().extraInfo1}>
              <Icon
                size={16}
                name="local-fire-department"
                color={colors.skyBlue}
              />
              <Text style={styles().extraInfoText}>
                {product.calories
                  ? I18nManager.isRTL
                    ? converENDigitsToAr(product.calories)
                    : product.calories
                  : I18nManager.isRTL
                  ? 'صفر'
                  : 'Zero'}{' '}
                {I18nManager.isRTL ? 'سعرة حرارية' : 'Calories'}
              </Text>
            </View>
          ) : (
            <View></View>
          )}
          <View style={{...styles().extraInfo1, marginHorizontal: 10}}>
            <MaterialCom size={16} name="tag" color={colors.skyBlue} />
            <Text style={styles().extraInfoText}>
              {I18nManager.isRTL
                ? converENDigitsToAr(product.price)
                : product.price}{' '}
              {i18n.t('giftsShopHome.sar')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductComponent;

const styles = () =>
  StyleSheet.create({
    productContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
      backgroundColor: colors.white,
      borderRadius: 10,
      ...shadows.extraLightShadowGrey,
      elevation: 5,
    },
    imageContainer: {
      flex: 2,
      height: 130,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: colors.greyishWhite,
      overflow: 'hidden',
    },
    image: {
      width: '60%',
      height: '60%',
    },
    detailsColumn: {
      flex: 4,
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    heroHeading: {
      fontFamily: fontFamilies('boldText'),
      marginBottom: 5,
    },
    hintHeading: {
      fontFamily: fontFamilies('boldText'),
      color: colors.skyBlue,
      fontSize: smallScreens ? 10 : 12,
      marginBottom: 10,
    },
    secondaryText: {
      fontFamily: fontFamilies('boldText'),
      color: colors.grey,
      fontSize: smallScreens ? 10 : 12,
    },
    extraInfoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    extraInfo1: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    extraInfoText: {
      fontFamily: fontFamilies('boldText'),
      color: colors.grey,
      fontSize: smallScreens ? 10 : 12,
      marginHorizontal: 5,
    },
  });
