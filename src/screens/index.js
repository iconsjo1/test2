import React, {useEffect, useRef, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Landing from './auth/Landing';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {routesNames, colors, firstTimeStart} from '../services';
import Main from './main';
import {StatusBar, SafeAreaView, Platform} from 'react-native';
import {
  LabReports,
  LabReportDetails,
  RadiologyReports,
  RadiologyReportDetails,
} from './main/Reports';
import SelectCard from './main/Payments/SelectCard';
import MyAppointments from './main/MyAppointments';
import AddCard from './main/Payments/AddCard';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreenIOS from './auth/SplashScreenIOS';
import NewsList from './main/HomeStack/NewsList';
import NewsDetails from './main/HomeStack/NewsDetails';
import SelectDoctor from './main/Appointments/SelectDoctor';
import OurRooms from './staticScreens/Ourroomsvideo';
import AboutUs from './staticScreens/AboutUs';
import MedicalServices from './staticScreens/MedicalServices';
import HospitalProcedures from './staticScreens/HospitalProcedures';
import PatientsAndVisitors from './staticScreens/PatientsAndVisitors';
import Appointments from './main/Appointments';
import GMMessage from './staticScreens/GMMessages';
// import Invoice_2 from './main/Invoices/Invoice_2';
import PrivateCareService from './payment/PrivateCareService';
import LoginScreen from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import SignUp from './auth/Signup';
import SetPassword from './auth/SetPassword';
import SetPasswordSuccess from './auth/SetPassword/SetPasswordSuccess';
import SignupVerification from './auth/Signup/SignupVerification';
import SignupSetPassword from './auth/Signup/SetPassword';
import InvoiceDetails from './main/Invoices/InvoiceDetails';
// import SelectPaymentType from './main/Payment/SelectPaymentType';
// import CardsCollection from './main/Payment/CardsCollection';
// import AddNewCard from './main/Payment/AddNewCard';
// import SuccessfulPayment from './main/Payment/PaymentSuccessOrFailure/SuccessfulPayment';
// import FailurePayment from './main/Payment/PaymentSuccessOrFailure/FailurePayment';
// import PaymentWebView from './main/Invoices/InvoiceDetails/PaymentWebView';
import UserProfile from './main/HomeStack/UserProfile';
import EditImage from './Gallery/EditImage';
import ImageView from './Gallery/ImageView';
import Images from './Gallery/Images';
import HospitalGuide from './main/HomeStack/HospitalGuide';
import CategorieViewer from './main/HomeStack/HospitalGuide/CategorieViewer.js';
import FlowerService from './main/HomeStack/FlowerService';
import FlowerOverview from './main/HomeStack/FlowerService/FlowerOverview';
import CartOverview from './main/HomeStack/FlowerService/Cart';
import OrderOverview from './main/HomeStack/FlowerService/OrderOverview';
import ShopInvoices from './main/HomeStack/FlowerService/ShopInvoices';
import InvoicesOverview from './main/HomeStack/FlowerService/InvoicesOverView';
import RestaurantService from './main/HomeStack/RestaurantService';
import ProductOverview from './main/HomeStack/RestaurantService/ProductOverView';
import RestaurantCart from './main/HomeStack/RestaurantService/Cart';
import RestaurantInvoices from './main/HomeStack/RestaurantService/RestaurantInvoices';
import RestaurantInvoicesOverview from './main/HomeStack/RestaurantService/RestaurantInvoicesOverview';
import RestaurantOderOverview from './main/HomeStack/RestaurantService/RestaurantOrderOverview';
import ServicesPaymentWebView from './main/HomeStack/FlowerService/ServicesPaymentWebView';

const Nav = createStackNavigator();

const RootNavigator = () => {
  const initialRoute = useRef();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    appStartUpChecks();
  }, []);

  const appStartUpChecks = async () => {
    if (Platform.OS === 'ios') initialRoute.current = routesNames.splashScreen;
    else {
      if (await AsyncStorage.getItem(firstTimeStart))
        initialRoute.current = routesNames.main;
      else initialRoute.current = routesNames.landing;
    }
    setLoading(false);
  };

  const themeColor = useSelector((state) => state.theme.themeColor);

  return (
    <>
      <StatusBar
        backgroundColor={colors.whiteBg}
        barStyle={themeColor === 'light' ? 'dark-content' : 'light-content'}
      />
      {Platform.OS === 'ios' ? (
        <SafeAreaView
          style={{
            flexDirection: 'row',
            backgroundColor: colors.whiteBg,
          }}
        />
      ) : null}
      {loading ? null : (
        <NavigationContainer>
          <Nav.Navigator
            initialRouteName={initialRoute.current}
            headerMode="none">
            <Nav.Screen
              name={routesNames.splashScreen}
              component={SplashScreenIOS}
            />
            <Nav.Screen name={routesNames.landing} component={Landing} />
            <Nav.Screen name={routesNames.main} component={Main} />
            <Nav.Screen name={routesNames.labReports} component={LabReports} />
            <Nav.Screen
              name={routesNames.labReportDetails}
              component={LabReportDetails}
            />
            <Nav.Screen
              name={routesNames.radiologyReports}
              component={RadiologyReports}
            />
            <Nav.Screen
              name={routesNames.radiologyReportDetails}
              component={RadiologyReportDetails}
            />
            {/* <Nav.Screen
              name={routesNames.cardSelection}
              component={SelectCard}
            /> */}
            <Nav.Screen
              name={routesNames.myAppointments}
              component={MyAppointments}
            />
            {/* <Nav.Screen name={routesNames.addCard} component={AddCard} /> */}
            <Nav.Screen name={routesNames.newsList} component={NewsList} />
            <Nav.Screen
              name={routesNames.knowYourDoc}
              component={Appointments}
            />
            <Nav.Screen
              name={routesNames.newsDetails}
              component={NewsDetails}
            />
            <Nav.Screen name={routesNames.ourRooms} component={OurRooms} />
            <Nav.Screen name={routesNames.gmMessage} component={GMMessage} />
            <Nav.Screen name={routesNames.aboutUs} component={AboutUs} />

            <Nav.Screen
              name={routesNames.medicalServices}
              component={MedicalServices}
            />
            <Nav.Screen
              name={routesNames.hospitalProcedures}
              component={HospitalProcedures}
            />
            <Nav.Screen
              name={routesNames.patAndVisitor}
              component={PatientsAndVisitors}
            />
            {/* <Nav.Screen name={routesNames.invoice_2} component={Invoice_2} /> */}
            <Nav.Screen
              name={routesNames.PrivateCareService}
              component={PrivateCareService}
            />
            <Nav.Screen name={routesNames.login} component={LoginScreen} />
            <Nav.Screen
              name={routesNames.forgotPassword}
              component={ForgotPassword}
            />
            <Nav.Screen name={routesNames.signUp} component={SignUp} />
            <Nav.Screen
              name={routesNames.setPassword}
              component={SetPassword}
            />
            <Nav.Screen
              name={routesNames.setPasswordSuccess}
              component={SetPasswordSuccess}
            />
            <Nav.Screen
              name={routesNames.signupVerification}
              component={SignupVerification}
            />
            <Nav.Screen
              name={routesNames.signupSetPassword}
              component={SignupSetPassword}
            />
            <Nav.Screen
              name={routesNames.invoiceDetails}
              component={InvoiceDetails}
            />
            {/* <Nav.Screen
              name={routesNames.selectPaymentType}
              component={SelectPaymentType}
            />
            <Nav.Screen
              name={routesNames.cardsCollection}
              component={CardsCollection}
            />
            <Nav.Screen name={routesNames.addNewCard} component={AddNewCard} /> */}
            {/* <Nav.Screen
              name={routesNames.successfulPayment}
              component={SuccessfulPayment}
            />
            <Nav.Screen
              name={routesNames.failurePayment}
              component={FailurePayment}
            />*/}
            <Nav.Screen
              name={routesNames.userProfile}
              component={UserProfile}
            />
            <Nav.Screen
              name={routesNames.hospitalGuide}
              component={HospitalGuide}
            />
            <Nav.Screen
              name={routesNames.categorieViewer}
              component={CategorieViewer}
            />
            <Nav.Screen
              name={routesNames.flowerService}
              component={FlowerService}
            />
            <Nav.Screen
              name={routesNames.flowerOverview}
              component={FlowerOverview}
            />
            <Nav.Screen
              name={routesNames.cartOverview}
              component={CartOverview}
            />
            <Nav.Screen
              name={routesNames.orderOverview}
              component={OrderOverview}
            />
            <Nav.Screen
              name={routesNames.shopInvoices}
              component={ShopInvoices}
            />
            <Nav.Screen
              name={routesNames.invoicesOverview}
              component={InvoicesOverview}
            />
            <Nav.Screen
              name={routesNames.servicesPaymentWebView}
              component={ServicesPaymentWebView}
            />
            <Nav.Screen
              name={routesNames.restaurantService}
              component={RestaurantService}
            />
            <Nav.Screen
              name={routesNames.productOverview}
              component={ProductOverview}
            />
            <Nav.Screen
              name={routesNames.restaurantCart}
              component={RestaurantCart}
            />
            <Nav.Screen
              name={routesNames.restaurantInvoices}
              component={RestaurantInvoices}
            />
            <Nav.Screen
              name={routesNames.restaurantInvoicesOverView}
              component={RestaurantInvoicesOverview}
            />
            <Nav.Screen
              name={routesNames.restaurantOrderOverView}
              component={RestaurantOderOverview}
            />
            <Nav.Screen name={routesNames.Images} component={Images} />
            <Nav.Screen name={routesNames.EditImage} component={EditImage} />
            <Nav.Screen name={routesNames.ImageView} component={ImageView} />
          </Nav.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default RootNavigator;
