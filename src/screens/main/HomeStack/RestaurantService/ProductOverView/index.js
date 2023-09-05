import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  I18nManager,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {RippleLoader} from 'react-native-indicator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel from 'react-native-snap-carousel';

import {LoadingWrapper, RestaurantHeader} from '../../../../../components';
import {colors, HP, i18n, images, shadows, WP} from '../../../../../services';
import styles from './styles';
import {converENDigitsToAr} from '../../../../../services/utilities/helpers';
import {addItemToCart} from '../../../../../store/actions/main/restaurantActions';
import {SliderItem} from '../../FlowerService';
const ProductOverview = ({route, navigation}) => {
  const {product} = route.params;
  const imgs = product.images.map((img) => img.url);
  const checkImgs = imgs.length > 0 ? imgs : [images.restaurantDefault];

  const [itemCount, setitemCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const addToCart = () => {
    setLoading(true);
    dispatch(
      addItemToCart(
        {
          ...product,
          count: itemCount,
          withCount: true,
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
    <LoadingWrapper>
      <View style={styles().container}>
        <RestaurantHeader cart navigation={navigation} />
        <View
          style={{
            flex: 1.5,
            borderBottomColor: colors.lightGrey,
            borderBottomWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Carousel
            loop
            layout="default"
            autoplay
            autoplayInterval={4000}
            itemWidth={WP('100')}
            sliderWidth={WP('100')}
            data={checkImgs}
            renderItem={({item, index}) => (
              <SliderItem
                local={imgs.length > 0 ? false : true}
                item={item}
                index={index}
                blackOverlay
                height={HP('35')}
              />
            )}
          />
        </View>
        <View
          style={{
            flex: 3,
          }}>
          <ScrollView contentContainerStyle={styles().productInfo}>
            <View
              style={{
                alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-start',
              }}>
              <Text style={styles().heading}>
                {product.showServiceNameEn || product.showServiceNameAr
                  ? I18nManager.isRTL
                    ? product.showServiceNameAr
                    : product.showServiceNameEn
                  : I18nManager.isRTL
                  ? 'اسم المنتج'
                  : 'Product Name'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: WP('80'),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <MaterialCom size={16} name="tag" color={colors.skyBlue} />
                  <Text style={styles().price}>
                    {I18nManager.isRTL
                      ? converENDigitsToAr(product.price)
                      : product.price}{' '}
                    {i18n.t('giftsShopHome.sar')}
                  </Text>
                </View>
                {product.calories ? (
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Icon
                      size={16}
                      name="local-fire-department"
                      color={colors.skyBlue}
                    />
                    <Text style={{...styles().price, marginRight: 0}}>
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
              </View>
              <Text style={styles().infoHeading}>
                {i18n.t('flowerOverview.productInfo')}
              </Text>
              <Text style={styles().info}>
                {product.descriptionEn || product.descriptionAr
                  ? I18nManager.isRTL
                    ? product.descriptionAr
                    : product.descriptionEn
                  : I18nManager.isRTL
                  ? 'لا يوجد وصف'
                  : 'Description not available'}
              </Text>
              <Text style={styles().infoHeading}>
                {i18n.t('flowerOverview.optionsNote')}
              </Text>
              <Text style={{...styles().price, marginHorizontal: 0}}>
                {product.optionsNote
                  ? product.optionsNote
                  : I18nManager.isRTL
                  ? 'لا يوجد خيارات'
                  : 'Option notes not available'}
              </Text>
            </View>
            <View style={styles().addToCart}>
              <Text style={styles().qunatity}>
                {i18n.t('flowerOverview.quantity')}
              </Text>
              <View style={styles().controllersView}>
                <TouchableOpacity
                  disabled={itemCount === 1 ? true : false}
                  onPress={() => {
                    console.log(itemCount);
                    setitemCount((prevState) => {
                      if (prevState == 1) {
                        return 1;
                      } else {
                        return prevState - 1;
                      }
                    });
                  }}
                  style={styles().controllerBtn}>
                  <Text
                    style={
                      itemCount === 1
                        ? {...styles().controllerText, color: colors.grey}
                        : styles().controllerText
                    }>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={styles().controllerText}>
                  {I18nManager.isRTL
                    ? converENDigitsToAr(itemCount)
                    : itemCount}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    console.log(itemCount);
                    setitemCount((prevState) => prevState + 1);
                  }}
                  style={styles().controllerBtn}>
                  <Text style={styles().controllerText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={addToCart}
              style={styles().mainBtn}>
              {loading ? (
                <RippleLoader color={colors.white} size={15} />
              ) : (
                <Text style={styles().btnTxt}>
                  {i18n.t('flowerOverview.addToCart')}
                </Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </LoadingWrapper>
  );
};

export default ProductOverview;
