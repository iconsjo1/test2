import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {
  LoadingWrapper,
  Text,
  InputWithLabel,
  PrimaryButton,
  TouchableOpacity,
} from '../../../components';
import {
  i18n,
  colors,
  shadows,
  getDateMonth,
  getDayName,
  WP,
  images,
  apis,
  mobileNumber,
  convertFromArabic,
} from '../../../services';
import {ScrollView} from 'react-native-gesture-handler';
import Appointment from './Appointment';
import AsyncStorage from '@react-native-community/async-storage';
import Form from './Form';
import Modal from 'react-native-modal';
import styles from './Styles';
import {getMyAppointments} from '../../../store/actions';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

const MyAppointments = ({navigation, route, getMyAppointments}) => {
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [upcommingAppointments, setUpcommingAppointments] = useState([]);
  const [passedAppointments, setPassedAppointments] = useState([]);
  const [createInvoice, setCreateInvoice] = useState([]);

  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState('form');
  const [appointmentId, setAppointmentId] = useState(null);
  const [allAppointments, setAllAppointments] = useState([]);

  //aref edit
  useEffect(() => {
    if (!number || number.length < 9) {
      Toast.show(i18n.t('myAppointments.enterValid'), Toast.LONG);
      return;
    }
    setLoading(true);
    getAppointments();
  }, [number]);
  const askForcancellation = (RES_NO) => {
    setAppointmentId(RES_NO);
    setModalVisible(true);
  };

  const cancelAppointment = () => {
    apis
      .cancelAppointment({
        mobileNumber: convertFromArabic(number),
        transNo: appointmentId,
      })
      .finally(() => {
        getAppointments();
      });
    let filteredAppointments = allAppointments.filter(
      (ap) => ap.RES_NO != appointmentId,
    );
    filterAppointments(filteredAppointments);
    setModalVisible(false);
  };

  const getAppointments = () => {
    const cbSuccess = (data) => {
      filterAppointments(data.Result);
      setPage('data');
      setLoading(false);
    };
    const cbFailure = () => {
      setLoading(false);
      setPage('form');
      Toast.show(i18n.t('myAppointments.noApps'), Toast.LONG);
    };
    getMyAppointments(
      `?mobileNumber=${convertFromArabic(number)}`,
      cbSuccess,
      cbFailure,
    );
    AsyncStorage.setItem(mobileNumber, convertFromArabic(number));
  };

  const filterAppointments = (appointments) => {
    setAllAppointments(appointments);

    let todaysAppointments = appointments.filter((ele) => {
      let date1 = new Date(ele.RES_DATE).setHours(0, 0, 0, 0);
      let date2 = new Date().setHours(0, 0, 0, 0);
      return date1 === date2;
    });
    let upcommingAppointments = appointments.filter((ele) => {
      let date1 = new Date(ele.RES_DATE).setHours(0, 0, 0, 0);
      let date2 = new Date().setHours(0, 0, 0, 0);
      return date1 >= date2;
    });
    let passedAppointments = appointments.filter((ele) => {
      let date1 = new Date(ele.RES_DATE).setHours(0, 0, 0, 0);
      let date2 = new Date().setHours(0, 0, 0, 0);
      return date1 <= date2;
    });
    setTodaysAppointments(todaysAppointments);
    setUpcommingAppointments(upcommingAppointments);
    setPassedAppointments(passedAppointments);
  };

  return (
    <LoadingWrapper header navigation={navigation} loading={loading}>
      <View style={{backgroundColor: colors.whiteBg, flex: 1}}>
        <View style={{width: WP('95'), flex: 1, alignSelf: 'center'}}>
          <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false}>
            {page == 'form' ? (
              <Form
                setNumber={setNumber}
                number={number}
                onPress={() => {
                  if (!number || number.length < 9) {
                    // Toast.show(i18n.t('myAppointments.enterValid'), Toast.LONG);
                    // return;
                  }
                  setLoading(true);
                  getAppointments();
                }}
              />
            ) : (
              <>
                <View>
                  {todaysAppointments.length > 0 ? (
                    <View
                      style={{
                        paddingLeft: 10,
                        paddingTop: 30,
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          fontWeight: '500',
                          fontSize: 17,
                          textAlign: 'left',
                        }}>
                        {i18n.t('myAppointments.todaysAppointments')}
                      </Text>
                    </View>
                  ) : (
                    <View></View>
                  )}
                  <View style={{marginTop: 10}}>
                    {todaysAppointments.length > 0 ? (
                      <Text style={{color: colors.darkGrey, textAlign: 'left'}}>
                        {' '}
                        {new Date().toDateString()}
                      </Text>
                    ) : null}

                    {todaysAppointments.map((appointment, i) => (
                      <Appointment
                        key={i}
                        onCancel={() => askForcancellation(appointment.RES_NO)}
                        appointment={appointment}
                        navigation={navigation}
                        passed={1}
                      />
                    ))}
                  </View>
                </View>
                <View>
                  {upcommingAppointments.length > 0 ? (
                    <View
                      style={{
                        paddingLeft: 10,
                        paddingTop: 30,
                        alignItems: 'flex-start',
                      }}>
                      <Text style={{fontWeight: '500', fontSize: 17}}>
                        {i18n.t('myAppointments.upcommingAppointments')}
                      </Text>
                    </View>
                  ) : (
                    <View></View>
                  )}
                  <View style={{marginTop: 10}}>
                    {upcommingAppointments.map((appointment, i) => (
                      <View key={i} style={{marginTop: 7}}>
                        <Text
                          style={{color: colors.darkGrey, textAlign: 'left'}}>
                          {' '}
                          {new Date(appointment.RES_DATE).toDateString()}
                        </Text>
                        <Appointment
                          onCancel={() =>
                            askForcancellation(appointment.RES_NO)
                          }
                          appointment={appointment}
                          navigation={navigation}
                          passed={1}
                        />
                      </View>
                    ))}
                  </View>
                </View>
                <View>
                  {passedAppointments.length > 0 ? (
                    <View
                      style={{
                        paddingLeft: 10,
                        paddingTop: 30,
                        alignItems: 'flex-start',
                      }}>
                      <Text style={{fontWeight: '500', fontSize: 17}}>
                        {i18n.t('myAppointments.passedAppointments')}
                      </Text>
                    </View>
                  ) : (
                    <View></View>
                  )}

                  <View style={{marginTop: 10}}>
                    {passedAppointments.map((appointment, i) => (
                      <View key={i} style={{marginTop: 7}}>
                        <Text
                          style={{color: colors.darkGrey, textAlign: 'left'}}>
                          {' '}
                          {new Date(appointment.RES_DATE).toDateString()}
                        </Text>
                        <Appointment
                          // passed={true}
                          onCancel={() =>
                            askForcancellation(appointment.RES_NO)
                          }
                          appointment={appointment}
                          passed={2}
                        />
                      </View>
                    ))}
                  </View>
                </View>
                <View style={{height: 30}} />
              </>
            )}
          </KeyboardAvoidingScrollView>
          <Modal
            useNativeDriver
            backdropColor={colors.modalBackDrop}
            onSwipeComplete={() => setModalVisible(false)}
            swipeDirection={'down'}
            swipeThreshold={150}
            isVisible={modalVisible}
            style={styles().bottomModal}
            onBackdropPress={() => setModalVisible(false)}>
            <View style={styles().modalView}>
              <View
                style={{
                  minHeight: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles().modalText}>
                  {i18n.t('myAppointments.confirmationTitle')}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginVertical: 10}}>
                <TouchableOpacity
                  style={{
                    ...styles().openButton,
                    backgroundColor: colors.success,
                    minWidth: 150,
                  }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles().textStyle}>
                    {i18n.t('myAppointments.no')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    ...styles().openButton,
                    backgroundColor: colors.danger,
                    minWidth: 150,
                  }}
                  onPress={cancelAppointment}>
                  <Text style={styles().textStyle}>
                    {i18n.t('myAppointments.yes')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </LoadingWrapper>
  );
};
export default connect(null, {getMyAppointments})(MyAppointments);
