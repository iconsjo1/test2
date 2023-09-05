import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  I18nManager,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import AuthHeader from '../../../../components/headers/CustomHeader/AuthHeader';
import styles from './styles';
import {
  colors,
  convertFromArabic,
  displayToast,
  fontFamilies,
  i18n,
  images,
  routesNames,
} from '../../../../services';
import InputWithIcon from '../../../../components/inputs/InputWithIcon';
import {getInvoices} from '../../../../store/actions/main/invoicesAndPaymentActions';
import {LoadingWrapper, PrimaryButton} from '../../../../components';
import AsyncStorage from '@react-native-community/async-storage';
import {smallScreens} from '../../../../services/utilities/responsive';

const Invoice = ({navigation}) => {
  const isFocused = useIsFocused();
  const [twoInputsFiledError, sertTwoInputsFiledError] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('user')
      .then((res) => {
        setLoading(false);
        const parsedUser = JSON.parse(res);
        setUser(parsedUser);
      })
      .catch((err) => setLoading(false));
  }, [isFocused]);

  useEffect(() => {
    if (user) {
      navigation.navigate(routesNames.invoiceDetails, {
        mrnOrTransCoutn: {invoiceNo: '', MRN: user.mrn},
      });
    }
  }, [user]);

  useEffect(() => {
    if (twoInputsFiledError) {
      displayToast(
        'error',
        i18n.t('invoiceDetailsTranslations.twoFieldsErr'),
        4500,
      );

      setInterval(() => {
        sertTwoInputsFiledError(null);
      }, 4000);
    }
  }, [twoInputsFiledError]);

  const onSumbit = (values) => {
    const data = {
      invoiceNo: convertFromArabic(values.invoiceNo),
      MRN: convertFromArabic(values.MRN),
    };
    if (data.invoiceNo && data.MRN) {
      sertTwoInputsFiledError('Error');
      return;
    }
    if (data.invoiceNo.length === 0 && data.MRN.length === 0) {
      displayToast(
        'error',
        I18nManager.isRTL
          ? 'من فضلك ادخل رقم الملف الطبي أو رقم الفاتورة للمتابعة'
          : 'Please, Enter Mrn or invoice number to continue',
      );
      return;
    } else {
      setLoading(true);
      dispatch(
        getInvoices(
          data,
          () => {
            setLoading(false);
            navigation.navigate(routesNames.invoiceDetails, {
              mrnOrTransCoutn: data,
            });
          },
          (value) => {
            setLoading(false);
            if (value)
              navigation.navigate(routesNames.invoiceDetails, {
                mrnOrTransCoutn: data,
              });
          },
        ),
      );
    }
  };
  return (
    <LoadingWrapper loading={loading}>
      <View style={styles().container}>
        <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}

          <AuthHeader
            backRoute={routesNames.home}
            children={i18n.t('invoiceDetailsTranslations.invoices')}
            navigation={navigation}
          />
          <View style={styles().header}>
            {/* Header Image */}
            <Image source={images.bill} style={styles().headerImage} />
            {/* Header Text */}
            <Text style={styles().headerTxt}>
              {i18n.t('invoiceDetailsTranslations.helpTxt')}
            </Text>
          </View>
          <View style={styles().formGroup}>
            <Controller
              control={control}
              name="invoiceNo"
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithIcon
                  lable={i18n.t('invoiceDetailsTranslations.invoiceNumber')}
                  iconName="check"
                  onChange={(value) => onChange(value)}
                  placeholder={i18n.t(
                    'invoiceDetailsTranslations.invoiceNumberPh',
                  )}
                  value={value}
                  onBlur={onBlur}
                  keyboardType="number-pad"
                  handleSumbit={handleSubmit(onSumbit)}
                />
              )}
            />
            <Text
              style={{
                alignSelf: 'center',
                marginVertical: 10,
                fontFamily: fontFamilies('normalText'),
              }}>
              {i18n.t('invoiceDetailsTranslations.or')}
            </Text>
            <Controller
              control={control}
              name="MRN"
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithIcon
                  lable={i18n.t('invoiceDetailsTranslations.mrnNo')}
                  iconName="check"
                  onChange={(value) => onChange(value)}
                  placeholder={i18n.t('invoiceDetailsTranslations.mrnNumberPh')}
                  value={value}
                  onBlur={onBlur}
                  keyboardType="number-pad"
                />
              )}
            />
            <TouchableOpacity
              onPress={handleSubmit(onSumbit)}
              style={styles().primaryButton}>
              <Text style={styles().btnText}>
                {i18n.t('invoiceDetailsTranslations.submit')}
              </Text>
              <Icon
                name={i18n.locale === 'ar' ? 'arrowleft' : 'arrowright'}
                size={smallScreens ? 15 : 20}
                color={colors.whiteAbsolute}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingScrollView>
      </View>
    </LoadingWrapper>
  );
};

export default Invoice;
