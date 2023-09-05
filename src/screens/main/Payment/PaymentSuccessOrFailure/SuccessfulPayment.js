import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';

import {LoadingWrapper} from '../../../../components';
import {
  colors,
  fontFamilies,
  i18n,
  images,
  routesNames,
  shadows,
} from '../../../../services';
import {converENDigitsToAr} from '../../../../services/utilities/helpers';
import {smallScreens} from '../../../../services/utilities/responsive';

const SuccessfulPayment = ({route, navigation}) => {
  const {invoiceDetails} = route.params;
  const hasUnsavedChanges = Boolean(true);
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();
      }),
    [navigation, hasUnsavedChanges],
  );

  return (
    <LoadingWrapper header navigation={navigation}>
      <View style={styles().contianer}>
        <Text style={styles().pageTitle}>
          {i18n.t('paymentSuccess.header')}
        </Text>
        <View style={styles().card}>
          <Text style={styles().headerTxt}>
            {i18n.t('paymentSuccess.failHeading')}
          </Text>
          <Image source={images.correct} style={styles().hearderImage} />
          <Text style={styles().headerTxt}>
            {i18n.t('paymentSuccess.orderNo')}
            {' #'}
            {I18nManager.isRTL
              ? converENDigitsToAr(invoiceDetails.transCount)
              : invoiceDetails.transCount}
          </Text>
          <Text
            style={{
              marginVertical: 20,
              fontFamily: fontFamilies('boldText'),
            }}>
            {I18nManager.isRTL
              ? new Date(
                  moment(invoiceDetails.createdAt).format(''),
                ).toLocaleDateString('ar-eg', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  weekday: 'short',
                })
              : moment(invoiceDetails.createdAt).format('llll')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 20,
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: fontFamilies('normalTextHeader'),
                fontSize: smallScreens ? 12 : 16,
              }}>
              {i18n.t('paymentSuccess.price')}
            </Text>
            <Text
              style={{
                marginLeft: 20,
                fontFamily: fontFamilies('boldText'),
                fontSize: smallScreens ? 12 : 16,
                color: colors.skyBlue,
              }}>
              {I18nManager.isRTL
                ? converENDigitsToAr(invoiceDetails.netAmount.toFixed(2))
                : invoiceDetails.netAmount.toFixed(2)}{' '}
              {i18n.t('paymentSuccess.sar')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.push(routesNames.invoiceDetails, {
                mrnOrTransCoutn: {
                  MRN: invoiceDetails.profileNumber,
                  invoiceNo: '',
                },
              })
            }
            style={styles().btn}
            activeOpacity={0.7}>
            <Text
              style={{
                fontSize: smallScreens ? 12 : 14,
                color: colors.whiteAbsolute,
                fontFamily: fontFamilies('boldText'),
              }}>
              {i18n.t('paymentSuccess.try')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LoadingWrapper>
  );
};

export default SuccessfulPayment;

const styles = () =>
  StyleSheet.create({
    contianer: {
      padding: 20,
      flex: 1,
    },
    card: {
      marginTop: 20,
      backgroundColor: colors.white,
      padding: smallScreens ? 15 : 30,
      ...shadows.lightShadowGreyLowSpread,
      borderRadius: 20,
      alignItems: 'center',
      elevation: 3,
    },
    pageTitle: {
      fontSize: 16,
      fontFamily: fontFamilies('boldTextHeader'),
      marginVertical: 0,
      alignSelf: I18nManager.isRTL ? 'flex-start' : 'flex-end',
    },
    hearderImage: {
      marginTop: 20,
    },
    headerTxt: {
      color: colors.green,
      fontSize: 16,
      fontFamily: fontFamilies('boldTextHeader'),
      marginTop: 20,
    },
    btn: {
      paddingVertical: 15,
      paddingHorizontal: 40,
      backgroundColor: colors.skyBlue,
      borderRadius: 10,
      marginVertical: 20,
    },
  });
