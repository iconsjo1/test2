import PushNotification, {Importance} from 'react-native-push-notification';
import {images} from '../services';

export const showNotification = (remoteMessage) => {
  console.log('Android SHOW NOTIFICATIOn', remoteMessage);

  PushNotification.localNotification({
    title: remoteMessage.data.title,
    body: remoteMessage.data.body,
    channelId: 'appointments-channel',
    priority: Importance.HIGH,
    playSound: true,
    soundName: 'default',
    smallIcon: 'ic_launcher',
  });
};
