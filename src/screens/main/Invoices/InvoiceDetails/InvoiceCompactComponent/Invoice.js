import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  I18nManager,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { DotsLoader } from 'react-native-indicator';

import {
  colors,
  images,
  routesNames,
  i18n,
  fontFamilies,
} from '../../../../../services';
import {
  converENDigitsToAr,
  renderIdNumber,
} from '../../../../../services/utilities/helpers';
import { payInvoice } from '../../../../../store/actions/main/invoicesAndPaymentActions';
import moment from 'moment';
import styles from '../styles';

const Invoice = ({ invoice, navigation, paied }) => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <View style={styles().fullInvoice}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setExpanded(!expanded);
        }}>
        <View style={styles().invoice}>
          <View style={styles().invoiceInnerContainer}>
            <View
              style={{
                ...styles().invoiceImageContainer,
                backgroundColor:
                  invoice.invoiceStatus === 1 ? colors.green : colors.red,
              }}>
              <Image
                source={invoice.qrCode ? { uri: invoice.qrCode } : images.bill_invoice}
                style={styles().invoiceImage}
              />
            </View>
            <View style={styles().invoiceDetails}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles().invoiceHeading}>
                  {i18n.t('invoicesTranslations.invoiceNo')} #
                  {I18nManager.isRTL
                    ? converENDigitsToAr(invoice.transCount)
                    : invoice.transCount}
                </Text>
                {paied ? null : (
                  <TouchableOpacity
                    onPress={() => {
                      setLoading(true);
                      dispatch(
                        payInvoice(
                          {
                            customerMobileNumber: invoice.mobileNumber,
                            transCount: invoice.transCount,
                            invoice: invoice,
                          },
                          navigation,
                          (data) => {
                            setLoading(false);
                            navigation.navigate(routesNames.paymentWebView, {
                              ...data,
                            });
                          },
                          () => {
                            setLoading(false);
                          },
                        ),
                      );
                    }}
                    style={{
                      height: 25,
                      width: 60,
                      marginTop: 5,
                      borderRadius: 3,
                      backgroundColor: colors.green,
                      alignSelf: 'flex-end',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {loading ? (
                      <DotsLoader size={8} color={colors.whiteAbsolute} />
                    ) : (
                      <Text
                        style={{
                          color: colors.whiteAbsolute,
                          fontSize: 12,
                          fontFamily: fontFamilies('normalText'),
                        }}>
                        {i18n.t('invoicesTranslations.pay')}
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>

              <View
                style={{
                  ...styles().invoiceDetailsIcons,
                  flex: 1,
                  marginTop: 12,
                  justifyContent: 'space-between',
                }}>
                {/* {paied ? null : (
                <View style={styles().invoiceIconContainer}>
                  <Image source={images.bill_file} style={styles().invoiceIcon} />
                  <Text style={styles().iconTxtColor}>
                    {invoice.profileNumber}
                  </Text>
                </View>
              )} */}
                {paied ? (
                  <View
                    style={{
                      ...styles().invoiceIconContainer,
                      left: 10,
                      flex: 1,
                      justifyContent: 'flex-end',
                      top: 10,
                      marginBottom: 10,
                    }}>
                    <Image
                      source={images.currency}
                      style={{ ...styles().invoiceIcon, width: 50, height: 15 }}
                    />
                    <Text
                      style={{
                        color: colors.skyBlue,
                        fontSize: 15,
                        fontFamily: fontFamilies('boldTextHeader'),
                      }}>
                      {I18nManager.isRTL
                        ? converENDigitsToAr(invoice.netAmount)
                        : invoice.netAmount}{' '}
                      {i18n.t('invoicesTranslations.sar')}
                    </Text>
                  </View>
                ) : (
                  <View style={styles().invoiceIconContainer}>
                    <Image
                      source={images.currency}
                      style={{ ...styles().invoiceIcon, width: 30, height: 15 }}
                    />
                    <Text style={styles().iconTxtColor}>
                      {I18nManager.isRTL
                        ? converENDigitsToAr(invoice.netAmount)
                        : invoice.netAmount}{' '}
                      {i18n.t('invoicesTranslations.sar')}
                    </Text>
                  </View>
                )}
                {paied ? null : (
                  <View style={styles().invoiceIconContainer}>
                    <Image
                      source={images.calender}
                      style={styles().invoiceIcon}
                    />
                    <Text style={styles().iconTxtColor}>
                      {I18nManager.isRTL
                        ? converENDigitsToAr(
                          new Date(invoice.createdAt).toLocaleDateString(),
                        )
                        : new Date(invoice.createdAt).toLocaleDateString()}
                    </Text>
                  </View>
                )}
                {paied ? null : (
                  <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                    <Icon
                      name={expanded ? 'angle-double-up' : 'angle-double-down'}
                      size={20}
                      color={colors.darkGrey}
                      style={styles().expandIcon}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {expanded ? (
        paied ? null : (
          <View style={styles().invoiceSummary}>
            <View style={styles().summaryHeader}>
              <Image source={images.logo} style={styles().summaryHeaderImage} />
              <Text style={styles().summaryHeaderText}>
                {i18n.t('invoicesTranslations.udh')}
              </Text>
              <Text style={styles().summaryHeading}>
                {i18n.t('invoicesTranslations.invoiceSummary')}
              </Text>
            </View>
            <View style={styles().summaryDetails}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}>
                <View style={{ alignItems: 'flex-start' }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles().detailHeading}>
                    {i18n.t('invoicesTranslations.invoiceNo')}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles().detailSubHeading}>
                    {I18nManager.isRTL
                      ? converENDigitsToAr(invoice.transCount)
                      : invoice.transCount}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-start', marginHorizontal: 10 }}>
                  <Text style={styles().detailHeading}>
                    {i18n.t('invoicesTranslations.invoiceDate')}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ ...styles().detailSubHeading, maxWidth: 500 }}>
                    {I18nManager.isRTL
                      ? Platform.OS === 'android'
                        ? converENDigitsToAr(
                          moment(invoice.createdAt).format('l'),
                        )
                        : new Date(invoice.createdAt).toLocaleDateString(
                          'ar-EG',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          },
                        )
                      : moment(invoice.createdAt).format('ll')}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-start' }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ ...styles().detailHeading }}>
                    {i18n.t('invoicesTranslations.idNo')}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles().detailSubHeading}>
                    {I18nManager.isRTL
                      ? converENDigitsToAr(renderIdNumber(invoice.idNumber))
                      : renderIdNumber(invoice.idNumber)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}>
                <View style={{ alignItems: 'flex-start' }}>
                  <Text style={styles().detailHeading}>
                    {i18n.t('invoicesTranslations.doctorName')}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ ...styles().detailSubHeading, maxWidth: 250 }}>
                    {invoice.doctorName}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-start' }}>
                  <Text style={styles().detailHeading}>
                    {i18n.t('invoicesTranslations.profileNo')}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles().detailSubHeading}>
                    {I18nManager.isRTL
                      ? converENDigitsToAr(invoice.profileNumber)
                      : invoice.profileNumber}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}>
                <View style={{ alignItems: 'flex-start' }}>
                  <Text style={styles().detailHeading}>
                    {i18n.t('invoicesTranslations.patient')}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ ...styles().detailSubHeading, maxWidth: 300 }}>
                    {invoice.patientFirstName}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  padding: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <Text style={styles().detailHeading}>
                    {i18n.t('invoicesTranslations.subtotal')}
                  </Text>
                  <Text
                    style={{
                      ...styles().detailSubHeading,
                      fontFamily: fontFamilies('boldText'),
                    }}>
                    {I18nManager.isRTL
                      ? converENDigitsToAr(invoice.invoiceAmount.toFixed(2))
                      : invoice.invoiceAmount.toFixed(2)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      ...styles().detailSubHeading,
                      fontFamily: fontFamilies('boldText'),
                    }}>
                    {`${I18nManager.isRTL ? 'ضريبة القيمة المضافة' : 'VAT'} ${I18nManager.isRTL
                      ? converENDigitsToAr(invoice.vatPercentage)
                      : invoice.vatPercentage
                      }%`}
                  </Text>
                  <Text
                    style={{
                      ...styles().detailSubHeading,
                      fontFamily: fontFamilies('boldText'),
                    }}>
                    {I18nManager.isRTL
                      ? converENDigitsToAr(invoice.vatAmount.toFixed(2))
                      : invoice.vatAmount.toFixed(2)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      ...styles().detailSubHeading,
                      fontFamily: fontFamilies('boldText'),
                    }}>
                    {i18n.t('invoicesTranslations.total')}
                  </Text>
                  <Text
                    style={{
                      ...styles().detailSubHeading,
                      fontFamily: fontFamilies('boldText'),
                    }}>
                    {I18nManager.isRTL
                      ? converENDigitsToAr(invoice.netAmount.toFixed(2))
                      : invoice.netAmount.toFixed(2)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      ...styles().detailHeading,
                      color: colors.skyBlue,
                      fontSize: 20,
                      maxWidth: 150,
                    }}>
                    {i18n.t('invoicesTranslations.amountDue')}
                  </Text>
                  <Text
                    style={{
                      ...styles().detailHeading,
                      color: colors.skyBlue,
                      fontSize: 20,
                    }}>
                    {I18nManager.isRTL
                      ? converENDigitsToAr(invoice.netAmount.toFixed(2))
                      : invoice.netAmount.toFixed(2)}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setLoading(true);
                  dispatch(
                    payInvoice(
                      {
                        customerMobileNumber: invoice.mobileNumber,
                        transCount: invoice.transCount,
                        invoice: invoice,
                      },
                      navigation,
                      (data) => {
                        setLoading(false);
                        navigation.navigate(routesNames.paymentWebView, {
                          ...data,
                        });
                      },
                      () => {
                        setLoading(false);
                      },
                    ),
                  );
                }}
                style={{
                  backgroundColor: colors.green,
                  marginVertical: 20,
                  height: 35,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {loading ? (
                  <DotsLoader size={16} color={colors.whiteAbsolute} />
                ) : (
                  <Text
                    style={{
                      color: colors.whiteAbsolute,
                      fontFamily: fontFamilies('semiboldText'),
                      fontSize: 14,
                    }}>
                    {i18n.t('invoicesTranslations.payNow')}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )
      ) : null}
    </View>
  );
};

export default Invoice;
