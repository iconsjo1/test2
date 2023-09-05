import React, { useRef } from 'react';
import Modal from 'react-native-modal';
import { View, ScrollView, SafeAreaView, I18nManager, Platform } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

import styles from './styles';
import { Text, PrimaryButton, TouchableOpacity } from '../../../../components';
import { getDateMonthYear, colors, i18n } from '../../../../services';
import {
  getFullDayName,
  removeSeconds,
} from '../../../../services/utilities/helpers';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
const iconsize = 40;

const AppointmentPreview = ({
  show,
  setShow,
  name,
  number,
  date,
  time,
  resType,
  docName,
  onConfirm,
}) => {
  const onModalHide = useRef();
  const adjustDate = () => {
    let d = new Date(date);

    let [hours, minutes, seconds] = time.split(':');
    const amPm = seconds.includes('pm') ? 'pm' : 'am';

    hours = amPm === 'am' ? 0 + +hours : 12 + +hours;
    d.setHours(hours);
    d.setMinutes(minutes);
    d.setSeconds(0);
    return d;
  };
  const selectedDateTime = adjustDate();
  //   console.log(.toLocaleString());
  return (
    <Modal
      backdropColor="transparent"
      isVisible={show}
      useNativeDriver
      onBackButtonPress={() => setShow(false)}
      style={styles().previewModal}
      onModalHide={
        onModalHide.current
          ? () => {
            onModalHide.current();
            onModalHide.current = undefined;
          }
          : undefined
      }>
      <View
        style={{
          height: '100%',
          overflow: 'visible',
          backgroundColor: colors.white,
        }}>
        <SafeAreaView style={styles().previewHeader}>
          <View style={{ width: iconsize }} />
          <Text style={styles().reviewText}>
            {i18n.t('bookAppointmentTranslations.review')}
          </Text>
          <TouchableOpacity
            onPress={() => setShow(false)}
            style={{
              borderRadius: iconsize,
              backgroundColor: colors.extraLightGrey,
              width: iconsize,
              height: iconsize,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10,
            }}>
            <Icon
              size={iconsize}
              name="close-outline"
              color={colors.darkGrey}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <ScrollView>
          <View style={{ height: 50 }} />
          <View style={styles().previewContainer}>
            <DetailItem
              icon="bandage-outline"
              label={i18n.t('bookAppointmentTranslations.doc')}>
              {docName}
            </DetailItem>
            <DetailItem
              icon="person-outline"
              label={i18n.t('bookAppointmentTranslations.name')}>
              {name}
            </DetailItem>
            <DetailItem
              icon="call-outline"
              label={i18n.t('bookAppointmentTranslations.num')}>
              {number}
            </DetailItem>
            <DetailItem
              icon="calendar-outline"
              label={i18n.t('bookAppointmentTranslations.appDate')}>
              {getDateMonthYear(date)}
            </DetailItem>
            <DetailItem
              icon="at"
              label={i18n.t('bookAppointmentTranslations.appDay')}>
              {getFullDayName(date)}
            </DetailItem>
            <DetailItem
              icon="alarm-outline"
              label={i18n.t('bookAppointmentTranslations.appTime')}>
              {time}
            </DetailItem>
            <DetailItem
              icon={resType === 1 ? 'business-outline' : 'md-videocam-outline'}
              label={i18n.t('bookAppointmentTranslations.resType')}>
              {resType === 0
                ? i18n.t('bookAppointmentTranslations.reg')
                : i18n.t('bookAppointmentTranslations.udhlive')}
            </DetailItem>
            <View style={{ height: 30 }} />
            <View style={styles().buttonContainer}>
              <PrimaryButton
                onPress={() => {
                  onModalHide.current = onConfirm;
                  setShow(false);
                  if (Platform.OS == 'ios') {
                    PushNotificationIOS.addNotificationRequest({
                      id: '1',
                      title: I18nManager.isRTL
                        ? 'لديك موعد'
                        : 'Appointment Alert',
                      subtitle: `Your Have an appointment`,
                      body: `Your appointment with ${docName} is soon`,
                      fireDate: new Date(selectedDateTime - 60 * 1000 * 6),
                    });
                  }
                  //   PushNotification.localNotificationSchedule({
                  //     channelId: 'appointments-channel',
                  //     date: new Date(Date.now() + 30 * 1000),
                  //     title: 'My Notification Title', // (optional)
                  //     message: 'My Notification Message', // (required)
                  //   });
                }}>
                {i18n.t('bookAppointmentTranslations.confirm')}
              </PrimaryButton>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default AppointmentPreview;

const DetailItem = ({ label, children, icon }) => (
  <View style={styles().detailItemContainer}>
    <Icon name={icon} size={25} color={colors.darkGrey} />
    <View style={{ flex: 1, paddingLeft: 15 }}>
      <Text style={styles().detailItemLabel}>{label}</Text>
      <Text style={styles().detailItem}>{children}</Text>
    </View>
  </View>
);
