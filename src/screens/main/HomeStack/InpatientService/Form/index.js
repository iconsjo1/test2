import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, I18nManager } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import {
  InputWithLabel,
  LoadingWrapper,
  PrimaryButton,
} from '../../../../../components';
import AuthHeader from '../../../../../components/headers/CustomHeader/AuthHeader';
import {
  colors,
  convertFromArabic,
  fontFamilies,
  i18n,
  images,
  routesNames,
} from '../../../../../services';
import { getInpatient } from '../../../../../store/actions/main/inpatientServicesActions';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';

const InpatientForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [errors, setErrors] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem('ADD_NUM')
      .then((res) => {
        const ParsedADD_NUM = JSON.parse(res);
        console.log('[Getting from Async Storage]', ParsedADD_NUM);
        setAdmissionNumber(ParsedADD_NUM.toString());
      })
      .catch((err) => console.log('[Error Storing]', err));
  }, []);

  useEffect(() => {
    if (errors) {
      setTimeout(() => {
        setErrors(null);
      }, 3000);
    }
  }, [errors]);

  const handleSumbit = () => {
    if (admissionNumber.length == 0) {
      setErrors({
        ADM_NUM: 'Admission number is reqired',
      });
      return;
    }

    if (admissionNumber.length >= 1) {
      setLoading(true);
      const stringADD_NUM = JSON.stringify(admissionNumber);
      AsyncStorage.setItem('ADD_NUM', stringADD_NUM)
        .then((res) => {
          console.log('[Stored]');
        })
        .catch((err) => console.log('[Error Storing]', err));
      dispatch(
        getInpatient(
          {
            admissionNumber: convertFromArabic(admissionNumber),
          },
          (data) => {
            setLoading(false);
            AsyncStorage.setItem('inpatient', JSON.stringify(data))
            navigation.navigate(routesNames.inpatientService, {
              inpatient: data,
            });
          },
          () => setLoading(false),
        ),
      );
    } else {
      return;
    }
  };

  return (
    <LoadingWrapper loading={loading}>
      <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false}>
        <View style={styles().container}>
          <AuthHeader
            navigation={navigation}
            children={i18n.t('inpatientTranslation.inpatient')}
          />
          <Image source={images.logo} style={styles().headerImg} />
          <Text style={styles().headerTxt}>
            {i18n.t('inpatientTranslation.explaination')}
          </Text>
          <View style={styles().formGroup}>
            <InputWithLabel
              keyboardType="number-pad"
              handleSumbit={handleSumbit}
              onChange={(value) => setAdmissionNumber(value)}
              placeholder={i18n.t('inpatientTranslation.placeholder')}
              value={admissionNumber}
            />
            {errors?.ADM_NUM && (
              <Text
                style={{
                  color: colors.red,
                  fontSize: 12,
                  marginVertical: 10,
                }}>
                {errors.ADM_NUM}
              </Text>
            )}

            <PrimaryButton
              onPress={handleSumbit}
              children={i18n.t('inpatientTranslation.access')}
              buttonStyle={{
                marginVertical: 20,
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingScrollView>
    </LoadingWrapper>
  );
};

export default InpatientForm;

const styles = () =>
  StyleSheet.create({
    container: {
      padding: 20,
    },
    headerImg: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginVertical: 20,
    },
    headerTxt: {
      fontFamily: fontFamilies('normalTextHeader'),
      fontSize: 14,
      lineHeight: 23,
      color: colors.black,
      textAlign: I18nManager.isRTL ? 'left' : 'center',
    },
    formGroup: {},
  });
