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
import Toast from 'react-native-toast-message';

import styles from './styles';
import AuthHeader from '../../../components/headers/CustomHeader/AuthHeader';
import {
  colors,
  convertFromArabic,
  i18n,
  images,
  routesNames,
  shadows,
} from '../../../services';
import LanguageBtn from '../../../components/buttons/LanguageBtn';
import InputWithIcon from '../../../components/inputs/InputWithIcon';
import Button from '../../../components/buttons/PrimaryButton';
import {
  registerUserAction,
  getRegisteredNotConfirmedUser,
} from '../../../store/actions/auth/registerAction';
import {LoadingWrapper} from '../../../components';
import AsyncStorage from '@react-native-community/async-storage';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const userErrors = useSelector((state) => state.user.errors);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSumbit = (values) => {
    const data = {
      udhId: convertFromArabic(values.udhId),
      mrn: convertFromArabic(values.mrn),
      mobile: convertFromArabic(values.mobile),
    };
    dispatch(registerUserAction(data, navigation));
  };

  return (
    <LoadingWrapper loading={loading}>
      <View style={styles().container}>
        <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false}>
          <AuthHeader
            navigation={navigation}
            children={i18n.t('signUpTranslations.signUp')}
          />
          <LanguageBtn />

          <View style={styles().header}>
            <Image source={images.logo} style={styles().headerImg} />
          </View>

          <View style={styles().formGroup}>
            <Controller
              control={control}
              name="udhId"
              rules={{
                required: i18n.t('signUpTranslations.idErr'),
              }}
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithIcon
                  keyboardType="number-pad"
                  lable={i18n.t('signUpTranslations.id')}
                  value={value}
                  onChange={(value) => onChange(value)}
                  iconName="check"
                  placeholder={i18n.t('signUpTranslations.idPh')}
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
                required: i18n.t('signUpTranslations.mrnNumberErr'),
              }}
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithIcon
                  keyboardType="number-pad"
                  lable={i18n.t('signUpTranslations.mrnNumber')}
                  value={value}
                  onChange={(value) => onChange(value)}
                  iconName="check"
                  placeholder={i18n.t('signUpTranslations.mrnNumberPh')}
                />
              )}
            />
            {errors.mrn && (
              <Text style={styles().error}>{errors.mrn.message}</Text>
            )}
            <Controller
              control={control}
              name="mobile"
              rules={{
                required: i18n.t('signUpTranslations.mobileNumErr'),
              }}
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithIcon
                  keyboardType="number-pad"
                  lable={i18n.t('signUpTranslations.mobileNumber')}
                  value={value}
                  onChange={(value) => onChange(value)}
                  placeholder={i18n.t('signUpTranslations.mobileNumberPh')}
                  iconName="check"
                />
              )}
            />
            {errors.mobile && (
              <Text style={styles().error}>{errors.mobile.message}</Text>
            )}

            <View style={{marginTop: 20}}>
              <Button
                children={i18n.t('signUpTranslations.signUp')}
                onPress={handleSubmit(onSumbit)}
              />
            </View>
          </View>

          <View style={styles().footer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text style={styles().txt}>
                {i18n.t('signUpTranslations.haveAccount')}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(routesNames.login)}>
                <Text
                  style={{
                    ...styles().txt,
                    ...styles().btnLink,
                    marginLeft: 5,
                  }}>
                  {i18n.t('signUpTranslations.login')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingScrollView>
      </View>
    </LoadingWrapper>
  );
};

export default SignUp;
