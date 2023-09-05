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
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import NetworkImage from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

import {
  colors,
  fontFamilies,
  i18n,
  images,
  shadows,
  WP,
} from '../../../../../services';
import {
  counUp,
  countDown,
  deleteItem,
} from '../../../../../store/actions/main/restaurantActions';
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
            : item.images.length > 0
            ? {
                padding: 0,
              }
            : {},
        ]}>
        <View
          style={{
            flex: 2,

            justifyContent: 'center',
            alignItems: 'center',
            height: 135,
            overflow: 'hidden',
            borderRadius: 10,
          }}>
          {item.images.length > 0 ? (
            <NetworkImage
              style={styles().image}
              source={{uri: item.images[0].url}}
              indicator={Progress.Pie}
            />
          ) : (
            <Image
              source={images.restaurantDefault}
              style={{
                ...styles().image,
                resizeMode: 'contain',
                width: '70%',
                height: '70%',
              }}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 5,
            padding: 20,
          }}>
          <View style={styles().detailsContainer}>
            <View style={styles().productInfo}>
              <Text style={styles().heading}>
                {item.showServiceNameEn || item.showServiceNameAr
                  ? I18nManager.isRTL
                    ? item.showServiceNameAr
                    : item.showServiceNameEn
                  : item.serviceName}
              </Text>
              <Text style={styles().headingPrice}>
                {I18nManager.isRTL
                  ? converENDigitsToAr((item.price * item.count).toFixed(2))
                  : item.price * item.count}{' '}
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
      padding: 0,
      flexDirection: 'row',
    },
    image: {
      height: '100%',
      width: '100%',
      borderRadius: 10,
      resizeMode: 'cover',
    },
    heading: {
      fontSize: 16,
      fontFamily: fontFamilies('boldText'),
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
