import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, I18nManager} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {RippleLoader} from 'react-native-indicator';
import NetworkImage from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

import {
  colors,
  HP,
  shadows,
  WP,
  images,
  fontFamilies,
  routesNames,
  i18n,
  lineHeights,
} from '../../../../../services';
import {addItemToCart} from '../../../../../store/actions/main/flowerServiceActions';
import {converENDigitsToAr} from '../../../../../services/utilities/helpers';
import {smallScreens} from '../../../../../services/utilities/responsive';

const FlowerComponent = ({product, navigation}) => {
  const [loading, setLoading] = useState(false);
  const cart = useSelector((state) => state.flowers.cart);

  const dispatch = useDispatch();

  const addToCart = () => {
    setLoading(true);
    dispatch(
      addItemToCart(
        {
          ...product,
          count: 1,
        },
        () => {
          setLoading(false);
        },
        () => {
          setLoading(false);
        },
      ),
    );
  };
  return (
    <View
      style={{
        width: WP('43'),
        backgroundColor: colors.white,
        ...shadows.extraLightShadowGrey,
        elevation: 5,
        marginVertical: 10,
        borderRadius: 10,
        marginHorizontal: 5,
      }}>
      <TouchableOpacity
        style={{
          height: HP('15'),
          backgroundColor: colors.lightGrey,
          justifyContent: 'center',
          alignItems: 'center',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
        onPress={() =>
          navigation.navigate(routesNames.flowerOverview, {product})
        }
        activeOpacity={0.9}>
        {product.images.length > 0 ? (
          <NetworkImage
            source={{uri: product.images[0].url}}
            indicator={Progress.Pie}
            style={{
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              resizeMode: 'cover',
            }}
          />
        ) : (
          <Image
            style={{
              width: '40%',
              height: '40%',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              resizeMode: 'contain',
            }}
            source={images.giftBox}
          />
        )}
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 15,
          paddingRight: 0,
          flex: 1,
        }}>
        <View
          style={{
            alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-start',
            flex: 2,
          }}>
          <Text
            style={{
              color: colors.black,
              fontFamily: fontFamilies('boldText'),
              marginVertical: 5,
              fontSize: smallScreens ? 12 : 14,
              maxWidth: 100,
              textAlign: I18nManager.isRTL ? 'left' : 'auto',
              lineHeight: lineHeights('small'),
            }}>
            {I18nManager.isRTL
              ? product.showServiceNameAr
              : product.showServiceNameEn}
          </Text>
          <Text
            style={{
              color: colors.skyBlue,
              fontFamily: fontFamilies('boldText'),
              fontSize: smallScreens ? 11 : 14,
              marginTop: 5,
            }}>
            {I18nManager.isRTL
              ? converENDigitsToAr(product.price)
              : product.price}{' '}
            {i18n.t('giftsShopHome.sar')}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: 5,
          }}>
          <TouchableOpacity
            onPress={addToCart}
            style={{
              backgroundColor: colors.green,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
              borderRadius: 5,
              width: smallScreens ? 30 : 40,
              height: smallScreens ? 35 : 45,
            }}>
            {loading ? (
              <RippleLoader
                color={colors.white}
                size={smallScreens ? 15 : 20}
              />
            ) : (
              <Icon
                color={colors.whiteAbsolute}
                size={smallScreens ? 14 : 20}
                name={'cart-outline'}
                style={
                  I18nManager.isRTL
                    ? {
                        transform: [{scaleX: -1}],
                      }
                    : {}
                }
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FlowerComponent;
