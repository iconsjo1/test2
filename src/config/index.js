import {
  language,
  i18n,
  baseUrl,
  themeName,
  setColors,
  themeReducersTypes,
  fontFamilies,
  lineHeights,
} from '../services';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import PushNotification, {Importance} from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

import store from '../store';
import {environment} from '../services/apis/environment';
import I18n from 'react-native-i18n';
import {Platform} from 'react-native';
import {setFcmToken} from '../store/actions/auth/registerAction';

const {SET_THEME} = themeReducersTypes;

export const configure = async () => {
  const lang = await AsyncStorage.getItem(language);
  if (lang) await i18n.config(lang);
  else {
    locale = I18n.currentLocale();
    console.log('[CURRENT LOCALE]', locale);
    if (String(locale).includes('ar')) {
      await AsyncStorage.setItem(language, 'ar');
      await i18n.config('ar');
    } else {
      await AsyncStorage.setItem(language, 'en');
      await i18n.config('en');
    }
  }
  const theme = await AsyncStorage.getItem(themeName);
  if (theme) {
    setColors(theme);
    await store.dispatch({
      type: SET_THEME,
      payload: theme,
    });
  }
 
  if (Platform.OS === 'android') {
    PushNotification.createChannel({
      channelId: 'appointments-channel', // (required)
      channelName: 'Appointments Channel', // (required)
      channelDescription: 'appointments channel for android',
      playSound: true,
      soundName: 'default',
      importance: Importance.HIGH,
      vibrate: true,
    });
  }

  axios.defaults.baseURL = environment.apiUrl;
  axios.defaults.headers['Content-Type'] = 'application/json';

  await messaging().requestPermission();
  const token = await messaging().getToken();
  store.dispatch(setFcmToken(token));
  AsyncStorage.setItem('fcmToken', token);
  console.log('fcmToken',token);
};
