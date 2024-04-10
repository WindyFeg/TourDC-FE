// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Tabs/Login/Login.js';
import Register from './Tabs/Login/Register.tsx';
import Main from './Main.js';
import ForgotPassword from './Tabs/Login/ForgotPassword.js';
import { useFonts } from 'expo-font';
import './Tabs/Custom/Globals.js';

import '@walletconnect/react-native-compat'
import { WagmiConfig } from 'wagmi'
import { mainnet, polygon, arbitrum, sepolia } from 'viem/chains'
import { createWeb3Modal, defaultWagmiConfig, Web3Modal } from '@web3modal/wagmi-react-native'
import {vibiChain} from './defineChain.tsx'
import { useConnect } from 'wagmi'
// import { injected } from 'wagmi/connectors'
// import { useNetwork, useSwitchNetwork } from 'wagmi'
// import { createPublicClient, http } from 'viem'
// import { fantom } from 'viem/chains'
 
// const vibiChain = createPublicClient({ 
//   chain: fantom, 
//   transport: http('https://vibi.vbchain.vn/​') 
// }) 

// import {autoCheckIn, autoRegister, } from './service/signmessage.js'
// autoCheckIn('2dc232208048ff7f', '65f2c7e1f60b126cb2487527')
// console.log('txhash:', faucet('0x22bAD70a7882c5094aacCCdD941df1430AD00f59'))
// console.log('registerHash:', autoRegister('0xbc729936a880a977542856f7e3cda104062cb2627ece05937e05b8f8dc579f21','David','2','23123123'))
// faucet('0x22bAD70a7882c5094aacCCdD941df1430AD00f59')


const projectId = '8b6eb1cee75ca1dc62be65c01eef5cc7'

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


const chains = [vibiChain]

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
  // enableAnalytics: true // Optional - defaults to your Cloud configuration
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
  // const { chain } = useNetwork()
  // const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  if (!loaded) {
    return null;
  }
  // 
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
            options={{ headerShown: false }}
          
          />

          <Stack.Screen
            name="TourDC_ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}  
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
