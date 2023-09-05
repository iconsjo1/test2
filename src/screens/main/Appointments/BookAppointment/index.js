import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {
  LoadingWrapper,
  Text,
  InputWithLabel,
  PrimaryButton,
  TouchableOpacity,
} from '../../../../components';
import {
  i18n,
  colors,
  shadows,
  getDateMonth,
  getDayName,
  routesNames,
  removeSeconds,
  setUserData,
} from '../../../../services';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ShadowView from 'react-native-simple-shadow-view';
import {connect} from 'react-redux';
import {makeAppointment} from '../../../../store/actions';
import moment from 'moment';
import ModalContent from './ModalContent';
import PromoModal from './PromoModal';
import PaymentScreen, {actions} from './PaymentScreen';
import ids from '../../../../../ids';
import AppointmentPreview from './AppointmentPreview';
import CallAlert from './CallAlert';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';

const BookAppointment = ({navigation, route, makeAppointment}) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(-1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [resType, setResType] = useState(0);
  const [user, setUser] = useState(null);

  const {CLIN_CODE, RES_DATE, TIME, USER_CODE, SPECIALITY, NAME} = route.params;
  useEffect(() => {
    AsyncStorage.getItem('user')
      .then((res) => setUser(res))
      .catch((err) => console.log(err));
  }, []);
  const appointmentHandler = () => {
    setLoading(true);
    if (success) setSuccess(false);
    if (failure) setFailure(false);
    const cbSuccess = () => {
      setLoading(false);
      setSuccess(true);
    };
    const cbFailure = () => {
      setLoading(false);
      setFailure(true);
    };

    makeAppointment(
      {
        CLIN_CODE: CLIN_CODE.trim(),
        RES_DATE: moment(RES_DATE).format('YYYY-MM-DD'),
        TIME,
        USER_CODE: 'Eservices',
        PAT_NAME: name,
        MOBILE: mobileNumber,
        resType,
      },
      cbSuccess,
      cbFailure,
    );
  };

  const handleCardPressAction = (action) => {
    switch (action) {
      case actions.select_cards:
        navigation.navigate(routesNames.cardSelection);
        break;
      case actions.google_pay:
        break;
      case actions.apple_pay:
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setUserData(setMobileNumber, setName);
  }, []);
  return (
    <>
      <LoadingWrapper loading={loading} header navigation={navigation}>
        <View style={styles().innerContainer}>
          {/* <Text style={styles().stepText}>
                        {i18n.t('bookAppointmentTranslations.step')}
                    </Text> */}
          <Text style={styles().selectText}>
            {i18n.t('bookAppointmentTranslations.header')}
          </Text>
        </View>
        <ScrollView
          testID={ids.bookAppointment.mainContainer}
          style={styles().scrollContainer}
          showsVerticalScrollIndicator={false}>
          <ShadowView style={[shadows.lightShadowGrey, styles().scrollInner]}>
            {showPayment ? (
              <PaymentScreen
                setShowPromoModal={setShowPromoModal}
                selectedMethod={selectedMethod}
                setSelectedMethod={setSelectedMethod}
                handleCardPressAction={handleCardPressAction}
                navigation={navigation}
              />
            ) : (
              <View style={{padding: 15}}>
                <View style={styles().topRow}>
                  <View style={styles().iconContainer}>
                    <AntDesign
                      name="barschart"
                      color={colors.skyBlue}
                      size={20}
                    />
                  </View>
                  <Text style={styles().completeInfo}>
                    {i18n.t('bookAppointmentTranslations.complete')}
                  </Text>
                </View>
                <InputWithLabel
                  disabled={user ? true : false}
                  testID={ids.bookAppointment.nameField}
                  transparent
                  onChange={setName}
                  value={name}>
                  {i18n.t('bookAppointmentTranslations.name')}
                </InputWithLabel>
                <InputWithLabel
                  disabled={user ? true : false}
                  maxLength={13}
                  testID={ids.bookAppointment.numberField}
                  keyboardType="numeric"
                  transparent
                  onChange={setMobileNumber}
                  value={mobileNumber}>
                  {i18n.t('bookAppointmentTranslations.number')}
                </InputWithLabel>
                <Text style={styles().schedulesOn}>
                  {i18n.t('bookAppointmentTranslations.scheduled')} (
                  {getDateMonth(RES_DATE)}, {getDayName(RES_DATE)})
                </Text>
                <View style={styles().selected}>
                  <Text>{TIME}</Text>
                  <Text style={styles().selectedText}>
                    {i18n.t('bookAppointmentTranslations.selected')}
                  </Text>
                </View>
                <View style={styles().typeSelector}>
                  <IconButton
                    onPress={() => setResType(1)}
                    selected={resType === 1}
                    icon="md-videocam-outline">
                    {i18n.t('bookAppointmentTranslations.udhLive')}
                  </IconButton>
                  <IconButton
                    onPress={() => setResType(0)}
                    selected={resType === 0}
                    icon="ios-calendar-sharp">
                    {i18n.t('bookAppointmentTranslations.clinicVisits')}
                  </IconButton>
                </View>
                <View style={{marginVertical: 30}}>
                  <PrimaryButton
                    testID={ids.bookAppointment.confirmButton}
                    onPress={() => {
                      if (name.trim().length < 3) {
                        Toast.show(
                          i18n.t('bookAppointmentTranslations.nameError'),
                          Toast.LONG,
                        );
                        return;
                      }
                      if (mobileNumber.length >= 10)
                        setShowConfirmationModal(true);
                      else {
                        Toast.show(
                          i18n.t('bookAppointmentTranslations.validNum'),
                          Toast.LONG,
                        );
                      }
                    }}>
                    {i18n.t('bookAppointmentTranslations.confirm')}
                  </PrimaryButton>
                </View>
              </View>
            )}
          </ShadowView>
          {showPayment ? (
            <View style={styles().buttonContainer}>
              <PrimaryButton
                icon={
                  <AntDesign
                    name="lock"
                    size={20}
                    color={colors.whiteAbsolute}
                  />
                }>
                {i18n.t('bookAppointmentTranslations.payNreq')}
              </PrimaryButton>
            </View>
          ) : null}
          <View style={{height: 50}} />
        </ScrollView>
      </LoadingWrapper>
      <ModalContent
        hide={() => {
          setSuccess(false);
          setFailure(false);
        }}
        success={success}
        showPayment={() => setShowPayment(true)}
        failure={failure}
        navigation={navigation}
        date={RES_DATE}
        resType={resType}
        time={TIME}
        name={NAME}
        specilaity={SPECIALITY}
      />
      <PromoModal hide={() => setShowPromoModal(false)} show={showPromoModal} />
      <AppointmentPreview
        name={name}
        number={mobileNumber}
        docName={NAME}
        date={RES_DATE}
        time={TIME}
        resType={resType}
        show={showConfirmationModal}
        setShow={setShowConfirmationModal}
        onConfirm={appointmentHandler}
      />
      {resType === 1 ? <CallAlert /> : null}
    </>
  );
};

export default connect(null, {makeAppointment})(BookAppointment);

const IconButton = ({icon, children, selected, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={StyleSheet.flatten([
      styles().typeSelector,
      {
        flex: 1,
        borderColor: colors.primary,
        backgroundColor: selected ? colors.primary : colors.white,
      },
    ])}>
    <Ionicons
      name={icon}
      size={20}
      color={!selected ? colors.primary : colors.whiteAbsolute}
    />
    <Text
      style={StyleSheet.flatten([
        styles().typeSelectorText,
        {
          color: !selected ? colors.primary : colors.whiteAbsolute,
        },
      ])}>
      {children}
    </Text>
  </TouchableOpacity>
);
