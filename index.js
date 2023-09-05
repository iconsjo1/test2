/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, { Importance } from 'react-native-push-notification';
import AsyncStorage from '@react-native-community/async-storage';

import App from './src/App';
import { name_android, name_ios } from './app.json';
import { showNotification } from './src/config/notification';
const appName = Platform.OS === 'ios' ? name_ios : name_android;

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
  showNotification(remoteMessage);
});

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token.token);
    console.log('TOKEN:', typeof(token.token));
    AsyncStorage.setItem('fcmToken', token.token)
  },

  onNotification: function (notification) {
    console.log('Notification from RN not firbas', notification);
    showNotification(notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },

  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  playSound: true,
  soundName: 'default',
  popInitialNotification: true,
  requestPermissions: true
  
});

AppRegistry.registerComponent(appName, () => App);
