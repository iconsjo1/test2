import React, {useState} from 'react';
import {
  ActivityIndicator,
  I18nManager,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useSelector} from 'react-redux';
import {DotsLoader} from 'react-native-indicator';

import {LoadingWrapper} from '../../../../../components';
import {colors, routesNames} from '../../../../../services';

const PaymentWebView = ({route, navigation}) => {
  const [loading, setloading] = useState(true);
  const invoices = useSelector((state) => state.invoices.invoices);
  const {invoice, order} = route.params;

  return (
    <LoadingWrapper
      navigation={navigation}
      header
      headerText={I18nManager.isRTL ? 'الدفع' : 'Payment'}>
      {loading && (
        <View
          style={{
            width: '100%',
            height: '100%',
            zIndex: 1,
            opacity: 0.7,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
          }}>
          <DotsLoader color={colors.skyBlue} />
        </View>
      )}
      <WebView
        style={{flex: 1}}
        source={{uri: order.url}}
        onLoadEnd={() => setloading(false)}
        onLoad={(e) => {
          const url = e.nativeEvent.url.toString();
          console.log('From on Http', e.nativeEvent);
          if (url.includes('done')) {
            navigation.replace(routesNames.successfulPayment, {
              invoiceDetails: invoice,
            });
          }
          if (url.includes('error')) {
            navigation.replace(routesNames.failurePayment, {
              invoiceDetails: invoice,
            });
          }
          if (url.includes('canceled')) {
            navigation.navigate(routesNames.invoiceDetails, {
              mrnOrTransCoutn: {MRN: invoice.profileNumber, invoiceNo: ''},
            });
          }
        }}
        onHttpError={(e) => {
          const url = e.nativeEvent.url.toString();
          console.log('From on Http', e.nativeEvent);
          if (url.includes('done')) {
            navigation.replace(routesNames.successfulPayment, {
              invoiceDetails: invoice,
            });
          }
          if (url.includes('error')) {
            navigation.replace(routesNames.failurePayment, {
              invoiceDetails: invoice,
            });
          }
          if (url.includes('canceled')) {
            navigation.replace(routesNames.invoiceDetails);
          }
        }}></WebView>
    </LoadingWrapper>
  );
};

export default PaymentWebView;

const styles = StyleSheet.create({});
