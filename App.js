// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Tabs/Login/Login';
import Register from './Tabs/Login/Register';
import Main from './Main.js';
import ForgotPassword from './Tabs/Login/ForgotPassword';
import { useFonts } from 'expo-font';
import './Tabs/Custom/Globals.js';
import { PROJECT_ID, WALLET_ID } from './Globals.js';

import '@walletconnect/react-native-compat'
import { WagmiConfig } from 'wagmi'
import { mainnet, polygon, arbitrum } from 'viem/chains'
import { createWeb3Modal, defaultWagmiConfig, Web3Modal } from '@web3modal/wagmi-react-native'
import Vibichain from './defineChain.js';
const projectId = PROJECT_ID

const metadata = {
  name: 'TourDC',
  description: 'TourDC Connect Wallet',
  url: 'https://tourdc.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com'
  }
}

const chains = [mainnet, polygon, arbitrum]

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

const Stack = createStackNavigator();

export default function App() {

  const [loaded] = useFonts({
    InterM: require('./assets/fonts/Inter/Inter-Medium.ttf'),
    InterR: require('./assets/fonts/Inter/Inter-Regular.ttf'),
    InterB: require('./assets/fonts/Inter/Inter-Bold.ttf'),
    InterSB: require('./assets/fonts/Inter/Inter-SemiBold.ttf'),
    InterL: require('./assets/fonts/Inter/Inter-Light.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <WagmiConfig config={wagmiConfig}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">

          <Stack.Screen
            name="TourDC_Login"
            component={Login}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="TourDC_Register"
            component={Register}
          />

          <Stack.Screen
            name="TourDC_ForgotPassword"
            component={ForgotPassword}
          />

          <Stack.Screen
            name="TourDC_Main"
            component={Main}
            options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </NavigationContainer>
      <Web3Modal />
    </WagmiConfig>

  );
}