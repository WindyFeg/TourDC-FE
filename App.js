// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, ScrollView, TextInput, SafeAreaView } from 'react-native'; // Import SafeAreaView
import styles from './styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Tabs/Login/Login';
import Register from './Tabs/Login/Register';
import Main from './Main.js';
import ForgotPassword from './Tabs/Login/ForgotPassword';
import { useFonts } from 'expo-font';

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
  );
}