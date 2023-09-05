import React, {useState} from 'react';
import {Text, View, Image, ActivityIndicator} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {Controller, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';

import {
  images,
  i18n,
  routesNames,
  colors,
  convertFromArabic,
} from '../../../services';
import InputWithIcon from '../../../components/inputs/InputWithIcon';
import Button from '../../../components/buttons/PrimaryButton';
import AuthHeader from '../../../components/headers/CustomHeader/AuthHeader';
import {LoadingWrapper} from '../../../components';
import {forgotPasswordAction} from '../../../store/actions/auth/registerAction';
const ForgotPassword = ({navigation}) => {
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
    };
    dispatch(forgotPasswordAction(data, navigation));
  };

  return (
    <LoadingWrapper loading={loading}>
      <View style={styles().container}>
        {/* Header */}

        <AuthHeader
          navigation={navigation}
          children={i18n.t('forgotPasswordTranslations.forgotPassword')}
        />

        {/* Header End */}
        <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false}>
          {/* Header Image, and text */}
          <View style={styles().headerImgContainer}>
            <Image source={images.forgotPassword} style={styles().headerImg} />
          </View>
          <Text style={styles().imgTxt}>
            {i18n.t('forgotPasswordTranslations.helpTxt')}
          </Text>
          {/* Header Image End*/}
          {/* Form */}
          <View>
            <View style={{marginBottom: 10}}>
              <Controller
                control={control}
                name="udhId"
                rules={{
                  required: i18n.t('forgotPasswordTranslations.udhIdErr'),
                }}
                defaultValue=""
                render={({field: {onChange, onBlur, value}}) => (
                  <InputWithIcon
                    keyboardType="phone-pad"
                    iconName="check"
                    placeholder={i18n.t('forgotPasswordTranslations.udhId')}
                    onChange={(value) => onChange(value)}
                    value={value}
                    handleSumbit={handleSubmit(onSumbit)}
                  />
                )}
              />
              {errors.udhId && (
                <Text style={styles().error}>{errors.udhId.message}</Text>
              )}
            </View>
            <Button
              children={i18n.t('forgotPasswordTranslations.sendCode')}
              onPress={handleSubmit(onSumbit)}
            />
          </View>
          {/* Form  End*/}
        </KeyboardAvoidingScrollView>
      </View>
    </LoadingWrapper>
  );
};

export default ForgotPassword;
