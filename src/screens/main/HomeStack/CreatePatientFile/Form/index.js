import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {Controller, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
// import Toast from 'react-native-toast-message';
// import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker';
import Toast from 'react-native-simple-toast';

import styles from './styles';
import AuthHeader from '../../../../../components/headers/CustomHeader/AuthHeader';
import {
  colors,
  convertFromArabic,
  i18n,
  images,
  routesNames,
  shadows,
} from '../../../../../services';
import InputWithIcon from '../../../../../components/inputs/InputWithIcon';
import Button from '../../../../../components/buttons/PrimaryButton';
// import {
//   registerUserAction,
//   getRegisteredNotConfirmedUser,
// } from '../../../../../store/actions/auth/registerAction';
import {LoadingWrapper, PrimaryButton} from '../../../../../components';
import {Picker} from 'react-native';
import Axios from 'axios';
// const initialState = {
//   birthday: null,
//   gender: 1,
//   IDY: 1,
// };
const CreatePatientFile = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSumbit = async (values) => {
    setDisableButton(true);
    const data = {
      ID_CARD: convertFromArabic(values.udhId),
      // PAT_CODE: convertFromArabic(values.mrn),
      PAT_ENAME: values.nameEn,
      PAT_ANAME: values.nameAr,
      PAT_EFN: values.firstNameEn,
      PAT_ESN: values.secondNameEn,
      PAT_EGN: values.thirdNameEn,
      PAT_EFLN: values.lastNameEn,
      PAT_AFN: values.firstNameAr,
      PAT_ASN: values.secondNameAr,
      PAT_AGN: values.thirdNameAr,
      PAT_AFLN: values.lastNameAr,
      DATE_BIRTH: values.birthday,
      SEX: values.gender,
      MOBILE: convertFromArabic(values.mobile),
      IDY_CODE: values.IDY,
      USER_CODE: 'MOB',
    };
    try {
      const resAddPatient = await Axios.post(
        'https://udhrest.iconsjo.space/REST/patients',
        data,
      );
      console.log({resAddPatient});
      if (resAddPatient.data.success) {
        Toast.show(i18n.t('createPatient.patientAdded'), Toast.LONG, {
          backgroundColor: 'green',
          color: 'white',
        });
        setTimeout(() => {
          navigation.navigate(routesNames.home);
        }, 1500);
      } else {
        Toast.show(i18n.t('createPatient.patientFailed'), Toast.LONG, {
          backgroundColor: 'red',
          color: 'white',
        });
      }
      setDisableButton(false);
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <LoadingWrapper>
      <View style={styles().container}>
        <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false}>
          <AuthHeader
            navigation={navigation}
            children={i18n.t('createPatient.createPatient')}
          />
          <View style={styles().formGroup}>
            <Controller
              control={control}
              name="udhId"
              rules={{
                required: i18n.t('createPatient.idErr'),
              }}
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithIcon
                  keyboardType="number-pad"
                  lable={i18n.t('createPatient.id')}
                  value={value}
                  onChange={(value) => onChange(value)}
                  iconName="check"
                  placeholder={i18n.t('createPatient.idPh')}
                  handleSumbit={handleSubmit(onSumbit)}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.udhId && (
              <Text style={styles().error}>{errors.udhId.message}</Text>
            )}
            <Controller
              control={control}
              name="mrn"
              rules={{
                required: i18n.t('createPatient.mrnNumberErr'),
              }}
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithIcon
                  keyboardType="number-pad"
                  lable={i18n.t('createPatient.mrnNumber')}
                  value={value}
                  onChange={(value) => onChange(value)}
                  iconName="check"
                  placeholder={i18n.t('createPatient.mrnNumberPh')}
                  handleSumbit={handleSubmit(onSumbit)}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.mrn && (
              <Text style={styles().error}>{errors.mrn.message}</Text>
            )}
            <Controller
              control={control}
              name="nameEn"
              rules={{
                required: i18n.t('createPatient.nameEnErr'),
              }}
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithIcon
                  keyboardType="default"
                  lable={i18n.t('createPatient.nameEn')}
                  value={value}
                  onChange={(value) => onChange(value)}
                  iconName="check"
                  placeholder={i18n.t('createPatient.nameEnPh')}
                  handleSumbit={handleSubmit(onSumbit)}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.nameEn && (
              <Text style={styles().error}>{errors.nameEn.message}</Text>
            )}
            <Controller
              control={control}
              name="nameAr"
              rules={{
                required: i18n.t('createPatient.nameArErr'),
              }}
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithIcon
                  keyboardType="default"
                  lable={i18n.t('createPatient.nameAr')}
                  value={value}
                  onChange={(value) => onChange(value)}
                  iconName="check"
                  placeholder={i18n.t('createPatient.nameArPh')}
                  handleSumbit={handleSubmit(onSumbit)}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.nameAr && (
              <Text style={styles().error}>{errors.nameAr.message}</Text>
            )}
            <Controller
              control={control}
              name="firstNameEn"
              rules={{
                required: i18n.t('createPatient.firstNameEnErr'),
              }}
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithIcon
                  keyboardType="default"
                  lable={i18n.t('createPatient.firstNameEn')}
                  value={value}
                  onChange={(value) => onChange(value)}
                  iconName="check"
                  placeholder={i18n.t('createPatient.firstNameEnPh')}
                  handleSumbit={handleSubmit(onSumbit)}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.firstNameEn && (
              <Text style={styles().error}>{errors.firstNameEn.message}</Text>
            )}
            <Controller
              control={control}
              name="secondNameEn"
              rules={{
                required: i18n.t('createPatient.secondNameEnErr'),
              }}
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithIcon
                  keyboardType="default"
                  lable={i18n.t('createPatient.secondNameEn')}
                  value={value}
                  onChange={(value) => onChange(value)}
                  iconName="check"
                  placeholder={i18n.t('createPatient.secondNameEnPh')}
                  handleSumbit={handleSubmit(onSumbit)}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.secondNameEn && (
              <Text style={styles().error}>{errors.secondNameEn.message}</Text>
            )}
            <Controller
              control={control}
              name="thirdNameEn"
              rules={{
                required: i18n.t('createPatient.thirdNameEnErr'),
              }}
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithIcon
                  keyboardType="default"
                  lable={i18n.t('createPatient.thirdNameEn')}
                  value={value}
                  onChange={(value) => onChange(value)}
                  iconName="check"
                  placeholder={i18n.t('createPatient.thirdNameEnPh')}
                  handleSumbit={handleSubmit(onSumbit)}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.thirdNameEn && (
              <Text style={styles().error}>{errors.thirdNameEn.message}</Text>
            )}
            <Controller
              control={control}
              name="lastNameEn"
              rules={{
                required: i18n.t('createPatient.lastNameEnErr'),
              }}
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithIcon
                  keyboardType="default"
                  lable={i18n.t('createPatient.lastNameEn')}
                  value={value}
                  onChange={(value) => onChange(value)}
                  iconName="check"
                  placeholder={i18n.t('createPatient.lastNameEnPh')}
                  handleSumbit={handleSubmit(onSumbit)}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.lastNameEn && (
              <Text style={styles().error}>{errors.lastNameEn.message}</Text>
            )}
            <Controller
              control={control}
              name="firstNameAr"
              rules={{
                required: i18n.t('createPatient.firstNameArErr'),
              }}
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithIcon
                  keyboardType="default"
                  lable={i18n.t('createPatient.firstNameAr')}
                  value={value}
                  onChange={(value) => onChange(value)}
                  iconName="check"
                  placeholder={i18n.t('createPatient.firstNameArPh')}
                  handleSumbit={handleSubmit(onSumbit)}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.firstNameAr && (
              <Text style={styles().error}>{errors.firstNameAr.message}</Text>
            )}
            <Controller
              control={control}
              name="secondNameAr"
              rules={{
                required: i18n.t('createPatient.secondNameArErr'),
              }}
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithIcon
                  keyboardType="default"
                  lable={i18n.t('createPatient.secondNameAr')}
                  value={value}
                  onChange={(value) => onChange(value)}
                  iconName="check"
                  placeholder={i18n.t('createPatient.secondNameArPh')}
                  handleSumbit={handleSubmit(onSumbit)}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.secondNameAr && (
              <Text style={styles().error}>{errors.secondNameAr.message}</Text>
            )}
            <Controller
              control={control}
              name="thirdNameAr"
              rules={{
                required: i18n.t('createPatient.thirdNameArErr'),
              }}
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithIcon
                  keyboardType="default"
                  lable={i18n.t('createPatient.thirdNameAr')}
                  value={value}
                  onChange={(value) => onChange(value)}
                  iconName="check"
                  placeholder={i18n.t('createPatient.thirdNameArPh')}
                  handleSumbit={handleSubmit(onSumbit)}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.thirdNameAr && (
              <Text style={styles().error}>{errors.thirdNameAr.message}</Text>
            )}
            <Controller
              control={control}
              name="lastNameAr"
              rules={{
                required: i18n.t('createPatient.lastNameArErr'),
              }}
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithIcon
                  keyboardType="default"
                  lable={i18n.t('createPatient.lastNameAr')}
                  value={value}
                  onChange={(value) => onChange(value)}
                  iconName="check"
                  placeholder={i18n.t('createPatient.lastNameArPh')}
                  handleSumbit={handleSubmit(onSumbit)}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.lastNameAr && (
              <Text style={styles().error}>{errors.lastNameAr.message}</Text>
            )}
            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  marginVertical: 6,
                  fontFamily: 'Gill Sans',
                  fontSize: 13,
                  color: '#515151',
                }}>
                Birthday Date
              </Text>
              <Controller
                control={control}
                name="birthday"
                rules={{
                  required: i18n.t('createPatient.userBirthDayErr'),
                }}
                defaultValue=""
                render={({field: {onChange, onBlur, value}}) => (
                  <DatePicker
                    style={{width: '100%'}}
                    date={value}
                    mode="date"
                    placeholder={i18n.t('createPatient.userBirthDayPh')}
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        paddingHorizontal: 10,
                        alignItems: 'flex-start',
                        marginLeft: 36,
                        backgroundColor: 'white',
                        border: 1,
                        borderRadius: 10,
                        borderColor: '#e2e2e2',
                        height: 44,
                      },
                      // ... other styles
                    }}
                    onDateChange={(value) => {
                      setSelectedDate(value);
                      onChange(value);
                    }}
                  />
                )}
              />
              {errors.birthday && (
                <Text style={styles().error}>{errors.birthday.message}</Text>
              )}
            </View>
            <View>
              <Text
                style={{
                  marginVertical: 6,
                  fontFamily: 'Gill Sans',
                  fontSize: 13,
                  color: '#515151',
                }}>
                {i18n.t('createPatient.gender')}
              </Text>
              <View
                style={{
                  border: 3,
                  borderRadius: 10,
                  borderColor: 'red',
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                  height: 44,
                }}>
                <Controller
                  control={control}
                  name="gender"
                  rules={{
                    required: i18n.t('createPatient.genderErr'),
                  }}
                  defaultValue=""
                  render={({field: {onChange, onBlur, value}}) => (
                    <Picker
                      onBlur={onBlur}
                      value={value}
                      selectedValue={value}
                      onValueChange={(itemValue) => {
                        onChange(itemValue);
                      }}>
                      <Picker.Item
                        label={i18n.t('createPatient.genderPh')}
                        value=""
                      />
                      <Picker.Item label="Male" value="M" />
                      <Picker.Item label="Female" value="F" />
                    </Picker>
                  )}
                />
              </View>
            </View>
            {errors.gender && (
              <Text style={styles().error}>{errors.gender.message}</Text>
            )}
            <Controller
              control={control}
              name="mobile"
              rules={{
                required: i18n.t('createPatient.mobileNumErr'),
              }}
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithIcon
                  keyboardType="number-pad"
                  lable={i18n.t('createPatient.mobileNumber')}
                  value={value}
                  onChange={(value) => onChange(value)}
                  placeholder={i18n.t('createPatient.mobileNumberPh')}
                  iconName="check"
                  handleSumbit={handleSubmit(onSumbit)}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.mobile && (
              <Text style={styles().error}>{errors.mobile.message}</Text>
            )}
            <View>
              <Text
                style={{
                  marginVertical: 6,
                  fontFamily: 'Gill Sans',
                  fontSize: 13,
                  color: '#515151',
                }}>
                {i18n.t('createPatient.IDY')}
              </Text>
              <View
                style={{
                  border: 3,
                  borderRadius: 10,
                  borderColor: 'red',
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                  height: 44,
                }}>
                <Controller
                  control={control}
                  name="IDY"
                  rules={{
                    required: i18n.t('createPatient.IDYErr'),
                  }}
                  defaultValue=""
                  render={({field: {onChange, onBlur, value}}) => (
                    <Picker
                      style={{
                        backgroundColor: 'white',
                        border: 5,
                        borderRadius: 10,
                        borderColor: '#e2e2e2',
                        height: 44,
                      }}
                      onBlur={onBlur}
                      selectedValue={value}
                      onValueChange={(itemValue) => onChange(itemValue)}>
                      <Picker.Item
                        label={i18n.t('createPatient.IDYPh')}
                        value=""
                      />
                      <Picker.Item label="Saudi Identity" value="01" />
                      <Picker.Item label="Accommodation" value="02" />
                      <Picker.Item label="other" value="03" />
                    </Picker>
                  )}
                />
              </View>
            </View>
            {errors.IDY && (
              <Text style={styles().error}>{errors.IDY.message}</Text>
            )}
            <View style={{marginTop: 20}}>
              <PrimaryButton
                children={i18n.t('createPatient.save')}
                onPress={handleSubmit(onSumbit)}
                disabled={disableButton}
                indicator={
                  disableButton ? (
                    <ActivityIndicator
                      size="small"
                      color="white"
                      aria-disabled={disableButton}
                    />
                  ) : null
                }
              />
            </View>
          </View>
        </KeyboardAvoidingScrollView>
      </View>
    </LoadingWrapper>
  );
};

export default CreatePatientFile;
