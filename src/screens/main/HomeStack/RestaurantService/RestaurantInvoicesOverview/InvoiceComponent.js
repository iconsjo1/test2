import React, { useState } from 'react';
import {
  I18nManager,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { AirbnbRating, Rating } from 'react-native-ratings';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';

import { AppButton } from '../../../../../components';
import {
  colors,
  fontFamilies,
  HP,
  i18n,
  images,
  routesNames,
  shadows,
  WP,
} from '../../../../../services';
import { smallScreens } from '../../../../../services/utilities/responsive';
import {
  rateOrder,
  updateCartItems,
} from '../../../../../store/actions/main/restaurantActions';
import { converENDigitsToAr } from '../../../../../services/utilities/helpers';

const InvoiceComponent = ({ handleRefresh, invoice, navigation }) => {
  const products = useSelector((state) => state.restaurant.products);
  const mappedOrderItems = invoice.items.map((el) => {
    return {
      ...el,
      price: el.unitPrice,
      count: el.quantity,
    };
  });
  const cartItemsFromProducts = products.filter((el) => {
    return invoice.items.some((f) => f.serviceId === el.id);
  });

  const cartItemToUpdate = cartItemsFromProducts.map((el) => {
    return {
      ...el,
      ...mappedOrderItems.find((f) => f.serviceId === el.id),
    };
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rate, setRate] = useState();
  const [msg, setMsg] = useState();
  const dispatch = useDispatch();

  // console.log('invoice',invoice);
  const handleRating = () => {
    console.log({ orderRate: rate, orderRateReview: msg });
    setLoading(true);
    dispatch(
      rateOrder(
        invoice.id,
        { orderRate: rate, orderRateReview: msg },
        () => {
          setLoading(false);
          handleRefresh();
          setTimeout(() => {
            setIsModalVisible(false);
            handleRefresh();
          }, 200);
        },
        () => {
          setLoading(false);
          setTimeout(() => {
            setIsModalVisible(false);
          }, 200);
        },
      ),
    );
  };
  return (
    <View style={styles().container}>
      <View
        style={{
          ...styles().imageContainer,
          backgroundColor:
            invoice.invoiceStatus === '2' ? colors.green : colors.red,
        }}>
        <Image
          source={invoice.qrCode ? { uri: invoice.qrCode } : images.bill_invoice}
          style={styles().image} />
      </View>
      <View style={styles().containerRow}>
        <View style={styles().idContainer}>
          <Text style={styles().baseFont}>
            {i18n.t('orderOverview.invoiceNo')} #
            {I18nManager.isRTL
              ? converENDigitsToAr(invoice.orderId)
              : invoice.orderId}
          </Text>
          {invoice.orderRate ? (
            <View style={styles().ratingContainer}>
              <AirbnbRating
                size={15}
                reviews={false}
                defaultRating={invoice.orderRate}
                isDisabled={true}
              />
            </View>
          ) : invoice.orderRate === null && invoice.orderStatus === '3' ? (
            <AppButton
              onPress={() => setIsModalVisible(true)}
              text={i18n.t('orderOverview.rate')}
              btnStyle={styles().rateBtn}
              textStyle={{ fontSize: smallScreens ? 12 : 12 }}
            />
          ) : null}
          <View style={styles().row}>
            <Text
              style={{
                ...styles().baseFont,
                fontFamily: fontFamilies('normalText'),
                fontSize: 12,
              }}>
              {i18n.t('orderOverview.status')}:
            </Text>
            <Text
              style={{
                fontFamily: fontFamilies('boldText'),
                fontSize: smallScreens ? 12 : 14,
                color:
                  invoice.orderStatus === '4'
                    ? colors.grey
                    : invoice.orderStatus === '3'
                      ? colors.green
                      : invoice.orderStatus === '1'
                        ? colors.black
                        : colors.orange,
              }}>
              {' '}
              {invoice.orderStatus === '4'
                ? i18n.t('orderOverview.cancled')
                : invoice.orderStatus === '3'
                  ? i18n.t('orderOverview.delivered')
                  : invoice.orderStatus === '1'
                    ? i18n.t('orderOverview.new')
                    : i18n.t('orderOverview.inprogress')}
            </Text>
          </View>
        </View>
        <View style={styles().priceContianer}>
          <View style={styles().row}>
            <Image source={images.currency} style={styles().currencyImg} />
            <Text
              style={{
                fontFamily: fontFamilies('boldText'),
                color: colors.skyBlue,
                fontSize: smallScreens ? 12 : 14,
              }}>
              {I18nManager.isRTL
                ? converENDigitsToAr(invoice.netAmount)
                : invoice.netAmount}{' '}
              {i18n.t('giftsShopHome.sar')}
            </Text>
          </View>
          <View style={styles().row}>
            <Text
              style={{
                fontFamily: fontFamilies('normalText'),
                color: colors.black,
                fontSize: smallScreens ? 12 : 14,
              }}>
              {i18n.t('orderOverview.order')}:
            </Text>
            <Text
              style={{
                fontFamily: fontFamilies('boldText'),
                fontSize: smallScreens ? 12 : 14,
                color:
                  invoice.invoiceStatus === '2' ? colors.green : colors.red,
                marginLeft: 5,
              }}>
              {invoice.invoiceStatus === '2'
                ? i18n.t('orderOverview.paied')
                : invoice.invoiceStatus === '1'
                  ? i18n.t('orderOverview.unpaied')
                  : invoice.invoiceStatus === '3'
                    ? i18n.t('orderOverview.cancled')
                    : null}
            </Text>
          </View>
          <AppButton
            onPress={() => {
              if (
                invoice.invoiceStatus === '2' ||
                invoice.invoiceStatus === '3'
              ) {
                dispatch(updateCartItems(cartItemToUpdate));

                navigation.navigate(routesNames.restaurantOrderOverView, {
                  invoice,
                });
              } else {
                dispatch(updateCartItems(cartItemToUpdate));

                navigation.navigate(routesNames.restaurantCart, {
                  unpaidCartItems: cartItemToUpdate,
                  orderId: invoice.id,
                  invoice
                });
              }
            }}
            text={i18n.t('orderOverview.details')}
            btnStyle={styles().btnPrimary}
          />
        </View>
      </View>
      <Modal
        avoidKeyboard={true}
        onBackdropPress={() => setIsModalVisible(false)}
        isVisible={isModalVisible}>
        <View
          style={{
            backgroundColor: colors.white,
            padding: 20,
            borderRadius: 10,
          }}>
          <Text
            style={{
              ...styles().baseFont,
              alignSelf: 'center',
              paddingVertical: 10,
            }}>
            {i18n.t('orderOverview.rateHeading')}
          </Text>
          {I18nManager.isRTL ? (
            <AirbnbRating
              defaultRating={5}
              size={35}
              count={5}
              showRating={false}
              onFinishRating={(value) => setRate(value)}
            />
          ) : (
            <Rating
              startingValue={5}
              ratingBackgroundColor={colors.lightGrey}
              tintColor={colors.white}
              type="custom"
              ratingCount={5}
              imageSize={50}
              showRating={false}
              onFinishRating={(rating) => setRate(rating)}
            />
          )}
          <TextInput
            value={msg}
            onChangeText={(val) => setMsg(val)}
            numberOfLines={10}
            multiline
            placeholder={i18n.t('inpatientAlert.rateMsg')}
            style={styles().inputStyle}
          />
          <AppButton
            text={i18n.t('inpatientOrder.rate')}
            loading={loading}
            onPress={() => {
              if (!rate) {
                Toast.show(
                  I18nManager.isRTL
                    ? 'من فضلك قيم الخدمة'
                    : 'Please, Rate the service',
                );
              } else {
                handleRating();
              }
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default InvoiceComponent;

const styles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors.white,
      marginVertical: 5,
      ...shadows.lightShadowGrey,
      elevation: 5,
      borderRadius: 10,
      height:
        Platform.OS === 'ios'
          ? smallScreens
            ? HP('17')
            : HP('13')
          : smallScreens
            ? HP('17')
            : HP('14'),
    },

    btnPrimary: {
      alignSelf: 'stretch',
      padding: smallScreens ? 5 : 8,
      backgroundColor: colors.skyBlue,
      alignItems: 'center',
      borderRadius: 5,
    },
    priceContianer: {
      // backgroundColor: colors.green,
      flex: 2,
      justifyContent: 'space-between',
      alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-start',
    },
    rateBtn: {
      padding: smallScreens ? 5 : 8,
      backgroundColor: colors.golden,
      alignItems: 'center',
      marginRight: 20,
      borderRadius: 5,
    },
    ratingContainer: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? -5 : -28,
      left: -3,
    },
    idContainer: {
      flex: 3,
      justifyContent: 'space-between',
      // backgroundColor: colors.orange,
      alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-start',
    },
    containerRow: {
      flex: 1,
      flexDirection: 'row',
      padding: 15,
      justifyContent: 'space-between',
    },
    image: {
      width: 60,
      height: 60,
      resizeMode: 'contain',
    },
    imageContainer: {
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      width: '18%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    currencyImg: {
      width: 20,
      height: 15,
      resizeMode: 'contain',
      marginRight: 5,
    },
    baseFont: {
      fontFamily: fontFamilies('boldText'),
      color: colors.black,
      fontSize: smallScreens ? 12 : 14,
    },
    inputStyle: {
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      height: 100,
      paddingHorizontal: 20,
      paddingTop: 10,
      backgroundColor: colors.white,
      marginTop: 10,
      borderWidth: 1,
      borderColor: colors.lightGrey,
      borderRadius: 10,
      fontFamily: fontFamilies('normalText'),
      lineHeight: 25,
      textAlign: I18nManager.isRTL ? 'right' : 'auto',
      textAlignVertical: 'top',
    },
  });
