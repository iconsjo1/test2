import React from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {routesNames} from '../../../services';
import Home from './Home';
import UserProfile from './UserProfile';
import InpatientForm from './InpatientService/Form';
import InpatientService from './InpatientService';
import AlertComponent from './InpatientService/AlertComponent/AlertComponent';
import SuccessServiceAlert from './InpatientService/AlertComponent/SuccessServiceAlert';
import RateOurServices from './InpatientService/RateOurServices';
import Invoice from '../Invoices/InvoiceDetails/InvoiceCompactComponent/Invoice';
import InvoiceDetails from '../Invoices/InvoiceDetails';
import SuccessfulPayment from '../Payment/PaymentSuccessOrFailure/SuccessfulPayment';
import FailurePayment from '../Payment/PaymentSuccessOrFailure/FailurePayment';
import PaymentWebView from '../Invoices/InvoiceDetails/PaymentWebView/index';
import FamilyMember from './FamilyMember';
import FlowerService from './FlowerService';
import FlowerOverview from './FlowerService/FlowerOverview';
import CartOverview from './FlowerService/Cart';
import InvoiceForm from './Invoice';
import InvoiceFormPay from './Invoicepay';

import VitalSigns from './VitalSigns';
import CreatePatientFile from './CreatePatientFile/Form/index';

const _HomeStack = createStackNavigator();
const config = {
  animationEnabled: false,
  headerShown: false,
  cardStyle: {backgroundColor: 'transparent'},
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({current: {progress}}) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  }),
};
const HomeStack = () => (
  <_HomeStack.Navigator headerMode="none">
    <_HomeStack.Screen name={routesNames.home} component={Home} />
    <_HomeStack.Screen name={routesNames.userProfile} component={UserProfile} />
    <_HomeStack.Screen
      name={routesNames.invoiceForm}
      component={InpatientForm}
    />
    <_HomeStack.Screen
      name={routesNames.inpatientService}
      component={InpatientService}
    />
    <_HomeStack.Screen
      name={routesNames.alert}
      component={AlertComponent}
      options={config}
    />
    <_HomeStack.Screen
      name={routesNames.successServiceAlert}
      component={SuccessServiceAlert}
      options={config}
    />
    <_HomeStack.Screen
      name={routesNames.rateOurServices}
      component={RateOurServices}
    />
    <_HomeStack.Screen
      name={routesNames.invoiceDetails}
      component={InvoiceDetails}
    />
    <_HomeStack.Screen
      name={routesNames.successfulPayment}
      component={SuccessfulPayment}
    />
    <_HomeStack.Screen
      name={routesNames.failurePayment}
      component={FailurePayment}
    />
    <_HomeStack.Screen
      name={routesNames.paymentWebView}
      component={PaymentWebView}
    />
    {/* Start Icons Code */}
    <_HomeStack.Screen
      name={routesNames.FamilyMember}
      component={FamilyMember}
    />
    <_HomeStack.Screen
      name={routesNames.createPatientFile}
      component={CreatePatientFile}
    />
    <_HomeStack.Screen
      name={routesNames.InvoicesForm}
      component={InvoiceForm}
    />
    <_HomeStack.Screen
      name={routesNames.InvoicesFormPay}
      component={InvoiceFormPay}
    />
    {/* End Icons Code */}
    <_HomeStack.Screen name={routesNames.vitalSigns} component={VitalSigns} />
  </_HomeStack.Navigator>
);

export default HomeStack;
