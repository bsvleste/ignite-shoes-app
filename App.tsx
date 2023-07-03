import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import OneSignal from 'react-native-onesignal';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Routes } from './src/routes';
import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';
import { CartContextProvider } from './src/contexts/CartContext';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';
import { useEffect } from 'react';
OneSignal.setAppId('04088d57-84cd-4395-8803-f739017d1218');

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate()
  useEffect(() => {
    const unsubscrible = OneSignal.setNotificationOpenedHandler((response) => {
      const { actionId } = response.action as any
      switch (actionId) {
        case '1':
          return console.log('Ver todas');
        case '2':
          return console.log('Ver pedido');
        default:
          return console.log('Não foi clicado em batão de ação');

      }
    })
    return () => unsubscrible
  }, [])
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>

    </NativeBaseProvider>
  );
}