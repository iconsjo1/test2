import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  I18nManager,
} from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import Modal from 'react-native-modal';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import {
  LoadingWrapper,
  NoResults,
  RestaurantHeader,
  AppButton,
  InputWithLabel,
} from '../../../../../components';
import styles from './styles';
import { i18n, colors, images, routesNames } from '../../../../../services';
import CartItem from '../CartItem';
import {
  makeOrder,
  payOrder,
  clearCart,
  updateOrder,
} from '../../../../../store/actions/main/restaurantActions';
import { converENDigitsToAr } from '../../../../../services/utilities/helpers';

const RestaurantCart = ({ route, navigation }) => {
  const fcmToken = useSelector((state) => state.user.fcmToken);
  const admissionNumber = useSelector(
    (state) => state.inpatient.inpatient.ADMISSIONNO,
  ).trim();
  const unpaidCartItems = route?.params?.unpaidCartItems;
  const orderToUpdateId = route?.params?.orderId;
  console.log(
    'ORDER ID,',
    orderToUpdateId,
    'ORDER ITEMS TO MAP',
    unpaidCartItems,
  );
  const [notes, setNotes] = useState();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const cartItems = useSelector((state) => state.restaurant.cart);
  const items = cartItems.map((it) => {
    return {
      quantity: it.count,
      serviceId: unpaidCartItems ? it.serviceId : it.id,
    };
  });

  const dispatch = useDispatch();

  const price = cartItems.reduce((acc, currentVal) => {
    return acc + +currentVal.price * +currentVal.count;
  }, 0);
  const VAT = price * 0.15;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSumbit = (values) => {
    setLoading(true);
    const order = {
      buyerName: values.yourName,
      buyerMobile: values.yourMobile,
      buyerNote: notes,
      patientName: values.patientName,
      room: values.patientRoom,
      type: 2,
      items,
      admissionNumber: admissionNumber ? admissionNumber : undefined,
      fcmToken,
    };
    if (unpaidCartItems && orderToUpdateId) {
      dispatch(
        updateOrder(
          orderToUpdateId,
          order,
          () => {
            setLoading(true);
            setModalVisible(false);
            dispatch(
              payOrder(
                orderToUpdateId,
                (data) => {
                  setLoading(false);

                  navigation.navigate(routesNames.servicesPaymentWebView, {
                    url: data.url,
                    mobileNo: values.yourMobile,
                    serviceType: 2,
                  });
                },
                () => {
                  setLoading(false);
                },
              ),
            );
          },
          () => {
            setLoading(false);
          },
        ),
      );
    } else {
      dispatch(
        makeOrder(
          order,
          (data) => {
            setLoading(true);
            setModalVisible(false);
            console.log('makeOrder', data)
            dispatch(
              payOrder(
                data.orderId,
                (data) => {
                  setLoading(false);
                  console.log('payOrderRes', data);
                  navigation.navigate(routesNames.servicesPaymentWebView, {
                    url: data.url,
                    mobileNo: values.yourMobile,
                    serviceType: 2,
                    from: 'CART',
                  });
                },
                () => {
                  setLoading(false);
                },
              ),
            );
          },
          () => {
            setLoading(false);
          },
        ),
      );
    }
  };

  return (
    <LoadingWrapper>
      <View style={styles().container}>
        <RestaurantHeader
          navigation={navigation}
          children={i18n.t('flowerCart.cart')}
          onPress={
            unpaidCartItems
              ? () => {
                dispatch(clearCart());
                navigation.goBack();
              }
              : null
          }
        />
        <Modal
          avoidKeyboard
          style={styles().modalStyle}
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}>
          <View
            style={{
              backgroundColor: colors.white,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              padding: 20,
              paddingBottom: 0,
              flex: 0.7,
            }}>
            <KeyboardAvoidingScrollView
              containerStyle={{ height: 10 }}
              showsVerticalScrollIndicator={false}>
              <View style={{ alignItems: 'center' }}>
                <Image source={images.order} style={styles().iconImage} />
                <Text style={styles().heading}>
                  {i18n.t('flowerCart.makeOrder')}
                </Text>
                <Controller
                  control={control}
                  name="patientName"
                  rules={{ required: i18n.t('flowerCart.required') }}
                  defaultValue=""
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputWithLabel
                      children={
                        <RequiredText text={i18n.t('flowerCart.patientName')} />
                      }
                      onChange={(value) => onChange(value)}
                      placeholder=""
                      value={value}
                    />
                  )}
                />
                {errors.patientName && (
                  <Text style={styles().error}>
                    {errors.patientName.message}
                  </Text>
                )}
                <Controller
                  control={control}
                  name="patientRoom"
                  rules={{ required: i18n.t('flowerCart.required') }}
                  defaultValue=""
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputWithLabel
                      children={
                        <RequiredText text={i18n.t('flowerCart.patientRoom')} />
                      }
                      onChange={(value) => onChange(value)}
                      placeholder=""
                      value={value}
                    />
                  )}
                />
                {errors.patientRoom && (
                  <Text style={styles().error}>
                    {errors.patientRoom.message}
                  </Text>
                )}
                <Controller
                  control={control}
                  name="yourName"
                  rules={{ required: i18n.t('flowerCart.required') }}
                  defaultValue=""
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputWithLabel
                      children={
                        <RequiredText text={i18n.t('flowerCart.yourName')} />
                      }
                      onChange={(value) => onChange(value)}
                      placeholder=""
                      value={value}
                    />
                  )}
                />
                {errors.yourName && (
                  <Text style={styles().error}>{errors.yourName.message}</Text>
                )}
                <Controller
                  control={control}
                  name="yourMobile"
                  rules={{ required: i18n.t('flowerCart.required') }}
                  defaultValue=""
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputWithLabel
                      keyboardType="phone-pad"
                      children={
                        <RequiredText text={i18n.t('flowerCart.yourMobile')} />
                      }
                      onChange={(value) => onChange(value)}
                      placeholder=""
                      value={value}
                    />
                  )}
                />
                {errors.yourMobile && (
                  <Text style={styles().error}>
                    {errors.yourMobile.message}
                  </Text>
                )}
                <Text style={styles().notes}>{i18n.t('flowerCart.notes')}</Text>
                <TextInput
                  value={notes}
                  onChangeText={(val) => {
                    setNotes(val);
                  }}
                  numberOfLines={10}
                  multiline
                  style={styles().inputStyle}
                />
                <AppButton
                  loading={loading}
                  text={i18n.t('flowerCart.payNow')}
                  onPress={handleSubmit(onSumbit)}
                />
              </View>
            </KeyboardAvoidingScrollView>
          </View>
        </Modal>

        <FlatList
          ListEmptyComponent={
            <NoResults text={i18n.t('flowerCart.emptyCart')} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles().itemsContainer}
          data={cartItems}
          keyExtractor={(item, i) => String(i)}
          renderItem={({ item }) => <CartItem item={item} />}
        />
        {cartItems.length > 0 && (
          <View style={styles().orderContainer}>
            <View style={styles().priceRow}>
              <Text style={styles().heading}>
                {i18n.t('flowerCart.subtotal')}
              </Text>
              <Text style={styles().subHeading}>
                {I18nManager.isRTL
                  ? converENDigitsToAr(price.toFixed(2))
                  : price.toFixed(2)}{' '}
                {i18n.t('giftsShopHome.sar')}
              </Text>
            </View>
            <View style={[styles().priceRow, styles().borderBottom]}>
              <Text style={styles().heading}>
                {i18n.t('flowerCart.VAT')}{' '}
                {I18nManager.isRTL ? converENDigitsToAr('15') : 15}%
              </Text>
              <Text style={styles().subHeading}>
                {I18nManager.isRTL
                  ? converENDigitsToAr(VAT.toFixed(2))
                  : VAT.toFixed(2)}{' '}
                {i18n.t('giftsShopHome.sar')}
              </Text>
            </View>
            <View style={styles().priceRow}>
              <Text style={styles().primaryHeading}>
                {i18n.t('flowerCart.total')}
              </Text>
              <Text style={styles().primaryHeading}>
                {I18nManager.isRTL
                  ? converENDigitsToAr((price + VAT).toFixed(2))
                  : (price + VAT).toFixed(2)}{' '}
                {i18n.t('giftsShopHome.sar')}
              </Text>
            </View>
            <AppButton
              loading={loading}
              text={
                unpaidCartItems
                  ? i18n.t('flowerCart.updateOrder')
                  : i18n.t('flowerCart.makeOrder')
              }
              onPress={() => setModalVisible(true)}
              color={unpaidCartItems ? colors.orange : null}
            />
          </View>
        )}
      </View>
    </LoadingWrapper>
  );
};

const RequiredText = ({ text }) => (
  <Text>
    {text}{' '}
    <Text
      style={{
        color: colors.red,
      }}>
      *
    </Text>
  </Text>
);

export default RestaurantCart;
