import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  I18nManager,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {useIsFocused} from '@react-navigation/core';
import {InputWithLabel, LoadingWrapper} from '../../../../components';
import AuthHeader from '../../../../components/headers/CustomHeader/AuthHeader';
import {
  images,
  routesNames,
  i18n,
  colors,
  convertFromArabic,
} from '../../../../services';
import InputWithIcon from '../../../../components/inputs/InputWithIcon';
import Button from '../../../../components/buttons/PrimaryButton';
import styles from './styles';
import {setPasswordAndRegisterUser} from '../../../../store/actions/auth/registerAction';
import {smallScreens} from '../../../../services/utilities/responsive';

const SetPassword = ({route, navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);

  const [isPressed, setIsPressed] = useState(false);
  const [isSecured, setIsSecured] = useState(true);
  const {user, data} = route.params;
  const isFocused = useIsFocused();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const onSumbit = (data) => {
    const userData = {
      ...user,
      password: convertFromArabic(data.password),
      passwordConfirm: convertFromArabic(data.passwordConfrimation),
    };
    dispatch(setPasswordAndRegisterUser(userData, navigation, route));
  };

  useEffect(() => {
    Keyboard.dismiss();
  }, []);
  return (
    <LoadingWrapper loading={loading}>
      <View style={styles().container}>
        <KeyboardAvoidingScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={20}>
          {/* Header */}
          <View style={styles().header}>
            <AuthHeader
              children={i18n.t('signupSetPassword.setPassword')}
              navigation={navigation}
            />
          </View>
          {/* Header Image */}
          <Image style={styles().headerImg} source={images.setPassword} />
          {/* Header Heading */}
          <Text style={styles().heading}>
            {`${i18n.t('signupSetPassword.welcome')} ${
              I18nManager.isRTL
                ? `${
                    data.surnameAr
                      ? data.surnameAr
                      : i18n.t('signupSetPassword.client')
                  }`
                : `${
                    data.surname
                      ? data.surname
                      : i18n.t('signupSetPassword.client')
                  }`
            }`}
            ,
          </Text>
          <Text style={styles().heading}>
            {i18n.t('signupSetPassword.welcomeTxt')}
          </Text>
          <View style={styles().form}>
            <Controller
              control={control}
              name="password"
              rules={{
                required: i18n.t('signupSetPassword.passwordErr'),
                min: 6,
              }}
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithIcon
                  iconName="eye"
                  secureTextEntry={true}
                  lable={i18n.t('signupSetPassword.password')}
                  onChange={(value) => onChange(value)}
                  placeholder={i18n.t('signupSetPassword.passwordPh')}
                  value={value}
                />
              )}
            />
            {errors.password && (
              <Text style={{color: 'red', margin: 5}}>
                {errors.password.message}
              </Text>
            )}
            <Controller
              control={control}
              name="passwordConfrimation"
              rules={{
                required: i18n.t('signupSetPassword.passwordConfirmationErr'),
              }}
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <View>
                  <InputWithLabel
                    secureTextEntry={isSecured}
                    children={i18n.t('signupSetPassword.PasswordConfirmation')}
                    onChange={(value) => onChange(value)}
                    placeholder={i18n.t(
                      'signupSetPassword.PasswordConfirmationPh',
                    )}
                    value={value}
                    handleSumbit={handleSubmit(onSumbit)}
                  />
                  <TouchableOpacity
                    style={styles().icon}
                    onPress={() => {
                      setIsPressed(!isPressed);
                      setIsSecured(!isSecured);
                    }}>
                    <View style={{padding: 10}}>
                      <Icon
                        name="eye"
                        size={smallScreens ? 20 : 24}
                        color={isPressed ? colors.primary : colors.darkGrey}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.passwordConfrimation && (
              <Text style={{color: 'red', margin: 5}}>
                {errors.passwordConfrimation.message}
              </Text>
            )}
            <View style={{marginTop: 20}}>
              <Button
                children={i18n.t('signupSetPassword.continue')}
                onPress={handleSubmit(onSumbit)}
              />
            </View>
          </View>
        </KeyboardAvoidingScrollView>
      </View>
    </LoadingWrapper>
  );
};

export default SetPassword;
