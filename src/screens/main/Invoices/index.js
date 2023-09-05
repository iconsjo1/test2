import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {routesNames} from '../../../services';
import Invoice from './Invoice';
import InvoiceDetails from './InvoiceDetails';
import SuccessfulPayment from '../Payment/PaymentSuccessOrFailure/SuccessfulPayment';
import FailurePayment from '../Payment/PaymentSuccessOrFailure/FailurePayment';
import PaymentWebView from './InvoiceDetails/PaymentWebView';
import Home from '../HomeStack/Home';
const _Invoices = createStackNavigator();

const Invoices = () => (
  <_Invoices.Navigator headerMode="none">
    <_Invoices.Screen name={routesNames.invoiceForm} component={Invoice} />
    <_Invoices.Screen
      name={routesNames.invoiceDetails}
      component={InvoiceDetails}
    />
    <_Invoices.Screen
      name={routesNames.successfulPayment}
      component={SuccessfulPayment}
    />
    <_Invoices.Screen
      name={routesNames.failurePayment}
      component={FailurePayment}
    />
    <_Invoices.Screen
      name={routesNames.paymentWebView}
      component={PaymentWebView}
    />
  </_Invoices.Navigator>
);

export default Invoices;
