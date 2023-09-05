import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Animated,
  Keyboard,
  FlatList,
  Easing,
} from 'react-native';
import ShadowView from 'react-native-simple-shadow-view';
import {
  shadows,
  mobileNumber,
  colors,
  images,
  homeReducersTypes,
  i18n,
  formatMilitaryTime,
  getAMPMtime,
  convertFromArabic,
} from '../../../../services';
import styles from './styles';
import {
  Text,
  InputWithLabel,
  PrimaryButton,
  HollowButton,
  EnterPhoneNumModal,
} from '../../../../components';
import {connect, useSelector, useDispatch} from 'react-redux';
import {getAllDoctors, getMyAppointments} from '../../../../store/actions';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

const UpcomingAppointments = ({getAllDoctors, getMyAppointments}) => {
  const [show, setShow] = useState(false);
  const allDoctors = useSelector((state) => state.appointments.allDoctors);
  const allAppointments = useSelector(
    (state) => state.appointments.myAppointments,
  );
  // const top = useRef(new Animated.Value(-200)).current;
  const top = useRef(new Animated.Value(0)).current;
  const [showMobileNumModal, setShowMobileNumModal] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');
  const [upcoming, setUpcoming] = useState();
  const dismissedStatus = useSelector((state) => state.home.dismissed);

  useEffect(() => {
    setTimeout(getData, 1000);
  }, []);

  // UNCOMMENT THIS FOR ANIMATION
  // useEffect(() => {
  //     Animated.timing(top, {
  //         duration: 700,
  //         easing: Easing.linear,
  //         toValue: show ? 10 : -200
  //     }).start();
  // }, [show]);

  const getData = async () => {
    const myMobileNum = await AsyncStorage.getItem(mobileNumber);
    if (!myMobileNum) {
      if (!dismissedStatus) setShowMobileNumModal(true);
      return;
    }
    if (allDoctors && allAppointments) return;
    const cbSuccess = () => {
      getMyAppointments(
        `?mobileNumber=${convertFromArabic(myMobileNum)}`,
        () => {
          setShow(true);
        },
        () => {},
      );
    };
    const cbFailure = () => {};
    if (!allDoctors) {
      getAllDoctors(cbSuccess, cbFailure);
    } else if (!allAppointments) {
      cbSuccess();
    }
  };

  useEffect(() => {
    if (allAppointments && allDoctors) {
      if (allAppointments.Result) {
        const updatedAllAppointments = allAppointments.Result.map((el) => {
          const matchingDoc = allDoctors.find(
            (doc) => doc.DOC_CODE.trim() === el.CLIN_CODE.trim(),
          );
          if (matchingDoc)
            return {
              ...el,
              THUMBNAIL: matchingDoc.IMAGE_URI,
              SEX: matchingDoc.SEX,
            };
          return {...el};
        });
        const upcomingAppointments = updatedAllAppointments.filter(
          (el) =>
            new Date(el.RES_DATE).getTime() >=
            new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
        );
        console.log('[UPDATED CONTENT]', upcomingAppointments);
        setUpcoming(upcomingAppointments);
        setShow(true);
      }
    }
  }, [allAppointments, allDoctors]);
  return (
    <>
      <Animated.View
        style={[
          styles().upcomingContainer,
          {
            top,
          },
        ]}>
        <FlatList
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles().pagerStyle}
          renderItem={({item, index}) => (
            <View
              style={[
                styles().pagerStyle,
                // { paddingBottom: 20, paddingTop: 10, }
              ]}>
              <ShadowView
                style={StyleSheet.flatten([
                  // shadows.lightShadowBlack,
                  styles().upcomingShadowContainer,
                ])}>
                <View style={styles().upComignImage}>
                  <Image
                    source={
                      item.THUMBNAIL
                        ? {uri: item.THUMBNAIL}
                        : item.SEX === 'Female'
                        ? images.femaleDoc
                        : images.maleDoc
                    }
                    style={styles().upComignImage}
                  />
                </View>
                <View style={styles().upcomingText}>
                  <Text>{i18n.t('homeTabTranslations.upcoming')}</Text>
                  <Text style={styles().upcomingTextLight}>
                    {i18n.locale === 'ar' ? item.DOC_ANAME : item.DOC_ENAME}
                  </Text>
                  <Text style={styles().upcomingTextLight}>
                    {i18n.locale === 'ar' ? item.A_NAME : item.E_NAME}
                  </Text>
                  <Text style={styles().upcomingTextLight}>
                    {/* {getAMPMtime(item.RES_DATE.split('T')[0] + "T" + item.RES_TIME.split('T')[1])} */}
                    {getAMPMtime(item.RES_TIME, false)}
                    {item.VIRTUAL === '1'
                      ? ''
                      : i18n.t('homeTabTranslations.centralHospital')}
                  </Text>
                </View>
                <View style={styles().bellIcon}>
                  <MaterialCommunityIcons
                    name="bell"
                    size={20}
                    color={colors.whiteAbsolute}
                  />
                </View>
              </ShadowView>
            </View>
          )}
          data={upcoming}
        />
      </Animated.View>
      <EnterPhoneNumModal
        show={showMobileNumModal}
        onSaveCallback={getData}
        setShow={setShowMobileNumModal}
        phoneNum={phoneNum}
        setPhoneNum={setPhoneNum}
      />
    </>
  );
};

export default connect(null, {getAllDoctors, getMyAppointments})(
  UpcomingAppointments,
);
