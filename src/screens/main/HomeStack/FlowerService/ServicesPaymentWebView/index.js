import Axios from 'axios';
import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  I18nManager,
  Image,
  TouchableOpacity,
} from 'react-native';
import {RippleLoader} from 'react-native-indicator';
import {WebView} from 'react-native-webview';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';
import {CommonActions} from '@react-navigation/native';

import {
  AppButton,
  LoadingWrapper,
  PrimaryButton,
} from '../../../../../components';
import {
  colors,
  displayToast,
  fontFamilies,
  i18n,
  images,
  routesNames,
  shadows,
  WP,
} from '../../../../../services';
import {smallScreens} from '../../../../../services/utilities/responsive';
import {
  clearCart,
  getAllOrders,
} from '../../../../../store/actions/main/flowerServiceActions';
import {
  clearCart as clearCartRestaurant,
  getAllOrders as getAllOrdersRestaurant,
} from '../../../../../store/actions/main/restaurantActions';

const ServicesPaymentWebView = ({route, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState();
  const {url, mobileNo, serviceType, from} = route.params;
  console.log(mobileNo);
  console.log('from', from);
  const _webViewRef = useRef(null);

  const dispatch = useDispatch();
  return (
    <LoadingWrapper
      navigation={navigation}
      header
      headerText={I18nManager.isRTL ? 'الدفع' : 'Payment'}>
      {loading && (
        <>
          <View style={styles().overLayContainer}></View>
          <View style={styles().loaderContainer}>
            <RippleLoader size={30} color={colors.white} />
          </View>
        </>
      )}
      <WebView
        onLoadStart={(e) => {
          setLoading(true);
        }}
        onLoadEnd={() => {
          setLoading(false);
        }}
        onError={(e) => {
          console.log('error', e.nativeEvent);
        }}
        onHttpError={(e) => {
          console.log('httperror', e.nativeEvent);
        }}
        onMessage={(e) => {
          console.log('message', e.nativeEvent);
        }}
        onShouldStartLoadWithRequest={(e) => {
          console.log('Should Load', e);
          const url = e.url.split('/').toString();
          console.log(url);
          if (url.includes('services')) {
            setLoading(true);
            Axios.get(e.url)
              .then((res) => {
                console.log(res);
                const resText = res.data.data.status.text;
                setLoading(false);

                if (resText === 'Cancelled') {
                  setInvoiceStatus(res.data.data);
                  navigation.goBack();
                } else if (resText === 'Declined') {
                  setInvoiceStatus(res.data.data);
                  setIsModalVisible(true);
                } else if (resText === 'Paid') {
                  setInvoiceStatus(res.data.data);
                  setIsModalVisible(true);
                }
              })
              .catch((err) => console.log({...err}));
          }
          return true;
        }}
        ref={_webViewRef}
        // onShouldStartLoadWithRequest={(e) => {
        //   if (e.url.includes('undefined')) {
        //     setPaymentStatus(e.url);
        //     const url = e.url.replace('undefined', '104.248.132.157:4000');
        //     Axios.get(paymentStatus ? paymentStatus : url)
        //       .then((res) => {
        //         const resText = res.data.data.status.text;
        //         // console.log(res.data.data);
        //         setLoading(false);

        //         if (resText === 'Cancelled') {
        //           setInvoiceStatus(res.data.data);
        //           navigation.goBack();
        //         } else if (resText === 'Declined') {
        //           setInvoiceStatus(res.data.data);
        //           setIsModalVisible(true);
        //         } else if (resText === 'Paid') {
        //           setInvoiceStatus(res.data.data);
        //           setIsModalVisible(true);
        //         }
        //       })
        //       .catch((err) => {
        //         setLoading(false);
        //         displayToast(
        //           'error',
        //           I18nManager.isRTL
        //             ? 'حدث خطأ ما، من فضلك حاول مجدداً'
        //             : 'Something went wrong please, try again!',
        //         );
        //         navigation.goBack();
        //       });
        //     return false;
        //   }
        //   return true;
        // }}
        // onNavigationStateChange={(e) => {
        //   if (e.url.includes('undefined')) {
        //     _webViewRef.current.stopLoading();

        //     setLoading(true);

        //     const url = e.url.replace('undefined', '104.248.132.157:4000');
        //     Axios.get(paymentStatus ? paymentStatus : url)
        //       .then((res) => {
        //         const resText = res.data.data.status.text;
        //         // console.log(res.data.data);
        //         setLoading(false);

        //         if (resText === 'Cancelled') {
        //           setInvoiceStatus(res.data.data);
        //           navigation.goBack();
        //         } else if (resText === 'Declined') {
        //           setInvoiceStatus(res.data.data);
        //           setIsModalVisible(true);
        //         } else if (resText === 'Paid') {
        //           setInvoiceStatus(res.data.data);
        //           setIsModalVisible(true);
        //         }
        //       })
        //       .catch((err) => {
        //         setLoading(false);
        //         displayToast(
        //           'error',
        //           I18nManager.isRTL
        //             ? 'حدث خطأ ما، من فضلك حاول مجدداً'
        //             : 'Something went wrong please, try again!',
        //         );
        //         navigation.goBack();
        //       });
        //   }
        // }}
        style={{flex: 1}}
        source={{uri: url}}
      />
      {invoiceStatus && (
        <Modal
          backdropColor={colors.bgColor}
          backdropOpacity={1}
          isVisible={isModalVisible}
          onBackdropPress={() => {
            setIsModalVisible(false);

            navigation.goBack();
          }}>
          <View style={styles().invoiceStatusContainer}>
            <Text style={styles().paymentText}>
              {i18n.locale === 'en' ? 'Order' : 'الطلب'}#
              {invoiceStatus.transCount}
            </Text>
            <Image
              source={
                invoiceStatus.status.text === 'Declined'
                  ? images.error
                  : images.success
              }
              style={{
                width: 100,
                height: 100,
                marginVertical: 20,
              }}
            />
            <Text
              style={{
                ...styles().paymentText,
                color:
                  invoiceStatus.status.text === 'Declined'
                    ? colors.red
                    : colors.green,
              }}>
              {invoiceStatus.status.text === 'Declined'
                ? i18n.t('orderOverview.paymentFailure')
                : invoiceStatus.status.text === 'Paid'
                ? i18n.t('orderOverview.paymentSuccess')
                : null}
            </Text>
            {invoiceStatus.status.text === 'Paid' ? (
              <>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    dispatch(
                      serviceType === 1 ? clearCart() : clearCartRestaurant(),
                    );
                    // navigation.reset({
                    //   index: 0,
                    //   routes: [{name: routesNames.main}],
                    // });
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 1,
                        routes: [{name: routesNames.main}],
                      }),
                    );
                    setIsModalVisible(false);
                  }}
                  style={{
                    backgroundColor: colors.skyBlue,
                    width: WP('80'),
                    borderRadius: 10,
                    alignItems: 'center',
                    padding: 15,
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      color: colors.whiteAbsolute,
                      fontFamily: fontFamilies('boldText'),
                    }}>
                    {i18n.locale === 'ar'
                      ? 'عودة الي الرئيسية'
                      : 'Back to Home'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setIsModalVisible(false);
                    if (serviceType === 1) {
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [
                            {
                              name: routesNames.main,
                            },
                            {
                              name: routesNames.flowerService,
                            },
                            {
                              name: routesNames.invoicesOverview,
                              params: {
                                mobileNo,
                              },
                            },
                          ],
                        }),
                      );
                    } else {
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [
                            {
                              name: routesNames.main,
                            },
                            {
                              name: routesNames.restaurantService,
                            },
                            {
                              name: routesNames.restaurantInvoicesOverView,
                              params: {
                                mobileNo,
                              },
                            },
                          ],
                        }),
                      );
                    }
                  }}
                  style={{
                    backgroundColor: colors.skyBlue,
                    width: WP('80'),
                    borderRadius: 10,
                    alignItems: 'center',
                    padding: 15,
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      color: colors.whiteAbsolute,
                      fontFamily: fontFamilies('boldText'),
                    }}>
                    {i18n.locale === 'ar' ? 'مشاهدة طلباتي' : 'My Orders'}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <AppButton
                text={i18n.locale === 'en' ? 'Back' : 'رجوع'}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            )}
          </View>
        </Modal>
      )}
    </LoadingWrapper>
  );
};

export default ServicesPaymentWebView;

const styles = () =>
  StyleSheet.create({
    overLayContainer: {
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 10,
      backgroundColor: colors.darkGrey,
      opacity: 0.9,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loaderContainer: {
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    invoiceStatusContainer: {
      backgroundColor: colors.white,
      padding: 20,
      ...shadows.lightShadowGrey,
      elevation: 5,
      borderRadius: 10,
      alignItems: 'center',
    },
    paymentText: {
      fontFamily: fontFamilies('boldText'),
      fontSize: smallScreens ? 14 : 16,
      color: colors.black,
    },
  });
