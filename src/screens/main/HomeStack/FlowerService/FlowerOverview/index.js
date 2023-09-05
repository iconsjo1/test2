import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useDispatch} from 'react-redux';
import {RippleLoader} from 'react-native-indicator';

import styles from './styles';
import {SliderItem} from '../';
import LoadingWrapper from '../../../../../components/generic/LoadingWrapper';
import FlowerHeader from '../../../../../components/headers/CustomHeader/FlowerHeader';
import {colors, HP, i18n, images, shadows, WP} from '../../../../../services';
import {PrimaryButton} from '../../../../../components';
import {addItemToCart} from '../../../../../store/actions/main/flowerServiceActions';
import {converENDigitsToAr} from '../../../../../services/utilities/helpers';

const FlowerOverview = ({route, navigation}) => {
  const {product} = route.params;
  console.log(product);
  const imgs = product.images.map((img) => img.url);
  const [activeItem, setActiveItem] = useState(0);
  const [itemCount, setitemCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const checkImgs = imgs.length > 0 ? imgs : [images.giftBox, images.gift];
  console.log(checkImgs);
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
        <FlowerHeader navigation={navigation} cart />
        <ScrollView>
          <View>
            <Carousel
              loop
              layout="default"
              itemWidth={WP('100')}
              sliderWidth={WP('100')}
              data={checkImgs}
              renderItem={({item, index}) => (
                <SliderItem
                  local={imgs.length > 0 ? false : true}
                  height={HP('35')}
                  item={item}
                  index={index}
                  blackOverlay
                />
              )}
              onSnapToItem={(i) => setActiveItem(i)}
            />
            <View
              style={{
                position: 'absolute',
                bottom: -20,
                alignSelf: 'center',
              }}>
              <Pagination
                dotsLength={product.images.length}
                activeDotIndex={activeItem}
                dotStyle={{
                  padding: 5,
                  borderRadius: 20,
                  backgroundColor: colors.white,
                  ...shadows.darkShadowBlack,
                }}
              />
            </View>
          </View>
          <View style={styles().productInfo}>
            <View
              style={{
                alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-start',
              }}>
              <Text style={styles().heading}>
                {I18nManager.isRTL
                  ? product.showServiceNameAr
                  : product.showServiceNameEn}
              </Text>
              <Text style={styles().price}>
                {I18nManager.isRTL
                  ? converENDigitsToAr(product.price)
                  : product.price}{' '}
                {i18n.t('giftsShopHome.sar')}
              </Text>
              <Text style={styles().infoHeading}>
                {i18n.t('flowerOverview.productInfo')}
              </Text>
              <Text style={styles().info}>
                {I18nManager.isRTL
                  ? product.descriptionAr
                  : product.descriptionEn}
              </Text>
              <Text style={styles().infoHeading}>
                {i18n.t('flowerOverview.optionsNote')}
              </Text>
              <Text style={styles().info}>{product.optionsNote}</Text>
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
          </View>
        </ScrollView>
      </View>
    </LoadingWrapper>
  );
};

export default FlowerOverview;
