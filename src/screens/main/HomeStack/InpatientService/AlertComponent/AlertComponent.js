import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  I18nManager,
  TextInput,
} from 'react-native';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {AirbnbRating, Rating} from 'react-native-ratings';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';

import {InputWithLabel} from '../../../../../components';
import {
  colors,
  displayToast,
  fontFamilies,
  HP,
  i18n,
  routesNames,
  WP,
} from '../../../../../services';
import {
  orderService,
  rateService,
} from '../../../../../store/actions/main/inpatientServicesActions';
import AsyncStorage from '@react-native-community/async-storage';

const AlertComponent = ({route, navigation}) => {
  const [msg, setMsg] = useState();
  const [rate, setRate] = useState();
  const [serviceLoadin, setServiceLoadin] = useState(false);
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('fcmToken').then((token) => {
      // const parsedToken = JSON.parse(token);
      // setFcmToken(parsedToken);
      setFcmToken(token);
    });
  }, []);

  const dispatch = useDispatch();

  const cleaningService = route.params?.cleaningService;
  const patientRels = route.params?.patientRels;
  const doctorReq = route.params?.doctorReq;
  const maintenance = route.params?.maintenance;
  const dutyManager = route.params?.dutyManager;
  const requestBaby = route.params?.requestBaby;
  const pullBaby = route.params?.pullBaby;
  const requestReport = route.params?.requestReport;
  const requestAttendantReport = route.params?.requestAttendantReport;
  const rating = route.params?.rating;
  const inpatient = route.params?.inpatient;
  const serviceId = route.params?.serviceId;
  const openService = route.params?.openService;
  const setLoading = route.params?.setLoading;
  const setOpenRequests = route.params?.setOpenRequests;
  // const openService = [];

  const lastUpdatedDate =
    openService?.length > 0
      ? openService[0]?.UPD_DATE
        ? new Date(openService[0]?.UPD_DATE)
        : new Date(openService[0]?.REQ_DATE)
      : null;
  const now = new Date();
  const remimderDiff = moment(now - lastUpdatedDate).minutes();

  const handleOrderService = () => {
    if (!lastUpdatedDate) {
      console.log('[calling form] first time');
      setServiceLoadin(true);
      if (fcmToken) {
        dispatch(
          orderService(
            {
              admissionNumber: inpatient.ADMISSIONNO,
              message: msg,
              token: fcmToken,
            },
            serviceId,
            (data) => {
              displayToast(
                'success',
                cleaningService
                  ? i18n.t('inpatientAlert.firstTimeOrderCleaningService')
                  : patientRels
                  ? i18n.t('inpatientAlert.firstTimeOrderPatientRels')
                  : doctorReq
                  ? i18n.t('inpatientAlert.firstTimeOrderDoctor')
                  : maintenance
                  ? i18n.t('inpatientAlert.firstTimeOrderMaitenance')
                  : dutyManager
                  ? i18n.t('inpatientAlert.firstTimeOrderDutyManager')
                  : requestBaby
                  ? i18n.t('inpatientAlert.firstTimeOrderRequestBaby')
                  : pullBaby
                  ? i18n.t('inpatientAlert.firstTimeOrderPullBaby')
                  : requestReport
                  ? i18n.t('inpatientAlert.firstTimeOrderMedReport')
                  : requestAttendantReport
                  ? i18n.t('inpatientAlert.firstTimeOrderAttendantRep')
                  : null,
              );
              setServiceLoadin(false);
              navigation.replace(routesNames.successServiceAlert, {
                patientRelsFirst: cleaningService ? false : true,
                inpatient,
                setLoading,
                setOpenRequests,
              });
            },
            () => {
              setServiceLoadin(false);
            },
          ),
        );
      } else {
        displayToast('error', i18n.t('signUpTranslations.unknownError'));
      }
    } else if (remimderDiff >= 2) {
      console.log('[calling from second time order]');
      setServiceLoadin(true);
      dispatch(
        orderService(
          {
            admissionNumber: inpatient.ADMISSIONNO,
            message: msg,
            token: fcmToken,
          },
          serviceId,
          (data) => {
            setServiceLoadin(false);
            navigation.replace(routesNames.successServiceAlert, {
              ref: 'patientRels',
              inpatient,
              setLoading,
              setOpenRequests,
            });
          },
          () => {
            setServiceLoadin(false);
          },
        ),
      );
    } else {
      displayToast('error', i18n.t('inpatientAlert.reminderMargin'), 3000);
    }
  };

  const handleRating = () => {
    setServiceLoadin(true);
    dispatch(
      rateService(
        rating.ADM_NO,
        rating.REQ_NO,
        {rate, message: msg},
        () => {
          (data) => setServiceLoadin(false);
          navigation.replace(routesNames.successServiceAlert, {
            successRate: 'successRate',
          });
        },
        () => {
          setServiceLoadin(false);
        },
      ),
    );
  };

  return (
    <>
      <KeyboardAvoidingScrollView
        containerStyle={{zIndex: 1}}
        contentContainerStyle={{flex: 1}}>
        <View style={styles().container}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.goBack()}
            style={styles().dismiss}></TouchableOpacity>
        </View>
        <View
          style={{
            ...styles().alertContainer,
            top:
              ((patientRels || doctorReq || maintenance || dutyManager) &&
                openService?.length === 0) ||
              rating
                ? '25%'
                : '35%',
            paddingBottom: rating ? 40 : 0,
          }}>
          {serviceLoadin ? (
            <View
              style={{
                flex: 1,
                position: 'absolute',
                zIndex: 1001,
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                backgroundColor: colors.lightGrey,
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <ActivityIndicator size="large" color={colors.skyBlue} />
            </View>
          ) : null}
          <Text style={styles().heading}>
            {cleaningService ? i18n.t('inpatientAlert.cleaningHeading') : null}
            {patientRels ? i18n.t('inpatientAlert.patientRelsHeading') : null}
            {doctorReq ? i18n.t('inpatientOrder.doctorReq') : null}
            {maintenance ? i18n.t('inpatientOrder.maintenance') : null}
            {dutyManager ? i18n.t('inpatientOrder.dutyManage') : null}
            {requestBaby ? i18n.t('inpatientOrder.requestBabyFull') : null}
            {pullBaby ? i18n.t('inpatientOrder.pullBabyFull') : null}
            {requestReport
              ? i18n.t('inpatientDetailsTranslation.reportRequest')
              : null}
            {requestAttendantReport
              ? i18n.t('inpatientDetailsTranslation.reportCompanionRequest')
              : null}
            {rating ? i18n.t('inpatientAlert.rate') : null}
          </Text>
          {rating ? (
            <View>
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
                  tintColor={colors.greyishWhite}
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
              <TouchableOpacity
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
                style={styles().rateBtn}>
                <Text
                  style={{
                    fontFamily: fontFamilies('semiboldText'),
                    fontSize: 14,
                    color: colors.whiteAbsolute,
                  }}>
                  {i18n.t('inpatientOrder.rate')}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles().subHeading}>
              {openService?.length == 0
                ? cleaningService
                  ? i18n.t('inpatientAlert.newCleaningSubHeading')
                  : patientRels
                  ? i18n.t('inpatientAlert.newPatientRelsSubHeading')
                  : doctorReq
                  ? i18n.t('inpatientAlert.newDoctorReqSubHeading')
                  : maintenance
                  ? i18n.t('inpatientAlert.newMaintenanceSubHeading')
                  : dutyManager
                  ? i18n.t('inpatientAlert.newDutyManagerSubHeading')
                  : requestBaby
                  ? i18n.t('inpatientAlert.newRequestBabySubHeading')
                  : pullBaby
                  ? i18n.t('inpatientAlert.newPullBabySubHeading')
                  : requestReport
                  ? i18n.t('inpatientAlert.newMedicalReportSubHeading')
                  : requestAttendantReport
                  ? i18n.t('inpatientAlert.newAttendantReportSubHeading')
                  : null
                : i18n.t('inpatientAlert.subHeadingReminder')}
            </Text>
          )}
          {(patientRels || doctorReq || maintenance || dutyManager) &&
          openService?.length === 0 ? (
            <TextInput
              value={msg}
              onChangeText={(val) => setMsg(val)}
              numberOfLines={10}
              multiline
              placeholder={i18n.t('inpatientAlert.message')}
              style={styles().inputStyle}
            />
          ) : null}

          {rating ? null : (
            <View style={styles().actionBtns}>
              <View style={styles().btnFlex}>
                <TouchableOpacity
                  onPress={() => {
                    handleOrderService();
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: Dimensions.get('screen').width / 2 - 30,
                  }}>
                  <Text
                    style={{
                      color: colors.skyBlue,
                      fontFamily: fontFamilies('normalTextHeader'),
                    }}>
                    {openService?.length > 0
                      ? i18n.t('inpatientAlert.sendReminder')
                      : i18n.t('inpatientAlert.continue')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 1,
                  backgroundColor: colors.lightGrey,
                  height: '100%',
                }}></View>
              <View style={styles().btnFlex}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: Dimensions.get('screen').width / 2 - 30,
                  }}>
                  <Text
                    style={{
                      color: colors.red,
                      fontFamily: fontFamilies('normalTextHeader'),
                    }}>
                    {i18n.t('inpatientAlert.no')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </KeyboardAvoidingScrollView>
    </>
  );
};

