// THIS COMPONENT IS CONSUMED IN THE SECOND STEP OF THE
// SELECTION OF THE APPOINTMENT WHERE DOCTOR IS SELECTED BASED ON HIS
// SPECIALITY

import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {
  View,
  StyleSheet,
  Image,
  Platform,
  FlatList,
  ScrollView,
  Dimensions,
  Pressable,
  Button,
  ActivityIndicator,
} from 'react-native';
import {
  colors,
  fontFamilies,
  i18n,
  WP,
  routesNames,
  formatMilitaryTime,
  lineHeights,
  images,
  HP,
  apis,
} from '../../../services';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import {Text, TouchableOpacity} from '../..';
import Collapsible from 'react-native-collapsible';
import {RippleLoader} from 'react-native-indicator';
import {useSelector, connect} from 'react-redux';
import {getSchedules} from '../../../store/actions';
import ids from '../../../../ids';
import CollapsableView from './CollapsableView';
import moment from 'moment';
import {
  getDoctorScheduleByCode,
  getTRS,
} from '../../../store/actions/main/doctorScheduleActions';
import {useDispatch} from 'react-redux';

const imageSize = 70;
const checkMarkSize = 20;
const width = WP('92');

const DoctorListItem = ({
  CLINC_ANAME,
  CLINC_ENAME,
  DOC_CODE,
  scrollToIndex,
  index,
  rating = 5,
  collapsed,
  expand,
  date,
  last,
  first,
  API_DOC_THUMBNAIL,
  mainNav,
  getSchedules,
  collapse,
  navigation,
  IMAGE_URI,
  LEVEL_ENAME,
  LEVEL_ANAME,
  SPECIALITY_ANAME,
  SPECIALITY_ENAME,
  E_DESC,
  A_DESC,
  API_SHORT_DESC_AR,
  API_SHORT_DESC_EN,
  SEX,
  // availableAppointments,
}) => {
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [doctorDaysOffEX, setDoctorDaysOffEX] = useState(null);
  const [doctorSchedule, setDoctorSchedule] = useState(null);
  const [doctorScheduleToday, setDoctorScheduleToday] = useState(null);
  const [availableAppointments, setAvailableAppointments] = useState(null); // Replace with the actual number
  const [currentScreen, setCurrentScreen] = useState(1);
  const dispatch = useDispatch();
  const schedules = useSelector((state) => state.appointments.schedules);
  const docSched = useSelector((state) => state.doctorschedule);

  const getDayName = (dayNo) => {
    const days = [
      'Saturday',
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
    ];
    const arabicDaysOfWeek = [
      'السبت',
      'الأحد',
      'الاثنين',
      'الثلاثاء',
      'الأربعاء',
      'الخميس',
      'الجمعة',
    ];
    return i18n.locale === 'ar' ? arabicDaysOfWeek[dayNo % 7] : days[dayNo % 7];
  };

  const switchToScreen = (screenNumber) => {
    setCurrentScreen(screenNumber);
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    if (!collapsed) {
      if (!loading) setLoading(true);
      const cbSuccess = () => {
        setLoading(false);
        if (index !== 0) scrollToIndex(index);
      };
      const cbFailure = () => {
        setLoading(false);
        if (index !== 0) scrollToIndex(index);
      };
      getSchedules(
        {DOC_CODE, date: date.format('yyyy-MM-DD')},
        cbSuccess,
        cbFailure,
      );
    }
  }, [date, collapsed]);

  const getAvailableAppointments = async (DOC_CODE) => {
    setLoading1(true);
    const availableTimes = (
      await apis.getSchedulesListReserved(
        `${DOC_CODE}?reservationsDate=${date.format('yyyy-MM-DD')}`,
      )
    ).data.reservations;
    let allAppointments = [];
    if (availableTimes != null && availableTimes.length > 0) {
      availableTimes.map((item, index) => {
        allAppointments.push({
          time: item,
          status: 1,
        });
      });
    }
    setAvailableAppointments(allAppointments.length);
    setLoading1(false);
  };

  const formatTime = (time) => {
    const hours = time.getUTCHours();
    const minutes = time.getUTCMinutes();
    const period = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12

    const formattedTime = `${formattedHours}:${
      minutes < 10 ? '0' : ''
    }${minutes} ${period}`;
    return formattedTime;
  };

  const getDoctorSchedules = async (DOC_CODE) => {
    setScheduleLoading(true);
    if (docSched.daysOff != null) {
      const data = docSched.daysOff.filter(
        (item) =>
          item.DOC_CODE.replace(/\s/g, '') == DOC_CODE.replace(/\s/g, ''),
      );
      if (data.length > 0) {
        setDoctorDaysOffEX(
          data.map((item) => ({
            ...item,
            fromTime1Off: formatDate(new Date(item.START_DATE)),
            toTime1Off: formatDate(new Date(item.END_DATE)),
          })),
        );
      }
    }
    if (docSched.Schedules != null) {
      const data = docSched.Schedules.filter(
        (item) =>
          item.CLIN_CODE.replace(/\s/g, '') == DOC_CODE.replace(/\s/g, ''),
      );
      if (data.length > 0) {
        const groupedDays = {};
        data.forEach((item) => {
          const fromTime1 = new Date(item.FROM_TIME_1);
          const toTime1 = new Date(item.TO_TIME_1);
          const fromTime2 = new Date(item.FROM_TIME_2);
          const toTime2 = new Date(item.TO_TIME_2);
          const fromTime3 = new Date(item.FROM_TIME_3);
          const toTime3 = new Date(item.TO_TIME_3);
          if (item.FROM_TIME_1 != null && item.FROM_TIME_2 === null) {
            const workingHours = `${formatTime(fromTime1)} - ${formatTime(
              toTime1,
            )}`;
            if (!groupedDays[workingHours]) {
              groupedDays[workingHours] = [];
            }
            groupedDays[workingHours].push(item);
          } else if (
            item.FROM_TIME_1 != null &&
            item.FROM_TIME_2 != null &&
            item.FROM_TIME_3 === null
          ) {
            const workingHours = `${formatTime(fromTime1)}-${formatTime(
              toTime1,
            )} | ${formatTime(fromTime2)}-${formatTime(toTime2)}`;
            if (!groupedDays[workingHours]) {
              groupedDays[workingHours] = [];
            }
            groupedDays[workingHours].push(item);
          } else if (
            item.FROM_TIME_1 != null &&
            item.FROM_TIME_2 != null &&
            item.FROM_TIME_3 != null
          ) {
            const workingHours = `${formatTime(fromTime1)}-${formatTime(
              toTime1,
            )} | ${formatTime(fromTime2)}-${formatTime(toTime2)} | ${formatTime(
              fromTime3,
            )}-${formatTime(toTime3)}`;
            if (!groupedDays[workingHours]) {
              groupedDays[workingHours] = [];
            }
            groupedDays[workingHours].push(item);
          }
        });
        const date_string = date.format('yyyy-MM-DD');
        const date_obj = new Date(date_string);
        const day_index = date_obj.getDay();
        let todaysSchedule = data.filter(
          (item) => parseInt(item.DAY_NO) == day_index + 1,
        );
        let Today = {};
        todaysSchedule.forEach((item) => {
          const fromTime1 = new Date(item.FROM_TIME_1);
          const toTime1 = new Date(item.TO_TIME_1);
          const fromTime2 = new Date(item.FROM_TIME_2);
          const toTime2 = new Date(item.TO_TIME_2);
          if (item.FROM_TIME_1 != null && item.FROM_TIME_2 === null) {
            const workingHours = `${formatTime(fromTime1)} - ${formatTime(
              toTime1,
            )}`;
            if (!Today[workingHours]) {
              Today[workingHours] = [];
            }
            Today[workingHours].push(item);
          } else if (item.FROM_TIME_1 != null && item.FROM_TIME_2 != null) {
            const workingHours = `${formatTime(fromTime1)}-${formatTime(
              toTime1,
            )} | ${formatTime(fromTime2)}-${formatTime(toTime2)}`;
            if (!Today[workingHours]) {
              Today[workingHours] = [];
            }
            Today[workingHours].push(item);
          }
        });
        setDoctorScheduleToday(Today);
        setDoctorSchedule(groupedDays);
        setScheduleLoading(false);
      } else {
        setScheduleLoading(false);
      }
    }
  };

  useEffect(() => {
    getAvailableAppointments(DOC_CODE);
    getDoctorSchedules(DOC_CODE);
  }, [DOC_CODE, date]);

  // console.log('API_DOC_THUMBNAIL', API_DOC_THUMBNAIL);
  return (
    <>
      <Modal
        backdropColor={colors.modalBackDrop}
        avoidKeyboard
        animationIn="zoomIn"
        useNativeDriver
        animationInTiming={500}
        animationOutTiming={500}
        animationOut="zoomOut"
        isVisible={modal2Visible}>
        <View style={styles().modalContainer1}>
          <View style={styles().modalContent}>
            <View style={styles().tabBar}>
              <TouchableOpacity
                style={[
                  styles().tabItem,
                  currentScreen === 1 && styles().activeTab,
                ]}
                onPress={() => switchToScreen(1)}>
                <Text
                  style={[
                    styles().tabText,
                    currentScreen === 1 && styles().activeTabText,
                  ]}>
                  {i18n.t('selectDoctorsTranslations.doctorSchedule')}
                </Text>
              </TouchableOpacity>
            </View>
            {currentScreen === 1 && (
              <View style={styles().screenContent}>
                {doctorSchedule != null && !scheduleLoading && (
                  <View style={styles().scheduleContainer1}>
                    {Object.keys(doctorSchedule).map((workingHours, index) => (
                      <View key={index} style={styles().scheduleItemContainer1}>
                        <View>
                          <Text style={styles().dayText1}>
                            {doctorSchedule[workingHours]
                              .map((day) => getDayName(day.DAY_NO))
                              .join(', ')}
                          </Text>
                          <Text style={styles().hoursColumn1}>
                            {workingHours}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
                {doctorSchedule === null && !scheduleLoading && (
                  <>
                    <Text>{i18n.t('selectDoctorsTranslations.noScheduleFound')}</Text>
                  </>
                )}
                {scheduleLoading && (
                  <View style={styles().loader}>
                    <RippleLoader size={30} color={colors.grey} />
                  </View>
                )}
              </View>
            )}
            {currentScreen === 2 && (
              <View style={styles().screenContent}>
                <Text>Screen 2 Content</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles().closeButton}
              onPress={() => {
                setModal2Visible(false);
              }}>
              <Text style={styles().closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        backdropColor={colors.modalBackDrop}
        avoidKeyboard
        animationIn="zoomIn"
        useNativeDriver
        animationInTiming={500}
        animationOutTiming={500}
        animationOut="zoomOut"
        isVisible={modalVisible}>
        <View style={styles().modalContent}>
          <Text style={styles().mobileModalHeader}>
            {i18n.t('selectDoctorsTranslations.shortDesc')}
          </Text>
          {API_SHORT_DESC_AR || E_DESC || A_DESC || API_SHORT_DESC_EN ? (
            <View /*  style={{flex: 1}} */>
              <Text style={styles().shortDesc}>
                {i18n.locale === 'ar'
                  ? API_SHORT_DESC_AR
                    ? API_SHORT_DESC_AR
                    : A_DESC
                  : API_SHORT_DESC_EN
                  ? API_SHORT_DESC_EN
                  : E_DESC}
              </Text>
              {renderStars(rating)}
            </View>
          ) : null}
          <View style={{marginTop: 20, width: '80%'}}>
            <Button
              onPress={() => {
                setModalVisible(false);
              }}
              title="close"
            />
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        // disabled={mainNav}
        useRNGH={Platform.OS === 'android'}
        testID={DOC_CODE}
        onPress={collapsed ? expand : collapse}
        style={styles().container}>
        <View style={styles().imageStyle}>
          <Image
            style={styles().imageStyle}
            resizeMode="cover"
            source={
              API_DOC_THUMBNAIL || IMAGE_URI
                ? {uri: API_DOC_THUMBNAIL ? API_DOC_THUMBNAIL : IMAGE_URI}
                : SEX === 'Female'
                ? images.femaleDoc
                : images.maleDoc
            }
          />
          <Icon
            style={styles().checkMark}
            name="check-circle"
            size={checkMarkSize}
            color={colors.green}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'column', paddingLeft: 10}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={styles().name}>
                {i18n.locale === 'ar' ? CLINC_ANAME.trim() : CLINC_ENAME.trim()}
              </Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {LEVEL_ANAME || LEVEL_ENAME ? (
                  <Text style={styles().post}>
                    {i18n.locale === 'ar' ? LEVEL_ANAME : LEVEL_ENAME}
                  </Text>
                ) : null}
                {i18n.locale === 'ar' ? (
                  SPECIALITY_ANAME || SPECIALITY_ENAME ? (
                    <Text style={styles().speciality}>
                      {i18n.locale === 'ar'
                        ? SPECIALITY_ANAME
                        : SPECIALITY_ENAME}
                    </Text>
                  ) : null
                ) : null}
              </View>
              {i18n.locale === 'en' ? (
                SPECIALITY_ANAME || SPECIALITY_ENAME ? (
                  <Text style={styles().speciality}>
                    {i18n.locale === 'ar' ? SPECIALITY_ANAME : SPECIALITY_ENAME}
                  </Text>
                ) : null
              ) : null}
              {/* {renderStars(rating)} */}
              {/*Saja Icon Software Start Change block */}
              <View style={styles().cccontainer}>
                <Text style={styles().title}>
                  {i18n.t('selectDoctorsTranslations.doctorWorkingHours')}
                </Text>
                {scheduleLoading && (
                  <ActivityIndicator
                    style={{alignSelf: 'flex-start'}}
                    size="small"
                  />
                )}
                {!scheduleLoading && doctorScheduleToday && (
                  <>
                    {Object.keys(doctorScheduleToday).map(
                      (workingHours, index) => (
                        <View key={index}>
                          <View>
                            <View style={styles().daysColumn}>
                              {doctorScheduleToday[workingHours].map(
                                (day, dayIndex) => (
                                  <Text
                                    key={dayIndex}
                                    style={styles().day}>{`${getDayName(
                                    day.DAY_NO,
                                  )}, `}</Text>
                                ),
                              )}
                            </View>
                            {i18n.locale === 'ar' ? (
                              <Text
                                style={{
                                  flex: 1,
                                  textAlign: 'left',
                                }}>
                                {workingHours}
                              </Text>
                            ) : (
                              <Text style={styles().hoursColumn}>
                                {workingHours}
                              </Text>
                            )}
                          </View>
                        </View>
                      ),
                    )}
                  </>
                )}
                {doctorSchedule === null && !scheduleLoading && (
                  <>
                    <Text style={{fontSize: 10}}>{i18n.t('selectDoctorsTranslations.noScheduleFound')}</Text>
                  </>
                )}
                {doctorDaysOffEX != null && doctorDaysOffEX.length > 0 && (
                  <>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles().title}>
                        {i18n.t('selectDoctorsTranslations.daysOff')}
                      </Text>
                      <Text style={styles().days_offtitle}>
                        {i18n.t('selectDoctorsTranslations.withinMonth')}{' '}
                      </Text>
                    </View>
                    {doctorDaysOffEX.map((item, index) => (
                      <View key={index} style={styles().daysOffItem}>
                        <Text style={styles().daysOffText}>
                          {`${item.fromTime1Off} to ${item.toTime1Off}`}
                        </Text>
                      </View>
                    ))}
                  </>
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: 100,
          marginTop: 10,
        }}>
        <View />
        {availableAppointments != null && !loading1 && (
          <>
            <View style={styles().appointmentCount}>
              <Text style={styles().appointmentCountText}>
                {i18n.t('selectDoctorsTranslations.availableAppointments')}
              </Text>
              <Text style={styles().appointmentCountText2}>
                {availableAppointments}
              </Text>
            </View>
          </>
        )}
        {loading1 && (
          <View style={styles().availabilityLoader}>
            <RippleLoader size={15} color={colors.grey} />
            <Text>
              {i18n.t('selectDoctorsTranslations.checkingAvailability')}
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 5,
        }}>
        <View></View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={styles().moreDetails}>
              {i18n.t('selectDoctorsTranslations.details')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setModal2Visible(true);
            }}>
            <Text style={styles().doctorSchedule}>
              {i18n.t('selectDoctorsTranslations.doctorSchedule')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={collapsed ? expand : collapse}>
            <Text style={styles().bookAppointment}>
              {i18n.t('selectDoctorsTranslations.book')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* E_DESC,
            A_DESC, */}
      {/* {mainNav ? ( */}
      {/*   {API_SHORT_DESC_AR || E_DESC || A_DESC || API_SHORT_DESC_EN ? (
            <View style={{flex: 1}}>
              <Text style={styles().shortDesc}>
                {i18n.locale === 'ar' ? API_SHORT_DESC_AR ? API_SHORT_DESC_AR : A_DESC : API_SHORT_DESC_EN ? API_SHORT_DESC_EN : E_DESC}
              </Text>
              {renderStars(rating)}
            </View>
          ) : null} */}
      {/* ) : null} */}

      {/* <TouchableOpacity
                // disabled={mainNav}
                useRNGH={Platform.OS === 'android'}
                testID={DOC_CODE}
                onPress={collapsed ? expand : collapse}
                style={styles().container}>
                <View style={styles().imageStyle}>
                    <Image
                        style={styles().imageStyle}
                        resizeMode='cover'
                        source={IMAGE_URI ?
                            { uri: IMAGE_URI }
                            :
                            SEX === "Female" ?
                                images.femaleDoc
                                :
                                images.maleDoc} />
                    <Icon
                        style={styles().checkMark}
                        name="check-circle"
                        size={checkMarkSize}
                        color={colors.green} />
                </View>
                <View style={styles().textContainer}>
                    <View style={styles().textContainerInner}>
                        <Text style={styles().name} >
                            {i18n.locale === 'ar' ? CLINC_ANAME : CLINC_ENAME}
                        </Text>
                        {LEVEL_ANAME || LEVEL_ENAME ? <Text style={styles().post}>
                            {i18n.locale === 'ar' ? LEVEL_ANAME : LEVEL_ENAME}
                        </Text>
                            : null}
                        {SPECIALITY_ANAME || SPECIALITY_ENAME ? <Text style={styles().speciality}>
                            {i18n.locale === 'ar' ? SPECIALITY_ANAME : SPECIALITY_ENAME}
                        </Text>
                            : null}
                        {renderStars(rating)}
                    </View>
                    <Text style={styles().bookAppointment}>
                        {i18n.t('selectDoctorsTranslations.book')}
                    </Text>
                </View>
            </TouchableOpacity >
            {mainNav ?
                A_DESC || E_DESC
                    ?
                    <View style={styles().shortDescContainer}>
                        <Text style={styles().shortDesc}>
                            {i18n.locale === 'ar' ? A_DESC : E_DESC}
                        </Text>
                    </View>

                    : null : null} */}

      <CollapsableView
        collapse={collapsed}
        children={
          <View>
            {loading ? (
              <View style={styles().loader}>
                <RippleLoader size={30} color={colors.grey} />
              </View>
            ) : schedules ? (
              schedules.length !== 0 ? (
                <View
                  testID={ids.selectDoc.schedulesContainer}
                  style={styles().schedulesContainer}>
                  {schedules.map((el, i) => {
                    const stringTobeReplaced = el.time.slice(5, 8);
                    return (
                      <TouchableOpacity
                        disabled={!el.status}
                        testID={ids.selectDoc.timePrecessor + i}
                        onPress={() => {
                          const params = {
                            NAME:
                              i18n.locale === 'ar' ? CLINC_ANAME : CLINC_ENAME,
                            CLIN_CODE: DOC_CODE,
                            SPECIALITY:
                              i18n.locale === 'ar'
                                ? SPECIALITY_ANAME
                                : SPECIALITY_ENAME,
                            RES_DATE: date.toISOString(),
                            TIME: el.time,
                            USER_CODE: 'MOBILE',
                          };
                          navigation.navigate(
                            routesNames.bookYourAppointment,
                            params,
                          );
                        }}
                        key={i}
                        style={StyleSheet.flatten([
                          styles().timeContainer,
                          {opacity: el.status ? 1 : 0.5},
                        ])}>
                        <Text style={styles().appointmentTime}>
                          {el.time.replace(stringTobeReplaced, '')}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : (
                <NoAppointments />
              )
            ) : (
              <NoAppointments />
            )}
          </View>
        }
      />
      {/* Collapsible package cause weird behaviour so i replace it with CollapsableView Component */}
      {/* <Collapsible collapsed={collapsed} ref={collapsibleRef}>
          {loading ? (
              <View style={styles().loader}>
                <RippleLoader size={30} color={colors.grey} />
              </View>
            ) : schedules ? (
              schedules.length !== 0 ? (
                <View
                  testID={ids.selectDoc.schedulesContainer}
                  style={styles().schedulesContainer}>
                  {schedules.map((el, i) => {
                    return (
                      <TouchableOpacity
                        disabled={!el.status}
                        testID={ids.selectDoc.timePrecessor + i}
                        onPress={() => {
                          const params = {
                            NAME:
                              i18n.locale === 'ar' ? CLINC_ANAME : CLINC_ENAME,
                            CLIN_CODE: DOC_CODE,
                            SPECIALITY:
                              i18n.locale === 'ar'
                                ? SPECIALITY_ANAME
                                : SPECIALITY_ENAME,
                            RES_DATE: date.toISOString(),
                            TIME: el.time,
                            USER_CODE: 'MOBILE',
                          };
                          navigation.navigate(
                            routesNames.bookYourAppointment,
                            params,
                          );
                        }}
                        key={i}
                        style={StyleSheet.flatten([
                          styles().timeContainer,
                          {opacity: el.status ? 1 : 0.5},
                        ])}>
                        <Text style={styles().appointmentTime}>{el.time}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : (
                <NoAppointments />
              )
            ) : (
              <NoAppointments />
            )}
      </Collapsible> */}

      <View style={styles().bottomLine} />
      {last ? <View style={{height: 30}} /> : null}
    </>
  );
};

export default connect(null, {getSchedules})(DoctorListItem);

const starSize = 12;
const renderStars = (rating) => {
  const toReturn = [];
  for (let i = 0; i < 5; i++) {
    toReturn.push(
      <AntDesign
        key={i}
        name="star"
        style={{padding: 1}}
        size={starSize}
        color={i >= rating ? colors.grey : colors.orange}
      />,
    );
  }
  return <View style={styles().stars}>{toReturn.map((el) => el)}</View>;
};

const NoAppointments = () => (
  <View style={styles().noAppointments}>
    <Text style={styles().noAppointmentsText}>
      {i18n.t('selectDoctorsTranslations.noAppointment')}
    </Text>
  </View>
);
const styles = () =>
  StyleSheet.create({
    //saja icon software change start
    modalContainer1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    },
    tabBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    tabItem: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    activeTab: {
      backgroundColor: '#3498db',
    },
    tabText: {
      fontWeight: 'bold',
      color: 'black',
    },
    activeTabText: {
      color: 'white',
    },
    screenContent: {
      marginBottom: 20,
    },
    closeButton: {
      alignItems: 'center',
    },
    closeButtonText: {
      marginTop: 10,
      color: '#e74c3c',
      fontWeight: 'bold',
    },
    scheduleContainer1: {
      marginBottom: 10,
    },
    scheduleItemContainer1: {
      marginBottom: 10,
    },
    dayText1: {
      fontSize: 15,
      textAlign: i18n.locale === 'ar' ? 'left' : 'justify',
      fontWeight: 'bold',
      marginBottom: 5,
    },
    hoursColumn1: {
      right: i18n.locale === 'ar' ? 0 : null,
      fontSize: 15,
      textAlign: i18n.locale === 'ar' ? 'left' : 'justify',
    },
    container1: {
      flex: 1,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    workingHours: {
      width: 100,
      marginRight: 8,
      fontWeight: 'bold',
    },
    day: {
      marginRight: 8,
      marginBottom: 5,
    },
    cccontainer: {
      flex: 1,
      padding: 5,
      backgroundColor: '#f5f5f5',
      fontSize: 17,
      textAlign: i18n.locale === 'ar' ? 'left' : 'justify',
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    days_offtitle: {
      fontSize: 10,
      margin: 1,
    },
    scheduleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      textAlign: 'left',
      marginBottom: 20,
    },
    scheduleItem: {
      marginBottom: 10,
    },
    daysColumn: {
      flex: 1,
      flexDirection: 'row',
      marginRight: 10,
    },
    hoursColumn: {
      flex: 2,
    },
    hours: {
      marginBottom: 5,
      textAlign: 'left',
    },
    daysOffItem: {
      marginBottom: 8,
      textAlign: 'left',
    },
    daysOffText: {
      color: 'red',
      textAlign: 'left',
    },
    days: {
      flex: 1,
      flexDirection: 'row',
      marginRight: 10,
      textAlign: 'left',
    },
    appointmentCount: {
      flexDirection: 'row',
      bottom: 10,
      left: 5,
    },
    availabilityLoader: {
      flexDirection: 'row',
      bottom: 10,
      left: 5,
    },
    appointmentCountText: {
      fontSize: 13,
      fontWeight: 'bold',
      marginVertical: 2,
    },
    appointmentCountText2: {
      fontSize: 14,
      marginHorizontal: 2,
    },
    //saja icon software change end
    container: {
      width,
      // borderBottomColor: colors.lightGrey,
      // borderBottomWidth: 1,
      alignSelf: 'center',
      paddingVertical: 10,
      flexDirection: 'row',
      flex: 1,
    },
    mobileModalHeader: {
      color: colors.golden,
      fontSize: 17,
      width: '100%',
      textAlign: 'center',
    },
    mobileModalInput: {
      color: colors.darkGrey,
      width: '100%',
      textAlign: 'left',
    },
    modalContent: {
      width: WP('85'),
      alignSelf: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: colors.white,
      borderRadius: 10,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    imageStyle: {
      width: imageSize,
      backgroundColor: colors.grey,
      height: 130,
      borderRadius: 10,
    },
    checkMark: {
      position: 'absolute',
      bottom: -checkMarkSize / 10,
      right: -checkMarkSize / 10,
      width: checkMarkSize,
      height: checkMarkSize,
      borderRadius: checkMarkSize / 2,
      backgroundColor: '#FFF',
      overflow: 'hidden',
    },
    textContainer: {
      flex: 1,
      paddingLeft: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textContainerInner: {
      height: '100%',
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontFamily: fontFamilies('semiboldText'),
      color: colors.black,
      textAlign: 'left',
      lineHeight: lineHeights('small'),
    },
    post: {
      fontSize: 13,
      color: colors.darkGrey,
      textAlign: 'left',
      lineHeight: lineHeights('small'),
    },
    speciality: {
      fontSize: 13,
      color: colors.golden,
      textAlign: 'left',
      lineHeight: lineHeights('small'),
      paddingRight: i18n.locale === 'ar' ? 5 : 0,
      paddingLeft: i18n.locale === 'ar' ? 5 : 0,
    },
    bookAppointment: {
      minWidth: WP('100') < 400 ? 60 : 70,
      padding: 5,
      borderRadius: 5,
      marginHorizontal: 3,
      backgroundColor: colors.green,
      color: colors.whiteAbsolute,
      overflow: 'hidden',
      textAlign: 'center',
      justifyContent: 'flex-end',
    },
    moreDetails: {
      minWidth: WP('100') < 400 ? 60 : 70,
      // width: 100,
      padding: 5,
      borderRadius: 5,
      marginHorizontal: 3,
      backgroundColor: colors.green,
      color: colors.whiteAbsolute,
      overflow: 'hidden',
      textAlign: 'center',
      justifyContent: 'flex-end',
    },
    doctorSchedule: {
      minWidth: WP('100') < 400 ? 60 : 70,
      // width: 100,
      padding: 5,
      borderRadius: 5,
      marginHorizontal: 3,
      backgroundColor: colors.green,
      color: colors.whiteAbsolute,
      overflow: 'hidden',
      textAlign: 'center',
      justifyContent: 'flex-end',
    },
    stars: {
      flexDirection: 'row',
    },
    schedulesContainer: {
      width: WP('100'),
      paddingVertical: 10,
      alignSelf: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      borderBottomColor: colors.lightGrey,
      borderBottomWidth: 1,
    },
    loader: {
      paddingVertical: 50,
      alignItems: 'center',
    },
    noAppointments: {
      alignSelf: 'center',
      width: WP('80'),
      alignItems: 'center',
      minHeight: 150,
      justifyContent: 'center',
    },
    noAppointmentsText: {
      borderRadius: 5,
      padding: 10,
      backgroundColor: colors.extraLightGrey,
      textAlign: 'center',
      color: colors.darkGrey,
      width: '100%',
      overflow: 'hidden',
    },
    appointmentTime: {
      textAlign: 'center',
      width: 100,
      padding: 10,
      fontSize: 12,
      backgroundColor: colors.extraLightGrey + '77',
      color: colors.darkGrey,
      lineHeight: lineHeights('small'),
    },
    timeContainer: {
      overflow: 'hidden',
      margin: 5,
      borderRadius: 5,
      borderColor: colors.mediumLightGrey,
      borderWidth: 1,
    },
    shortDescContainer: {
      width,
      paddingBottom: 10,
      alignSelf: 'center',
    },
    shortDesc: {
      fontSize: 17,
      textAlign: i18n.locale === 'ar' ? 'left' : 'justify',
      color: colors.grey,
    },
    bottomLine: {
      width,
      borderBottomColor: colors.lightGrey,
      borderBottomWidth: 1,
      alignSelf: 'center',
    },
  });
