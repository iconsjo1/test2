import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, I18nManager} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';

import AuthHeader from '../../../../../components/headers/CustomHeader/AuthHeader';
import styles from './styles';
import {
  colors,
  convertFromArabic,
  displayToast,
  fontFamilies,
  i18n,
  images,
  routesNames,
} from '../../../../../services';
import InputWithIcon from '../../../../../components/inputs/InputWithIcon';
import {AppButton, LoadingWrapper} from '../../../../../components';
import {smallScreens} from '../../../../../services/utilities/responsive';
import {getAllOrders} from '../../../../../store/actions/main/flowerServiceActions';

const ShopInvoices = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSumbit = (values) => {
    console.log(values);
    setLoading(true);
    const data = {
      invoiceNo: convertFromArabic(values.invoiceNo),
      mobileNo: convertFromArabic(values.mobileNo),
    };
    const {invoiceNo} = data;
    const {mobileNo} = data;
    if (data.invoiceNo && data.mobileNo) {
      displayToast(
        'error',
        i18n.locale === 'ar'
          ? 'من فضلك ادخل رقم الفاتورة او رقم الهاتف فقط'
          : 'Please, Enter invoice number or mobile number',
        4500,
      );
      setLoading(false);
      return;
    }
    if (data.invoiceNo.length === 0 && data.mobileNo.length === 0) {
      displayToast(
        'error',
        I18nManager.isRTL
          ? 'من فضلك ادخل رقم الفاتورة او رقم الموبايل'
          : 'Please, Enter invoice number or mobile number',
      );
    }
    if (data.invoiceNo.length > 0) {
      dispatch(
        getAllOrders(
          invoiceNo,
          null,
          () => {
            setLoading(false);
            navigation.navigate(routesNames.orderOverview, {oneOrder: true});
          },
          () => {
            setLoading(false);
          },
        ),
      );
    }

    if (data.mobileNo.length > 0) {
      dispatch(
        getAllOrders(
          null,
          mobileNo,
          () => {
            setLoading(false);
            navigation.navigate(routesNames.invoicesOverview, {mobileNo});
          },
          () => {
            setLoading(false);
          },
        ),
      );
    } else {
      setLoading(false);
    }
  };
  return (
    <LoadingWrapper loading={loading}>
      <View style={styles().container}>
        <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}

          <AuthHeader
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
              name="mobileNo"
              defaultValue=""
              render={({field: {onChange, onBlur, value}}) => (
                <InputWithIcon
                  lable={i18n.t('invoiceDetailsTranslations.phone')}
                  onChange={(value) => onChange(value)}
                  placeholder={i18n.t('invoiceDetailsTranslations.phonePh')}
                  value={value}
                  onBlur={onBlur}
                  keyboardType="number-pad"
                />
              )}
            />
            <AppButton
              loading={loading}
              children={
                <>
                  <Text style={styles().btnText}>
                    {i18n.t('invoiceDetailsTranslations.submit')}
                  </Text>
                  <Icon
                    name={i18n.locale === 'ar' ? 'arrowleft' : 'arrowright'}
                    size={smallScreens ? 15 : 20}
                    color={colors.whiteAbsolute}
                  />
                </>
              }
              onPress={handleSubmit(onSumbit)}
            />
          </View>
        </KeyboardAvoidingScrollView>
      </View>
    </LoadingWrapper>
  );
};

export default ShopInvoices;
