import React from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SvgComponent from './assets/SvgComponent'
import TourismLogo from './assets/logo/TourismLogo.png'
import TourDCLogo from './assets/logo/TourDCLogo.png'
import loginBackground from './assets/background/login_background.png'
import styles from './styles'

import axios from 'axios';
import { StatusBar } from 'expo-status-bar';

//* TourDC
import Login from './Tabs/Login/Login';
import Register from './Tabs/Login/Register';
import Main from './Main.js';
import ForgotPassword from './Tabs/Login/ForgotPassword';



export default {
    //* GLOBALS
    STORE_KEY: 'a56z0fzrNpl^2',
    USER_ADDRESS: '0x1a620c351c07763f430897AeaA2883E37cA0aaCD',
    BASE_URL: 'http:/172.16.2.110:5500',
    COLOR: {
        DARKGRAY: '#999',
    },

    //* METAMASK
    PROJECT_ID: '8b6eb1cee75ca1dc62be65c01eef5cc7',
    WALLET_ID: 'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
    SvgComponent,

    //* ASSETS
    styles,
    TourismLogo,
    TourDCLogo,
    loginBackground,

    //* PACKAGES
    React,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    axios,
    useFonts,
    StatusBar,
    NavigationContainer,
    createStackNavigator,

    //* TOURDC
    Login,
    Register,
    Main,
    ForgotPassword
};

global.TextEncoder = require('text-encoding').TextEncoder;