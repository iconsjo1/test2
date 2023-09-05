import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  I18nManager,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import IconIon from 'react-native-vector-icons/Ionicons';
import {useForm, Controller} from 'react-hook-form';

import {colors, fontFamilies, i18n, WP} from '../../../../services';
import AuthHeader from '../../../../components/headers/CustomHeader/AuthHeader';
import styles from './styles';
import {converENDigitsToAr} from '../../../../services/utilities/helpers';
import {
  AppButton,
  InputWithLabel,
  LoadingWrapper,
} from '../../../../components';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkTokenValidation,
  updateUser,
} from '../../../../store/actions/auth/registerAction';

const locales = [
  {value: 'ar', displayName: i18n.locale === 'ar' ? 'اللغة العربية' : 'Arabic'},
  {
    value: 'en',
    displayName: i18n.locale === 'ar' ? 'اللغة الانجليزية' : 'English',
  },
];

const UserProfile = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState(i18n.locale === 'ar' ? 0 : 1);
  const staticStorageUser = route.params.user;
  const mainAccount = route.params.mainAccount;

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();

  useEffect(() => {
    if (mainAccount == null) {
      setLoading(true);
      dispatch(
        checkTokenValidation(
          staticStorageUser.accessToken,
          (freshUser) => {
            setUser(freshUser);
            setLoading(false);
          },
          () => {
            setLoading(false);
          },
        ),
      );
    } else {
      setUser(mainAccount);
    }
  }, [editMode, mainAccount]);

  useEffect(() => {
    if (user) {
      setValue('surname', user.surname);
      setValue('surnameAr', user.surnameAr);
      setValue('mobile', user.mobile);
      setValue('email', user.email);
    }
  }, [user]);

  const onSumbit = (values) => {
    const formValues = {
      ...values,
      locale: locales[selected].value,
    };
    console.log(formValues);
    setLoading(true);
    dispatch(
      updateUser(
        formValues,
        staticStorageUser.accessToken,
        () => {
          setLoading(false);
          setEditMode(false);
        },
        () => {
          setLoading(false);
        },
      ),
    );
  };

  return (
    <LoadingWrapper loading={loading}>
      <View style={styles().container}>
        <View style={styles().header}>
          <AuthHeader
            navigation={navigation}
            children={i18n.t(
              editMode
                ? 'loggedinUserProfile.editProfile'
                : 'loggedinUserProfile.profile',
            )}
          />
        </View>
        <KeyboardAvoidingScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20,
          }}>
          {editMode ? (
            <View style={styles().formGroup}>
              <Controller
                control={control}
                name="surname"
                rules={{
                  required: `${i18n.t('loggedinUserProfile.surname')} ${i18n.t(
                    'loggedinUserProfile.required',
                  )}`,
                }}
                defaultValue=""
                render={({field: {onChange, onBlur, value}}) => {
                  return (
                    <InputWithLabel
                      children={i18n.t('loggedinUserProfile.surname')}
                      onChange={(value) => onChange(value)}
                      value={value}
                      onBlur={onBlur}
                    />
                  );
                }}
              />
              {errors.surname && (
                <Text style={styles().error}>{errors.surname.message}</Text>
              )}
              <Controller
                control={control}
                name="surnameAr"
                rules={{
                  required: `${i18n.t(
                    'loggedinUserProfile.surnameAr',
                  )} ${i18n.t('loggedinUserProfile.required')}`,
                }}
                defaultValue=""
                render={({field: {onChange, onBlur, value}}) => (
                  <InputWithLabel
                    children={i18n.t('loggedinUserProfile.surnameAr')}
                    onChange={(value) => onChange(value)}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.surnameAr && (
                <Text style={styles().error}>{errors.surnameAr.message}</Text>
              )}
              <Controller
                control={control}
                name="mobile"
                rules={{
                  required: `${i18n.t('loggedinUserProfile.mobile')} ${i18n.t(
                    'loggedinUserProfile.required',
                  )}`,
                }}
                defaultValue=""
                render={({field: {onChange, onBlur, value}}) => (
                  <InputWithLabel
                    children={i18n.t('loggedinUserProfile.mobile')}
                    onChange={(value) => onChange(value)}
                    value={value}
                    onBlur={onBlur}
                    keyboardType="number-pad"
                  />
                )}
              />
              {errors.mobile && (
                <Text style={styles().error}>{errors.mobile.message}</Text>
              )}
              <Controller
                control={control}
                name="email"
                rules={{
                  required: `${i18n.t('loggedinUserProfile.email')} ${i18n.t(
                    'loggedinUserProfile.required',
                  )}`,
                }}
                defaultValue=""
                render={({field: {onChange, onBlur, value}}) => (
                  <InputWithLabel
                    children={i18n.t('loggedinUserProfile.email')}
                    onChange={(value) => onChange(value)}
                    value={value}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    handleSumbit={handleSubmit(onSumbit)}
                  />
                )}
              />
              {errors.email && (
                <Text style={styles().error}>{errors.email.message}</Text>
              )}
              <Text
                style={{
                  textAlign: i18n.locale === 'ar' ? 'left' : 'auto',
                  fontFamily: fontFamilies('boldText'),
                  marginTop: 20,
                }}>
                {i18n.t('loggedinUserProfile.locale')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {locales.map((locale, i) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginVertical: 5,
                    }}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => setSelected(i)}
                      style={{
                        marginVertical: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: colors.skyBlue,
                          width: 30,
                          height: 30,
                          borderRadius: 20,
                          marginRight: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {selected === i && (
                          <View
                            style={{
                              backgroundColor: colors.skyBlue,
                              width: 15,
                              height: 15,
                              borderRadius: 20,
                            }}></View>
                        )}
                      </View>
                      <Text
                        style={{
                          fontFamily: fontFamilies('boldText'),
                        }}>
                        {locale.displayName}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <AppButton
                onPress={handleSubmit(onSumbit, console.log('invalid', errors))}
                text={i18n.t('loggedinUserProfile.save')}
              />
            </View>
          ) : user ? (
            <>
              <View style={styles().profileDetails}>
                <View style={styles().profilePicContainer}>
                  <Icon
                    name={
                      user.gender
                        ? user.gender === 'Male'
                          ? 'male'
                          : 'female'
                        : 'male'
                    }
                    size={50}
                    color={colors.whiteAbsolute}
                  />
                </View>

                <View
                  style={{
                    justifyContent: 'space-between',
                    flex: 1,
                  }}>
                  <DataRow
                    title={i18n.t('loggedinUserProfile.name')}
                    value={I18nManager.isRTL ? user.nameAr : user.name}
                  />
                  <DataRow
                    title={i18n.t('loggedinUserProfile.id')}
                    value={
                      I18nManager.isRTL
                        ? converENDigitsToAr(user.udhId)
                        : user.udhId
                    }
                  />
                  <DataRow
                    title={i18n.t('loggedinUserProfile.mobile')}
                    value={
                      I18nManager.isRTL
                        ? converENDigitsToAr(user.mobile)
                        : user.mobile
                    }
                  />
                  <DataRow
                    title={i18n.t('loggedinUserProfile.gender')}
                    value={
                      user.gender
                        ? I18nManager.isRTL
                          ? user.gender == 'Male'
                            ? 'ذكر'
                            : 'اثني'
                          : user.gender
                        : I18nManager.isRTL
                        ? 'غير معروف'
                        : 'unknown'
                    }
                  />
                  <DataRow
                    title={i18n.t('loggedinUserProfile.DOB')}
                    value={
                      user.birthdate
                        ? I18nManager.isRTL
                          ? new Date(user.birthdate).toLocaleDateString(
                              'ar-eg',
                              {
                                year: 'numeric',
                                month: '2-digit',
                                day: 'numeric',
                              },
                            )
                          : new Date(user.birthdate).toLocaleDateString()
                        : I18nManager.isRTL
                        ? 'غير معروف'
                        : 'Unknown'
                    }
                  />
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: 20,
                }}>
                <AppButton
                  onPress={() => setEditMode(true)}
                  text={i18n.t('loggedinUserProfile.editProfile')}
                />
              </View>
            </>
          ) : null}
        </KeyboardAvoidingScrollView>
      </View>
    </LoadingWrapper>
  );
};

const DataRow = ({title, value}) => (
  <View style={styles().dataRow}>
    <Text style={styles().title}>{title}</Text>
    <Text numberOfLines={1} style={styles().value}>
      {value}
    </Text>
  </View>
);

export default UserProfile;
