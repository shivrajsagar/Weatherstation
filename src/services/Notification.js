import React from 'react';
import PushNotification, {Importance} from 'react-native-push-notification';

export default data => {
  PushNotification.createChannel(
    {
      channelId: '12345',
      channelName: 'My channel',
      channelDescription: 'A channel to categorise your notifications',
      playSound: true,
      soundName: 'notification.mp3',
      importance: Importance.HIGH,
      vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`),
  );
  PushNotification.localNotification({
    channelId: '12345',
    id: 0,
    title: data.title,
    message: data.message,
    playSound: true,
    soundName: 'notification.mp3',
  });
};
