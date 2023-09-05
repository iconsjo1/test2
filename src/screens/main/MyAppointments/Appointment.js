import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, I18nManager, Alert, Modal} from 'react-native';
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
  getAMPMtime,
  routesNames,
} from '../../../services';
import moment from 'moment';
import styles from './Styles';

const Appointment = ({appointment, onCancel, passed, navigation}) => {
  const [modalVisible, setModalVisible] = useState(true);

  const askForCancellation = (id) => {
    Alert.alert(
      i18n.t('reportsTabTranslations.dataNotFound'),
      i18n.t('reportsTabTranslations.NoReaports'),
      [
        {
          text: i18n.t('reportsTabTranslations.ok'),
          onPress: () => navigation.goBack(),
        },
        {
          text: i18n.t('reportsTabTranslations.ok'),
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  const cancelAppointment = () => {
    setModalVisible(false);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 6,
        marginTop: 10,
        borderRadius: 5,
        justifyContent: 'space-between',
        backgroundColor: colors.extraLightGrey,
        paddingHorizontal: 7,
        paddingVertical: 10,
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', flex: 4}}>
        <View
          style={{
            paddingRight: 7,
            paddingVertical: 7,
            borderRightWidth: 2,
            minHeight: 40,
            justifyContent: 'center',
            borderRightColor: colors.grey,
          }}>
          <Text>{getAMPMtime(appointment.RES_TIME, false)}</Text>
        </View>
        <View
          style={{
            paddingHorizontal: 7,
            minHeight: 40,
            flex: 1,
            alignItems: 'flex-start',
          }}>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text
              style={[
                styles().textBreak,
                {fontWeight: '500', fontSize: 12, textAlign: 'left'},
              ]}>
              {i18n.locale === 'ar' ? appointment.A_NAME : appointment.E_NAME}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text
              style={[
                styles().textBreak,
                {fontWeight: '500', fontSize: 12, textAlign: 'left'},
              ]}>
              {I18nManager.isRTL
                ? appointment.DOC_ANAME
                : appointment.DOC_ENAME}
            </Text>
          </View>
        </View>
      </View>
      <View style={{flex: 2}}>
        <View style={{flex: 1}}>
          {passed == 1 ? (
            <View>
              <TouchableOpacity
                style={[
                  styles().btnWraper,
                  {flex: 1, backgroundColor: colors.success},
                ]}>
                {appointment.VIRTUAL === '1' ? (
                  <Text style={[styles().btnText]}>
                    {i18n.t('myAppointments.UDHLive')}
                  </Text>
                ) : (
                  <Text style={[styles().btnText]}>
                    {i18n.t('myAppointments.regular')}
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onCancel()}
                style={[
                  styles().btnWraper,
                  {flex: 1, backgroundColor: colors.danger, marginTop: 4},
                ]}>
                <Text style={[styles().btnText]}>
                  {i18n.t('myAppointments.cancel')}
                </Text>
              </TouchableOpacity>
              {/*COMMENT BY AREF */}
              {/* <TouchableOpacity
                onPress={
                  () => {
                    console.log('appointment>>>>>>>', appointment),
                      navigation.navigate('InvoicesForm');
                  }
                  //navigation.navigate('InvoicesForm')
                }
                link={routesNames.InvoicesForm}
                style={[
                  styles().btnWraper,
                  {flex: 1, backgroundColor: colors.primary, marginTop: 4},
                ]}>
                <Text style={[styles().btnText]}>
                  {i18n.t('myAppointments.createInvoice')}
                </Text>
              </TouchableOpacity> */}
              {/*COMMENT BY AREF */}
            </View>
          ) : (
            <View
              style={[
                styles().btnWraper,
                {flex: 1, backgroundColor: colors.primary + '99'},
              ]}>
              <Text style={[styles().btnText]}>
                {i18n.t('myAppointments.completed')}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Appointment;
