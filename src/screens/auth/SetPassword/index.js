import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles';
import AuthHeader from '../../../components/headers/CustomHeader/AuthHeader';
import InputWithIcon from '../../../components/inputs/InputWithIcon';
import InputWithLabel from '../../../components/inputs/InputWithLabel';
import {colors, routesNames, i18n, convertFromArabic} from '../../../services';
import Button from '../../../components/buttons/PrimaryButton';
import {LoadingWrapper} from '../../../components';
import {setPasswordAndRegisterUser} from '../../../store/actions/auth/registerAction';
import {smallScreens} from '../../../services/utilities/responsive';

const SetPassword = ({route, navigation}) => {
  const loading = useSelector((state) => state.user.loading);
  const [isPressed, setIsPressed] = useState(false);
  const [isSecured, setIsSecured] = useState(true);
  const {udhId} = route.params;
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const onSumbit = (data) => {
    const setPasswordData = {
      udhId: udhId.udhId,
      passcode: convertFromArabic(data.restCode),
      password: convertFromArabic(data.password),
      passwordConfirm: convertFromArabic(data.passwordConfirmation),
    };
    dispatch(setPasswordAndRegisterUser(setPasswordData, navigation, route));
  };
  return (
    <LoadingWrapper loading={loading}>
      <View style={styles().container}>
        {/* Header */}
        <AuthHeader
          children={i18n.t('setPasswordTranslations.setPassword')}
          navigation={navigation}
        />
        {/* End Header */}
        {/* Form Group */}
        <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false}>
          <View style={styles().fromGroup}>
            <Text style={styles().headerTxt}>
              {i18n.t('setPasswordTranslations.helpTxt')}
            </Text>
            <View>
              <Controller
                control={control}
                name="restCode"
                rules={{
                  required: i18n.t('setPasswordTranslations.resetCodeErr'),
                }}
                defaultValue=""
                render={({field: {onChange, onBlur, value}}) => (
                  <InputWithLabel
                    keyboardType="number-pad"
                    onChange={(value) => onChange(value)}
                    value={value}
                    children={i18n.t('setPasswordTranslations.resetCode')}
                    placeholder={i18n.t(
                      'setPasswordTranslations.resetPlaceholder',
                    )}
                  />
                )}
              />
              {errors.restCode && (
                <Text style={{color: 'red', marginBottom: 2}}>
                  {errors.restCode.message}
                </Text>
              )}
              <Controller
                control={control}
                name="password"
                rules={{
                  required: i18n.t('setPasswordTranslations.passwordErr'),
                }}
                defaultValue=""
                render={({field: {onChange, onBlur, value}}) => (
                  <InputWithIcon
                    onChange={(value) => onChange(value)}
                    value={value}
                    lable={i18n.t('setPasswordTranslations.password')}
                    iconName="eye"
                    secureTextEntry={true}
                    placeholder={i18n.t(
                      'setPasswordTranslations.passwordPlaceholder',
                    )}
                  />
                )}
              />
              {errors.password && (
                <Text style={{color: 'red', marginBottom: 2}}>
                  {errors.password.message}
                </Text>
              )}
              <Controller
                control={control}
                name="passwordConfirmation"
                rules={{
                  required: i18n.t(
                    'setPasswordTranslations.passwordConfrimationErr',
                  ),
                }}
                defaultValue=""
                render={({field: {onChange, onBlur, value}}) => (
                  <View style={{marginBottom: 30}}>
                    <InputWithLabel
                      secureTextEntry={isSecured}
                      placeholder={i18n.t(
                        'setPasswordTranslations.passwordConfrimationPh',
                      )}
                      children={i18n.t(
                        'setPasswordTranslations.passwordConfrimation',
                      )}
                      value={value}
                      onChange={(value) => onChange(value)}
                    />

                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 20,
                        bottom: 10,
                      }}
                      onPress={() => {
                        setIsPressed(!isPressed);
                        setIsSecured(!isSecured);
                      }}>
                      <View style={{padding: 10}}>
                        <Icon
                          style={styles().icon}
                          name="eye"
                          size={smallScreens ? 20 : 24}
                          color={isPressed ? colors.primary : colors.darkGrey}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.passwordConfirmation && (
                <Text style={{color: 'red', marginBottom: 2}}>
                  {errors.passwordConfirmation.message}
                </Text>
              )}
              <Button
                children={i18n.t('setPasswordTranslations.setPassword')}
                onPress={handleSubmit(onSumbit)}
              />
            </View>
          </View>
        </KeyboardAvoidingScrollView>
        {/*End of form group*/}
      </View>
    </LoadingWrapper>
  );
};

export default SetPassword;
