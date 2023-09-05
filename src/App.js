import React, {useEffect, useState, useRef} from 'react';
import Toast from 'react-native-fast-toast';
import RootNavigator from './screens';
import {Provider} from 'react-redux';
import store from './store';
import {configure} from './config';
import {colors, fontFamilies, WP} from './services';
import {smallScreens} from './services/utilities/responsive';
import {ToastIcon} from './components';
import messaging from '@react-native-firebase/messaging';
import {showNotification} from './config/notification';
import CodePush from 'react-native-code-push';

let CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await configure();
      setLoading(false);
    })();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      showNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <Provider store={store}>
      <RootNavigator />
      <Toast
        style={{
          opacity: 0.94,
          margin: 0,
          flexWrap: 'wrap',
        }}
        dangerIcon={<ToastIcon error />}
        successIcon={<ToastIcon />}
        successColor={colors.skyBlue}
        dangerColor={colors.skyBlue}
        ref={(ref) => (global['toast'] = ref)}
        placement="top"
        textStyle={{
          fontFamily: fontFamilies('boldText'),
          textAlign: 'left',
          lineHeight: 20,
          fontSize: smallScreens ? 11 : 14,
          maxWidth: WP('80'),
        }}
      />
    </Provider>
  );
};

export default CodePush(CodePushOptions)(App);
