import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {routesNames, colors, WP} from '../../services';
import Home from './HomeStack/Home';
import {TabBarComponent} from '../../components';
import {View, Platform} from 'react-native';
import ReportsForm from './Reports/ReportsForm';
import Appointments from './Appointments';
import Menu from './Menu';
import UDHLive from './UDHLive';
import Invoices from './Invoices';
// import Invoice_1 from './Invoices/Invoice_1';
// import Invoice_2 from './Invoices/Invoice_2';
import {RootNavigator} from '../../screens';
import PrivateCareService from './Payments/PrivateCareService';
import AsyncStorage from '@react-native-community/async-storage';
import HomeLoggedinUser from './HomeStack/HomeLoggedinUser';

import HomeStack from './HomeStack';

const BottomTabNav = createBottomTabNavigator();

const Main = () => {
  return (
    <BottomTabNav.Navigator
      initialRouteName={routesNames.home}
      backBehavior="initialRoute"
      screenOptions={{unmountOnBlur: true}}
      tabBar={(props) => <TabBarComponent {...props} />}>
      <BottomTabNav.Screen name={routesNames.home} component={HomeStack} />
      <BottomTabNav.Screen
        name={routesNames.appointments}
        component={Appointments}
      />
      {/* <BottomTabNav.Screen name={routesNames.live} component={UDHLive} /> */}
      <BottomTabNav.Screen
        name={routesNames.invoiceForm}
        component={Invoices}
      />
      <BottomTabNav.Screen name={routesNames.reports} component={ReportsForm} />
      <BottomTabNav.Screen name={routesNames.menu} component={Menu} />
    </BottomTabNav.Navigator>
  );
};

export default Main;

const Dummy = () => (
  <View style={{flex: 1, backgroundColor: colors.red}}></View>
);
