import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Button } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExploreTab from '../Explore/ExploreTab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SvgComponent from '../../assets/SvgComponent';
import styles from '../../styles.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExchangeVoucher from './ExchangeVoucher.js';


/* 
! Tourism Page
$ Contains information of a destination, hotel, restaurant, or activity
*/
const MainMyAccount = ({ navigation }) => {

    const Profile = () => {
        navigation.navigate('MyProfile');
    }

    const ExchangeVoucher = () => {
        navigation.navigate('ExchangeVoucher');
    }
    const Settings = () => {
        navigation.navigate('Settings');
    }

    const HelpCentre = () => {
        navigation.navigate('HelpCentre');
    }

    const MyPoint = () => {
        navigation.navigate('Point');
    }


    return (
        <View>
            <Button title="View My Profile"
                onPress={() => Profile()}>
            </Button>

            <TouchableOpacity style={styles.loginBtn} >
                <Text style={styles.loginText}>Be Part of TourDC member</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={() => Settings()}>
                <Text style={styles.loginText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={() => HelpCentre()}>
                <Text style={styles.loginText}>Help Centre?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={() => MyPoint()}>
                <Text style={styles.loginText}>Points</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={() => ExchangeVoucher()} >
                <Text style={styles.loginText}>Exchange Voucher</Text>
            </TouchableOpacity>
        </View >
    );
};


export default MainMyAccount;
