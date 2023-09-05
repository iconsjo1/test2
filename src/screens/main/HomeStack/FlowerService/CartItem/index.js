import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  I18nManager,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import NetworkImage from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

import {
  colors,
  fontFamilies,
  i18n,
  images,
  lineHeights,
  shadows,
  WP,
} from '../../../../../services';
import {
  counUp,
  countDown,
  deleteItem,
} from '../../../../../store/actions/main/flowerServiceActions';
import {converENDigitsToAr} from '../../../../../services/utilities/helpers';

const CartItem = ({item, countOnly}) => {
  const [itemCount, setitemCount] = useState(item.count);
  const dispatch = useDispatch();
  return (
    <View style={countOnly ? {} : styles().container}>
      <View
        style={[
          styles().row,
          countOnly
            ? {
                ...styles().row,
                padding: 0,
                marginVertical: 10,
              }
            : {},
        ]}>
        <View
          style={{
            ...styles().image,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.lightGrey,
            overflow: 'hidden',
          }}>
          {item.images?.length > 0 ? (
            <NetworkImage
              indicator={Progress.Pie}
              source={{uri: item.images[0].url}}
              style={{...styles().image, borderRadius: 10}}
            />
          ) : (
            <Image
              source={images.giftBox}
              style={{height: '50%', width: '50%', resizeMode: 'contain'}}
            />
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 2,
          }}>
          <View style={styles().detailsContainer}>
            <View style={styles().productInfo}>
              <Text style={styles().heading}>
                {I18nManager.isRTL
                  ? item.showServiceNameAr
                  : item.showServiceNameEn}
              </Text>
              <Text style={styles().headingPrice}>
                {I18nManager.isRTL
                  ? converENDigitsToAr((item.price * item.count).toFixed(2))
                  : (item.price * item.count).toFixed(2)}{' '}
                {i18n.t('giftsShopHome.sar')}
              </Text>
            </View>

            <View>
              <View
                style={[
                  styles().controllersView,
                  countOnly
                    ? {width: WP('8'), justifyContent: 'center', padding: 5}
                    : {},
                ]}>
                {countOnly ? null : (
                  <TouchableOpacity
                    disabled={itemCount === 1 ? true : false}
                    onPress={() => {
                      setitemCount((prevState) => {
                        if (prevState == 1) {
                          return 1;
                        } else {
                          return prevState - 1;
                        }
                      });
                      dispatch(
                        countDown(
                          item,
                          () => {},
                          () => {},
                        ),
                      );
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
                )}
                <Text style={styles().controllerText}>
                  {I18nManager.isRTL
                    ? converENDigitsToAr(item.count)
                    : item.count}
                </Text>
                {countOnly ? null : (
                  <TouchableOpacity
                    onPress={() => {
                      setitemCount((prevState) => prevState + 1);
                      dispatch(
                        counUp(
                          item,
                          () => {},
                          () => {},
                        ),
                      );
                    }}
                    style={styles().controllerBtn}>
                    <Text style={styles().controllerText}>+</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
          }}>
          {countOnly ? null : (
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  I18nManager.isRTL ? 'حذف المنتج' : 'Delete!',
                  I18nManager.isRTL
                    ? 'هل تريد حذف هذا المنتج؟'
                    : 'Are realy want to remove this item',

                  [
                    {
                      text: I18nManager.isRTL ? 'الغاء' : 'Cancel',
                      onPress: () => {},
                      style: 'cancel',
                    },
                    {
                      text: I18nManager.isRTL ? 'حذف' : 'Delete',
                      onPress: () => {
                        dispatch(
                          deleteItem(
                            item,
                            () => {},
                            () => {},
                          ),
                        );
                      },
                      style: 'destructive',
                    },
                  ],
                )
              }
              style={{
                width: WP('20'),
                paddingRight: 10,
                alignItems: 'flex-end',
              }}>
              <Icon name="close" size={20} color={colors.grey} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      marginBottom: 10,
      ...shadows.lightShadowGreyLowSpread,
      elevation: 5,
      borderRadius: 10,
    },
    row: {
      padding: 20,
      flexDirection: 'row',
    },
    image: {
      width: 110,
      height: 110,
      borderRadius: 10,
      flex: 1.5,
    },
    heading: {
      fontSize: 16,
      fontFamily: fontFamilies('boldText'),
      maxWidth: 100,
      textAlign: I18nManager.isRTL ? 'left' : 'auto',
      lineHeight: lineHeights('normal'),
    },
    headingPrice: {
      fontSize: 16,
      fontFamily: fontFamilies('boldText'),
      color: colors.skyBlue,
      marginVertical: 10,
    },
    detailsContainer: {
      marginHorizontal: 20,
    },
    controllersView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      width: WP('30'),
      borderColor: colors.lightGrey,
      backgroundColor: colors.extraLightGrey,
      borderRadius: 5,
    },
    controllerBtn: {
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: colors.lightGrey,
    },
    controllerText: {
      fontFamily: fontFamilies('boldText'),
      fontSize: 16,
      color: colors.darkGrey,
    },
    mainBtn: {
      marginVertical: 20,
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: colors.skyBlue,
      borderRadius: 5,
      alignItems: 'center',
    },
    productInfo: {
      alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-start',
    },
  });