export default AlertComponent;

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: HP('100'),
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: colors.black,
      opacity: 0.5,
      zIndex: 1,
    },
    dismiss: {
      width: Dimensions.get('screen').width,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    alertContainer: {
      marginHorizontal: 20,
      backgroundColor: colors.greyishWhite,
      zIndex: 2,
      position: 'absolute',
      width: Dimensions.get('screen').width - 40,
      top: '45%',
      borderRadius: 10,
      alignItems: 'center',
    },
    heading: {
      fontFamily: fontFamilies('boldTextHeader'),
      marginVertical: 10,
      marginTop: 20,
      color: colors.black,
    },
    subHeading: {
      fontFamily: fontFamilies('normalText'),
      textAlign: 'center',
      paddingHorizontal: 20,
      color: colors.darkGrey,
      lineHeight: 25,
      width: WP('90'),
    },
    actionBtns: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      borderTopColor: colors.lightGrey,
      borderTopWidth: 2,
      marginTop: 20,
      flexWrap: 'wrap',
    },
    btnFlex: {
      flex: 1,
      marginHorizontal: 5,
      alignItems: 'center',
      padding: 20,
    },
    rateBtn: {
      padding: 15,
      marginVertical: 20,
      backgroundColor: colors.skyBlue,
      borderRadius: 10,
      alignItems: 'center',
    },
    inputStyle: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      height: HP('14'),
      paddingHorizontal: 20,
      paddingTop: 10,
      backgroundColor: colors.white,
      marginTop: 10,
      width: WP('80'),
      borderWidth: 1,
      borderColor: colors.lightGrey,
      borderRadius: 10,
      fontFamily: fontFamilies('normalText'),
      lineHeight: 25,
      textAlign: I18nManager.isRTL ? 'right' : 'auto',
      textAlignVertical: 'top',
    },
  });
