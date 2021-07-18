import React, {useEffect, useState} from 'react';
import {Alert, PushNotificationIOS, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import messaging from '@react-native-firebase/messaging';

import PushNotification, {Importance} from 'react-native-push-notification';

//redux
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import createStore from './redux';

import {useSelector} from 'react-redux';

const {store, persistor} = createStore();

const App = () => {
  const showNotification = data => {
    PushNotification.localNotification({
      channelId: '12345',
      id: 0,
      title: data.notification.title,
      message: data.notification.body,
      playSound: true,
      soundName: 'notification.mp3',
      smallIcon: 'ic_notification',
    });
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async data => {
      //Alert.alert('A new FCM message arrived!', JSON.stringify(data));
      showNotification(data);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    requestUserPermission();
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <StatusBar barStyle="default" backgroundColor="red" />
          <AppNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
