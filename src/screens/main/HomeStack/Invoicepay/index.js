import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {FlatList, ScrollView} from 'react-native';
import {
  DateSelector,
  LoadingWrapper,
  NetworkError,
  NoResults,
  SpecialitySelector,
  WhiteButton,
} from '../../../../components';
import {
  HP,
  WP,
  colors,
  fontFamilies,
  i18n,
  images,
  lineHeights,
  mobileNumber,
  apis,
} from '../../../../services';
import {StyleSheet} from 'react-native';
import Text from '../../../../../src/components/generic/Text/index';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Fontisto';
import {useForm, Controller} from 'react-hook-form';
import InputWithLabel from '../../../../components/inputs/InputWithLabel';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
import {getPatientMember} from '../../../../store/actions';
import {fetchDataInvoice} from '../../../../store/actions';

import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

//C:\icon projects\mind -clinic\UDH_React_Native_App_test\src\components\buttons\PrimaryButton.js
const imageSize = 70;
const checkMarkSize = 20;
const width = WP('92');

const initialState = {
  patientname: null,
  profileNumber: null,
  compCode: null,
  compIdCode: null,
  A_NAME: null,
  CLIN_CODE: null,
  doctorName: null,
  DOC_ENAME: null,
  E_NAME: null,
  RES_DATE: null,
  RES_NO: null,
  RES_TIME: null,
  transCount: null,
  VIRTUAL: null,
};
const InvoicePay = ({navigation}) => {
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const datePatientMember = useSelector(
    (state) => state.patients.patientsMember,
  );
  const dataInvoice = useSelector((state) => state.doctorPay.data);
  console.log('data from selector', dataInvoice);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(initialState);
  const [mrnPatient, setMrnPatient] = useState();

  // setMrnPatient
  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('user')
      .then((res) => {
        const parsedUser = JSON.parse(res);
        if (parsedUser) {
          setMrnPatient(parsedUser.mrn);
          dispatch(getPatientMember(parsedUser.mobile));
        }
      })
      .catch((err) => console.log(err));
  }, [isFocused]);

  useEffect(() => {
    if (datePatientMember && mrnPatient) {
      const data = datePatientMember.filter(
        (i) => i.PAT_CODE == Number(mrnPatient),
      )[0];
      //     {
      //       "A_NAME": "نساء و ولادة",
      //       "CLIN_CODE": "OB14",
      //       "DOC_ANAME": "د. هبة فؤاد",
      //       "DOC_ENAME": "DR. HEBA FOUAD",
      //       "E_NAME": "OBSTETRIC & GYNECOLOGY",
      //       "RES_DATE": "2023-08-31T00:00:00.000Z",
      //       "RES_NO": "7217549",
      //       "RES_TIME": "1899-01-01T00:12:00.000Z",
      //       "TRS_COUNT": null,
      //       "VIRTUAL": "0"
      //   }

      dispatch(
        fetchDataInvoice({
          A_NAME: 'نساء و ولادة',
          CLIN_CODE: 'OB14',
          DOC_ANAME: 'د. هبة فؤاد',
          DOC_ENAME: 'DR. HEBA FOUAD',
          E_NAME: 'OBSTETRIC & GYNECOLOGY',
          RES_DATE: '2023-08-31T00:00:00.000Z',
          RES_NO: '7217549',
          RES_TIME: '1899-01-01T00:12:00.000Z',
          TRS_COUNT: null,
          VIRTUAL: '0',
        }),
      );
      const date = new Date('2023-08-31T00:00:00.000Z');

      const TimeHours = new Date('1899-01-01T14:50:00.000Z').getHours();
      const TimeMinutes = new Date('1899-01-01T09:50:00.000Z').getMinutes();

      let formatDate =
        new Date(date).getMonth() + 1 < 10
          ? [
              new Date(date).getFullYear(),
              `0${new Date(date).getMonth() + 1}`,
              new Date(date).getDate() < 10
                ? `0${new Date(date).getDate()}`
                : `${new Date(date).getDate()}`,
            ].join('/')
          : [
              new Date(new Date(date)).getFullYear(),
              new Date(new Date(date)).getMonth() + 1,

              new Date(new Date(date)).getDate() < 10
                ? `0${new Date(new Date(date)).getDate()}`
                : `${new Date(new Date(date)).getDate()}`,
            ].join('/');
      //   console.log(`${TimeHours} : ${TimeMinutes}`);
      setState({
        ...state,
        patientname: data.PAT_ENAME,
        profileNumber: data.PAT_CODE,
        compCode: data.COMP_CODE ? data.COMP_CODE : 111,
        compIdCode: data.COMP_ID_CODE ? data.COMP_ID_CODE : 111,
        A_NAME: 'أمراض قلب',
        doctorCode: 'CG13',
        doctorName: 'DR. KHALID MAHMOUD SAMIR',
        E_NAME: 'CARDIOLOGIST',
        RES_DATE: formatDate,
        RES_NO: '7210985',
        RES_TIME: `${TimeHours} : ${TimeMinutes}`,
        transCount: null,
        VIRTUAL: '0',
      });

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [datePatientMember, mrnPatient]);
  // 411969
  // console.log({
  //   transCount: 21961447,
  //   profileNumber: '411969',
  //   patientFirstName: 'MAJED OSAMAH MOURAD JAMLEH',
  //   patientLastName: 'JAMLEH',
  //   patientGender: false,
  //   mobileNumber: '0590076416',
  //   doctorCode: 'CG13',
  //   doctorName: 'DR. KHALID MAHMOUD SAMIR',
  //   idNumber: '2003458128',
  //   invoiceAmount: 30,
  //   vatPercentage: 15,
  //   vatAmount: 4.5,
  //   netAmount: 34.5,
  //   invoiceNo: 1133912,
  //   invoiceStatus: 1,
  //   invoiceStatusUpdatedAt: '2023-08-27T12:14:32.000Z',
  //   invoiceType: false,
  //   paymentGateWay: 1,
  //   qrCode:
  //     'https://storage.googleapis.com/giftstore-c2cb2.appspot.com/paymentInvoiceQrCode/5c666b1a-e7f1-44c4-b0ea-f59f81f934a7.png',
  //   createdAt: '2023-08-26T10:03:56.000Z',
  //   invoiceDetails: [
  //     {
  //       id: 'cd1fa474-4de2-4001-a510-b39382bc7a42',
  //       serviceDescription: 'OUTPATIENT SERVICES',
  //       itemId: 1001,
  //       itemName: 'CONSULTATION - 2',
  //       quantity: 1,
  //       itemAmount: 150,
  //       vatPercentage: 15,
  //       vatAmount: 4.5,
  //       discount: 120,
  //       amountAfterDiscount: 30,
  //       itemNetAmount: 34.5,
  //       claimNumber: '21961447',
  //     },
  //   ],
  // });

  return (
    <LoadingWrapper
      loading={loading}
      navigation={navigation}
      header={true}
      headerText={'Invoice'}>
      <ScrollView>
        <>
          {!loading ? (
            // {state.patientname && }

            <View style={styles.container}>
              {/* //////////////////////////////////////////////////////////////////////////*/}
              <View style={styles.requiredAmountContainer}>
                <Text style={styles.requiredAmountTitel}>
                  {i18n.t('createInvoice.requiredAmount')}
                </Text>
                <Text style={styles.requiredAmountTitel}>500 SAR</Text>
              </View>

              <View>
                <Text style={styles.cardDetailsTitel}>
                  {i18n.t('createInvoice.enterCardDetails')}
                </Text>
              </View>

              <View style={styles.CardNumber}>
                <InputWithLabel
                  // inputStyle={styles.SummaryinputStyle1}
                  // secureTextEntry={isSecured}
                  // children={i18n.t('createInvoice.PatVAT')}
                  // onChange={(value) => onChange(value)}
                  placeholder={i18n.t('createInvoice.cardNumber')}
                  // value={value}
                  // handleSumbit={handleSubmit(onSumbit)}
                />
              </View>

              <View style={styles.container3}>
                <View style={styles.column}>
                  {/* <Text>Item 1</Text>
                  <Text>Item 2</Text>
                  <Text>Item 3</Text> */}
                  <View>
                    <InputWithLabel
                      inputStyle={styles.CardDetails1}
                      // secureTextEntry={isSecured}
                      // children={i18n.t('createInvoice.company')}
                      // onChange={(value) => onChange(value)}
                      placeholder={i18n.t('createInvoice.expiryDate')}
                      // value={value}
                      // handleSumbit={handleSubmit(onSumbit)}
                    />
                  </View>
                  <View>
                    <InputWithLabel
                      inputStyle={styles.CardDetails1}
                      // secureTextEntry={isSecured}
                      // children={i18n.t('createInvoice.company')}
                      // onChange={(value) => onChange(value)}
                      placeholder={i18n.t('createInvoice.securityCode')}
                      // value={value}
                      // handleSumbit={handleSubmit(onSumbit)}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.InvoiceNoContainer}>
                <Text style={styles.InvoiceNo}>
                  {i18n.t('createInvoice.InvoiceNo')}
                </Text>
                <Text style={styles.InvoiceNo}>UD20230005</Text>
              </View>

              <View style={styles.InvoiceNoForm}>
                <InputWithLabel
                  inputStyle={styles.InvoiceNoinputStyle1}
                  // secureTextEntry={isSecured}
                  children={i18n.t('createInvoice.total')}
                  // onChange={(value) => onChange(value)}
                  // placeholder={i18n.t(
                  //   'signupSetPassword.PasswordConfirmationPh',
                  // )}
                  // value={value}
                  // handleSumbit={handleSubmit(onSumbit)}
                />

                <InputWithLabel
                  inputStyle={styles.InvoiceNoinputStyle2}
                  // secureTextEntry={isSecured}
                  children={i18n.t('createInvoice.discount')}
                  // onChange={(value) => onChange(value)}
                  // placeholder={i18n.t(
                  //   'signupSetPassword.PasswordConfirmationPh',
                  // )}
                  // value={value}
                  // handleSumbit={handleSubmit(onSumbit)}
                />
              </View>

              <View style={styles.InvoiceNoForm}>
                <InputWithLabel
                  inputStyle={styles.InvoiceNoinputStyle1}
                  // secureTextEntry={isSecured}
                  children={i18n.t('createInvoice.patientPay')}
                  // onChange={(value) => onChange(value)}
                  // placeholder={i18n.t(
                  //   'signupSetPassword.PasswordConfirmationPh',
                  // )}
                  // value={value}
                  // handleSumbit={handleSubmit(onSumbit)}
                />

                <InputWithLabel
                  inputStyle={styles.InvoiceNoinputStyle2}
                  // secureTextEntry={isSecured}
                  children={i18n.t('createInvoice.totalAfterDiscount')}
                  // onChange={(value) => onChange(value)}
                  // placeholder={i18n.t(
                  //   'signupSetPassword.PasswordConfirmationPh',
                  // )}
                  // value={value}
                  // handleSumbit={handleSubmit(onSumbit)}
                />
              </View>
              <View style={styles.Summary}>
                <PrimaryButton
                  buttonStyle={styles.ButtonsStyle1}
                  // onPress={showModal}
                >
                  {i18n.t('createInvoice.cancel')}
                  {/* {submitIcon()} */}
                </PrimaryButton>
                <PrimaryButton
                  buttonStyle={styles.ButtonsStyle2}
                  // onPress={showModal}

                  //   onPress={() => {
                  //     navigation.navigate('InvoicesFormPay');
                  //   }}
                >
                  {i18n.t('createInvoice.pay')}
                  {/* {submitIcon()} */}
                </PrimaryButton>
              </View>
            </View>
          ) : (
            <NetworkError />
          )}
        </>
      </ScrollView>
    </LoadingWrapper>
  );
};

export default InvoicePay;
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  company: {
    flexDirection: 'row',
    width: '40%',
  },
  inputStyle1: {
    width: '90%',
  },
  inputStyle2: {
    width: '150%',
  },
  fileNumber: {
    width: '50%',
  },
  reservationContainer: {
    flexDirection: 'row',
  },
  reservationDate: {
    margin: 10,
    marginRight: 45,
    marginLeft: 0,
    fontWeight: 'bold',
  },
  serviceContainer: {
    flexDirection: 'row',
  },

  service1: {
    width: 20,
  },
  Qty: {
    width: 50,
  },

  Summary: {
    flexDirection: 'row',
    width: '40%',
  },
  SummaryinputStyle1: {
    width: '90%',
  },
  SummaryinputStyle2: {
    width: '90%',
  },
  ButtonsStyle1: {
    marginRight: 10,
    marginTop: 20,
  },
  ButtonsStyle2: {
    marginTop: 20,
    fontSize: 100,
  },
  ////////////////////////////
  requiredAmountContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  requiredAmountTitel: {
    fontWeight: 'bold',
    fontSize: 15,
  },

  cardDetailsTitel: {
    fontWeight: 'bold',
    fontSize: 15,
    // justifyContent: 'star',
  },
  CardNumber: {
    width: '100%',
  },
  CardDetails: {
    flexDirection: 'row',
  },

  CardDetails1: {
    width: 180,
    margin: 5,
  },

  container3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'row', // This sets the layout to column
    alignItems: 'center', // Align items along the horizontal axis
  },
  InvoiceNoContainer: {
    flexDirection: 'row',
  },

  InvoiceNo: {
    margin: 10,
    marginRight: 45,
    marginLeft: 0,
    fontWeight: 'bold',
  },

  InvoiceNoForm: {
    flexDirection: 'row',
    width: '40%',
  },
  InvoiceNoinputStyle1: {
    width: '90%',
  },
  InvoiceNoinputStyle2: {
    width: '90%',
  },
});
