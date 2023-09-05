import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';

import {
  colors,
  convertFromArabic,
  fontFamilies,
  i18n,
  images,
  routesNames,
} from '../../../services';
import styles from './styles';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import InputWithIcon from '../../../components/inputs/InputWithIcon';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import LanguageBtn from '../../../components/buttons/LanguageBtn';
import {loginUser} from '../../../store/actions/auth/registerAction';
import {InputWithLabel, LoadingWrapper} from '../../../components';
import AuthHeader from '../../../components/headers/CustomHeader/AuthHeader';

const LoginScreen = ({navigation}) => {
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const onSumbit = (values) => {
    const data = {
      udhId: convertFromArabic(values.udhId),
      password: convertFromArabic(values.password),
    };
    dispatch(loginUser(data, navigation, 'Alert'));
  };

  return (
    <LoadingWrapper loading={loading}>
      <View style={styles().container}>
        <AuthHeader navigation={navigation} />
        <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false}>
          <View style={styles().formGroup}>
            <View style={styles().header}>
              <LanguageBtn />
              <Text style={styles().heading}>
                {i18n.t('loginTranslations.login')}
              </Text>
              <Image source={images.logo} style={styles().logoImg} />
            </View>

            <Controller
              control={control}
              name="udhId"
              rules={{required: i18n.t('loginTranslations.idErrorMsg')}}
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithLabel
                  children={i18n.t('loginTranslations.id')}
                  onChange={(value) => onChange(value)}
                  placeholder={i18n.t('loginTranslations.idPlaceholder')}
                  value={value}
                  onBlur={onBlur}
                  keyboardType="number-pad"
                  handleSumbit={handleSubmit(onSumbit)}
                />
              )}
            />
            {errors.udhId && (
              <Text style={styles().error}>{errors.udhId.message}</Text>
            )}
            <Controller
              control={control}
              name="password"
              rules={{required: i18n.t('loginTranslations.passwordErrorMsg')}}
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithIcon
                  secureTextEntry={true}
                  lable={i18n.t('loginTranslations.password')}
                  iconName="eye"
                  onChange={(value) => onChange(value)}
                  placeholder={i18n.t('loginTranslations.passwordPlaceholder')}
                  value={value}
                  handleSumbit={handleSubmit(onSumbit)}
                />
              )}
            />
            {errors.password && (
              <Text style={styles().error}>{errors.password.message}</Text>
            )}

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles().greyTxt}>
                {i18n.t('loginTranslations.forgotPassword')}
              </Text>
            </TouchableOpacity>

            <View style={styles().formAction}>
              <PrimaryButton
                children={i18n.t('loginTranslations.login')}
                onPress={handleSubmit(onSumbit)}
              />
            </View>
            <View style={styles().footer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[{...styles().greyTxt}, {marginRight: 10}]}>
                  {i18n.t('loginTranslations.registerText')}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(routesNames.signUp);
                  }}>
                  <Text
                    style={{
                      ...styles().btnLink,
                      fontFamily: fontFamilies('normalText'),
                      textDecorationLine: 'underline',
                      marginBottom: 0,
                    }}>
                    {i18n.t('loginTranslations.signUp')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingScrollView>
      </View>
    </LoadingWrapper>
  );
};

export default LoginScreen;
