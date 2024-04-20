import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExploreTab from '../Explore/ExploreTab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SvgComponent from '../../assets/SvgComponent';
import styles from '../../styles.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScanQR from '../ScanQR';
import { MainExplore } from '../Explore/MainExplore';
import TourismPage from '../Explore/Card/TourismPage/TourismPage.js';
import MainMyAccount from '../MyAccount/MainMyAccount.js';
import ExchangeVoucher from '../MyAccount/ExchangeVoucher.js';
import MyProfile from '../MyAccount/MyProfile.js';
import Settings from '../MyAccount/Settings.js';
import HelpCentre from '../MyAccount/HelpCentre.js';
import TransactionHistory from '../MyAccount/TransactionHistory.js';

const Stack = createStackNavigator();

const MyAccount = ({ navigation }) => {
    return (
        // <NavigationContainer independent={false}>
        <Stack.Navigator initialRouteName="MainMyAccount" >

            <Stack.Screen name="MainMyAccount"
                component={MainMyAccount}
                options={{ headerShown: false }}
            />

            <Stack.Screen name="ExchangeVoucher"
                component={ExchangeVoucher}
                options={{ headerShown: false }}
            />

            <Stack.Screen name="MyProfile"
                component={MyProfile}
                options={{ headerShown: false }}
            />

            <Stack.Screen name="Settings"
                component={Settings}
                options={{ headerShown: false }}
            />

            <Stack.Screen name="HelpCentre"
                component={HelpCentre}
                options={{ headerShown: false }}
            />

            <Stack.Screen name="TransactionHistory"
                component={TransactionHistory}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
        // </NavigationContainer>
    )
}

export default MyAccount;