import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  I18nManager,
} from 'react-native';
import Modal from 'react-native-modal';
import { AirbnbRating } from 'react-native-ratings';
import moment from 'moment-timezone';

import { useDispatch } from 'react-redux';
import CountDownTimer from 'react-native-countdown-timer-hooks';
import { RippleLoader } from 'react-native-indicator';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  fontFamilies,
  colors,
  shadows,
  routesNames,
  images,
  i18n,
} from '../../../../../services';
import { orderService } from '../../../../../store/actions/main/inpatientServicesActions';
import {
  converENDigitsToAr,
  displayToast,
} from '../../../../../services/utilities/helpers';
import { smallScreens, WP } from '../../../../../services/utilities/responsive';
import AsyncStorage from '@react-native-community/async-storage';

const Order = ({ order, navigation, handleRefresh }) => {
  const [serviceLoadin, setServiceLoadin] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fcmToken, setFcmToken] = useState('');

  // Timer References
  const refTimer = useRef();

  // For keeping a track on the Timer
  const [timer, setTimer] = useState(120);

  const dispatch = useDispatch();
  const LastUpdatedDate = new Date(
    order.UPD_DATE ? order.UPD_DATE : order.REQ_DATE,
  );
  LastUpdatedDate.setHours(LastUpdatedDate.getHours() - 3);
  // console.log('LastUpdatedDate' + order.REQ_NO, LastUpdatedDate);
  const now = new Date();
  const remimderDiff = moment(now).diff(LastUpdatedDate, 'minute');
  const momentDateNow = moment(now);
  const seconds = 900 - parseInt(momentDateNow.diff(LastUpdatedDate) / 1000);
  // console.log('momentDateNow' + order.REQ_NO, momentDateNow);
  // console.log('remimderDiff' + order.REQ_NO, remimderDiff);

  useEffect(() => {
    getToken()
  }, []);

  const getToken = async () => {
    await AsyncStorage.getItem('fcmToken').then((token) => {
      setFcmToken(token);
    });
  }

  const handleSendReminder = () => {
    if (remimderDiff >= 15) {
        console.log('fcmToken', fcmToken);
      if (fcmToken) {
        setServiceLoadin(true);
        dispatch(
          orderService(
            {
              admissionNumber: order.ADM_NO.trim(),
              message: '',
              token: fcmToken,
            },
            order.TYPE,
            (data) => {
              setServiceLoadin(false);
              displayToast(
                'success',
                i18n.t('inpatientOrder.sendReminderMsg'),
                5000,
                0,
                colors.green,
              );
              handleRefresh();
            },
            () => {
              setServiceLoadin(false);
            },
          ),
        );
      }
    } else {
      displayToast('error', i18n.t('inpatientAlert.reminderMargin'), 3000);
    }
  };

  return (
    <View style={styles().serviceContainer}>
      <View style={styles().rowService}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 4,
          }}>
          <View style={styles().iconContainer}>
            <Image
              style={{
                width: smallScreens ? 15 : 25,
                height: smallScreens ? 15 : 25,
                resizeMode: 'contain',
              }}
              source={
                order?.TYPE == '02'
                  ? images.patientRelations
                  : order?.TYPE == '01'
                    ? images.cleaning
                    : order?.TYPE == '03'
                      ? images.doctorRequest
                      : order?.TYPE == '04'
                        ? images.mintanace
                        : order?.TYPE == '05'
                          ? images.dutyManager
                          : order?.TYPE == '06'
                            ? images.babyWhite
                            : order?.TYPE == '07'
                              ? images.babyWhite
                              : order?.TYPE == '08'
                                ? images.medicalReportWhite
                                : order?.TYPE == '09'
                                  ? images.attendantWhite
                                  : images.logoWhite
              }
            />
          </View>
          <View
            style={{
              flex: 8,
              marginHorizontal: 10,
              alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-start',
            }}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: fontFamilies('boldTextHeader'),
                fontSize: smallScreens ? 12 : 14,
                color: colors.black,
                maxWidth: WP('32'),
              }}>
              {order?.TYPE == '02'
                ? i18n.t('inpatientOrder.patientRels')
                : order?.TYPE == '01'
                  ? i18n.t('inpatientOrder.cleaningService')
                  : order?.TYPE == '03'
                    ? i18n.t('inpatientOrder.doctorReq')
                    : order?.TYPE == '04'
                      ? i18n.t('inpatientOrder.maintenance')
                      : order?.TYPE == '05'
                        ? i18n.t('inpatientOrder.dutyManage')
                        : order?.TYPE == '06'
                          ? i18n.t('inpatientOrder.requestBaby')
                          : order?.TYPE == '07'
                            ? i18n.t('inpatientOrder.pullBaby')
                            : order?.TYPE == '08'
                              ? i18n.t('inpatientOrder.reportRequest')
                              : order?.TYPE == '09'
                                ? i18n.t('inpatientOrder.reportCompanionRequest')
                                : null}
            </Text>
            <Text
              style={{
                fontFamily: fontFamilies('semiboldText'),
                fontSize: smallScreens ? 9 : 11,
                color: colors.grey,
                marginTop: 10,
              }}>
              {i18n.t('inpatientOrder.orderNo')}: #
              {I18nManager.isRTL
                ? converENDigitsToAr(order?.REQ_NO)
                : order?.REQ_NO}
            </Text>
            <Text
              style={{
                fontFamily: fontFamilies('semiboldText'),
                fontSize: smallScreens ? 9 : 11,
                color: colors.grey,
                marginTop: 10,
              }}>
              {i18n.t('inpatientOrder.closingNo')}: #
              {I18nManager.isRTL
                ? converENDigitsToAr(order.ACTIVE_CODE ? order.ACTIVE_CODE : '')
                : order.ACTIVE_CODE
                  ? order.ACTIVE_CODE
                  : ''}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: colors.green,
          }}>
          {order.RATE ? (
            <View
              style={{
                marginHorizontal: 10,
              }}>
              <AirbnbRating
                count={5}
                defaultRating={order?.RATE}
                size={10}
                isDisabled={true}
                showRating={false}
              />
            </View>
          ) : order.CLOSED == 0 || order.CLOSED === null ? (
            <View
              style={{
                // width: Dimensions.get('screen').width / 3,
                flex: 1,
                marginHorizontal: 10,
                // alignItems: 'stretch',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: fontFamilies('boldText'),
                    color: colors.grey,
                    fontSize: smallScreens ? 10 : 12,
                  }}>
                  {I18nManager.isRTL ? 'عدد مرات التذكير:' : 'Reminder Count:'}
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamilies('boldText'),
                    color: colors.skyBlue,
                    marginHorizontal: 5,
                    fontSize: smallScreens ? 10 : 12,
                  }}>
                  {order.REMINDER_COUNT === 0 || order.REMINDER_COUNT === null
                    ? 0
                    : I18nManager.isRTL
                      ? converENDigitsToAr(order.REMINDER_COUNT)
                      : order.REMINDER_COUNT}
                </Text>
              </View>
              {/* <TouchableOpacity
                onPress={() => {}}
                style={{
                  backgroundColor: colors.red,
                  padding: 8,
                  borderRadius: 4,
                }}>
                <Text
                  style={{
                    color: colors.whiteAbsolute,
                    textAlign: 'center',
                    fontSize: 11,
                    fontFamily: fontFamilies('boldText'),
                  }}>
                  {i18n.t('inpatientOrder.cancel')}
                </Text>
              </TouchableOpacity> */}
              {remimderDiff < 15 ? (
                <TouchableOpacity
                  disabled={true}
                  onPress={() => {
                    handleSendReminder();
                  }}
                  style={{
                    flexDirection: 'row',
                    backgroundColor: colors.grey,
                    padding: 8,
                    borderRadius: 4,
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: smallScreens ? 8 : 12,
                      color: colors.whiteAbsolute,
                      fontFamily: fontFamilies('boldText'),
                    }}>
                    {I18nManager.isRTL ? 'انتظر' : 'Wait'}{' '}
                  </Text>
                  <CountDownTimer
                    ref={refTimer}
                    timestamp={seconds}
                    timerCallback={() => {
                      handleRefresh();
                    }}
                    containerStyle={{
                      height: 12,
                      width: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 35,
                    }}
                    textStyle={{
                      fontSize: smallScreens ? 8 : 12,
                      color: '#FFFFFF',
                      fontWeight: '500',
                      letterSpacing: 0.25,
                      fontFamily: fontFamilies('boldText'),
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    handleSendReminder();
                  }}
                  style={{
                    backgroundColor: colors.orange,
                    padding: 8,
                    borderRadius: 4,
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {serviceLoadin ? (
                    <View>
                      <RippleLoader size={10} color={colors.whiteAbsolute} />
                    </View>
                  ) : (
                    <Text
                      style={{
                        color: colors.whiteAbsolute,
                        textAlign: 'center',
                        fontSize: 11,
                        fontFamily: fontFamilies('boldText'),
                      }}>
                      {i18n.t('inpatientOrder.sendReminder')}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                if (order) {
                  navigation.navigate(routesNames.alert, {
                    rating: order,
                  });
                }
              }}
              style={{
                backgroundColor: colors.skyBlue,
                padding: 10,
                paddingHorizontal: 20,
                borderRadius: 4,
                marginHorizontal: 10,
              }}>
              <Text
                style={{
                  color: colors.whiteAbsolute,
                  fontFamily: fontFamilies('semiboldText'),
                }}>
                {i18n.t('inpatientOrder.rate')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {order.NURSE_CODE && order.NURSE_NAME && (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  setIsModalVisible(true);
                }}
                style={{
                  ...styles().iconContainer,
                  marginTop: 10,
                  width: 65,
                  height: 65,
                  backgroundColor: colors.skyBlue,
                  borderRadius: 10,
                  overflow: 'hidden',
                  padding: order.NURSE_CODE
                    ? 0
                    : styles().iconContainer.padding,
                  borderWidth: 1,
                  borderColor: colors.skyBlue,
                }}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                  }}
                  source={
                    order.NURSE_CODE
                      ? {
                        uri: `https://udh.sa/nurse_images/${order.NURSE_CODE.trim()}.jpg`,
                      }
                      : images.healthCare
                  }
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 2,
                padding: 5,
                alignItems: 'flex-start',
              }}>
              <View style={{ marginVertical: 10 }}>
                <Text style={styles().employeeHeading}>
                  {i18n.t('inpatientOrder.employeeCode')}
                </Text>
                <Text style={styles().employeeDetail}>
                  {order.NURSE_CODE.trim()}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-start' }}>
                <Text
                  style={{
                    ...styles().employeeHeading,
                  }}>
                  {i18n.t('inpatientOrder.employeeName')}{' '}
                </Text>
                <Text style={{ ...styles().employeeDetail, marginTop: 5 }}>
                  {order.NURSE_NAME.trim()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
      {order.NURSE_CODE && order.NURSE_NAME && (
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setIsModalVisible(false)}>
          <View
            style={{
              backgroundColor: colors.white,
              justifyContent: 'center',
              padding: 40,
              borderRadius: 10,
            }}>
            <Icon
              onPress={() => setIsModalVisible(false)}
              name="ios-close"
              size={24}
              color={colors.darkGrey}
              style={{ position: 'absolute', top: 20, left: 20 }}
            />
            <View
              style={{
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 10,
                  borderColor: colors.skyBlue,
                  borderWidth: 1.5,
                }}
                source={{
                  uri: `https://udh.sa/nurse_images/${order.NURSE_CODE.trim()}.jpg`,
                }}
              />
            </View>
            <View
              style={{
                marginTop: 20,
                alignItems: 'center',
              }}>
              <Text style={styles().employeeHeading}>
                {' '}
                {i18n.t('inpatientOrder.employeeCode')}{' '}
              </Text>
              <Text
                style={{
                  ...styles().employeeDetail,
                  marginVertical: 10,
                }}>
                {order.NURSE_CODE.trim()}
              </Text>
              <Text style={styles().employeeHeading}>
                {i18n.t('inpatientOrder.employeeName')}{' '}
              </Text>
              <Text style={{ ...styles().employeeDetail, marginVertical: 10 }}>
                {order.NURSE_NAME.trim()}
              </Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Order;

const styles = () =>
  StyleSheet.create({
    serviceContainer: {
      backgroundColor: colors.greyishWhite,
      marginVertical: 10,
      padding: 6,
      paddingVertical: 15,
      marginHorizontal: 20,
      borderRadius: 15,
      ...shadows.lightShadowGreyLowSpread,
      elevation: 5,
      flex: 1,
    },
    rowService: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    iconContainer: {
      flex: 1,
      backgroundColor: colors.skyBlue,
      padding: 15,
      marginHorizontal: 5,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    employeeHeading: {
      color: colors.grey,
      fontFamily: fontFamilies('normalText'),
      fontSize: smallScreens ? 12 : 14,
    },
    employeeDetail: {
      fontFamily: fontFamilies('boldText'),
      color: colors.skyBlue,
    },
  });
