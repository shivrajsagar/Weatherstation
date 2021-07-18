import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import messaging from '@react-native-firebase/messaging';

//redux
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import createStore from './redux';

import PushNotificationIOS from '@react-native-community/push-notification-ios';

const {store, persistor} = createStore();

const App = () => {
  const [permissions, setPermissions] = useState({});

  const setNotificationCategories = () => {
    PushNotificationIOS.setNotificationCategories([
      {
        id: 'userAction',
        actions: [
          {id: 'open', title: 'Open', options: {foreground: true}},
          {
            id: 'ignore',
            title: 'Desruptive',
            options: {foreground: true, destructive: true},
          },
          {
            id: 'text',
            title: 'Text Input',
            options: {foreground: true},
            textInput: {buttonTitle: 'Send'},
          },
        ],
      },
    ]);
  };

  PushNotificationIOS.addNotificationRequest({
    id: 'notificationWithSound',
    title: 'Sample Title',
    subtitle: 'Sample Subtitle',
    body: 'Sample local notification with custom sound',
    sound: 'customSound.wav',
    badge: 1,
  });
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const details = {
    alertBody: 'This is the body',
    alertTitle: 'this is the title',
    applicationIconBadgeNumber: 2,
  };

  useEffect(() => {
    PushNotificationIOS.addEventListener('notification', onRemoteNotification);
    
    setNotificationCategories();

    bootstrap();
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

  async function bootstrap() {
    await inAppMessaging().setMessagesDisplaySuppressed(true);
  }

  const onRemoteNotification = notification => {
    const isClicked = notification.getData().userInteraction === 1;

    if (isClicked) {
      // Navigate user to another screen
    } else {
      // Do something else with push notification
    }
  };

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
