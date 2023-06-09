import { useState, useEffect } from 'react'
import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';
import { Notification } from '../components/Notification';

export function Routes() {
  const { colors } = useTheme();
  const [notification, setNotification] = useState<OSNotification>()
  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];
  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler((
      notificationReceivedEvent: NotificationReceivedEvent
    ) => {
      const response = notificationReceivedEvent.getNotification()
      setNotification(response) // see the payload sent from your server
    })
    return () => unsubscribe
  }, [])
  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />
      {
        notification?.title &&
        <Notification data={notification} onClose={() => setNotification(undefined)} />
      }
    </NavigationContainer>
  );
}