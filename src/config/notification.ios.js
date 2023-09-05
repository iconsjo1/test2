import PushNotificationIOS from '@react-native-community/push-notification-ios';

export const showNotification = (remoteMessage) => {
  console.log('IOS SHOW NOTIFICATIOn', remoteMessage);
  PushNotificationIOS.addNotificationRequest({
    id: remoteMessage.messageId,
    title: remoteMessage.data.title,
    body: remoteMessage.data.body,
  });
};
