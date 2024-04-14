import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Button } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExploreTab from '../Explore/ExploreTab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SvgComponent from '../../assets/SvgComponent';
import styles from '../../styles.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExchangeVoucher from './ExchangeVoucher.js';
import { SearchBarHeader } from '../Explore/MainExplore.js';
import { Svg } from 'react-native-svg';
import MyVoucher from '../MyTrip/Tabs/MyVoucher.js';
import { useWeb3Modal } from '@web3modal/wagmi-react-native'
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import GLOBAL from '../Custom/Globals.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    useAccount,
    useDisconnect
} from "wagmi";
import * as web3 from '../../service/web3.js';

/* 
! Tourism Page
$ Contains information of a destination, hotel, restaurant, or activity
*/
const MainMyAccount = ({ navigation }) => {
    const { open, close } = useWeb3Modal()
    const { token, setToken } = useState('')
    const { address, isConnecting, isDisconnected } = useAccount()
    const { disconnect } = useDisconnect()
    const [userAddress, setUserAddress] = useState('');
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    //! Load user address
    useEffect(() => {
        const loadData = async () => {
            try {
                setUserAddress(await AsyncStorage.getItem('SessionAD'));
            } catch (error) {
                console.log(error);
            }
        };

        loadData();
    }, []);


    //! Fetch user data from blockchain
    // 0": "Phong", "1": "Tran", "2": "11111111111111", "3": 15n, "4": 100n, "REP": 15n, "VP": 100n, "__length__": 5, "firstName": "Phong", "lastName": "Tran", "phoneNumber": "11111111111111"}
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setUserData(await web3.getTouristInfor(userAddress));
            }
            catch (error) {
                console.log(error);
            }
        };

        if (userAddress != '') fetchUser();
    }, [userAddress]);


    //! Components
    const UserHeaderInfo = () => {
        return (
            <View style={styles.UserHeader_Info}>

                <View style={styles.UserHeader_Inline}>
                    <Image
                        style={styles.UserHeader_Avatar}
                        source={{ uri: `${GLOBAL.BASE_URL}/api/user/getAvatar/${userAddress}` }}
                    />

                    <View
                        style={styles.UserHeader_Text}
                    >
                        <Text style={styles.UserHeader_UserName}>{userData.firstName + " " + userData.lastName}</Text>
                        <Text style={styles.UserHeader_Phone}>{userData.phoneNumber}</Text>
                        <Text style={styles.UserHeader_Verify}>
                            Verify
                        </Text>
                        <Text style={styles.UserHeader_NumberPost}>
                            Voting Power: {userData.VP}
                        </Text>
                    </View>

                    <View>
                        <SvgComponent name="QRCode" style={styles.UserHeader_QRCode} />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => Profile()}
                    style={styles.UserHeader_ProfileButton}
                >
                    <Text style={styles.UserHeader_ProfileButtonText}>View My Profile</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const MyAccount_TourDCButton = () => {
        return (
            <TouchableOpacity onPress={() => open({ view: 'Networks' })}>
                <View style={styles.TourDC_Button}>
                    <Text style={styles.TourDC_ButtonText}>Be a part of TourDC member
                    </Text>
                    <SvgComponent name="PreviousWhite" />
                </View>
            </TouchableOpacity>
        );
    }

    const MyAccount_Button = (props) => {
        return (
            <TouchableOpacity
                onPress={props.onPress}
            >
                <View style={styles.MyAccount_Button}>
                    <View style={styles.MyAccount_Inline}>
                        {/* Options Icon */}
                        <SvgComponent name={props.iconName} />

                        {/* Options Text */}
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.MyAccount_BtnTitle}>{props.Title}</Text>
                            <Text style={styles.MyAccount_BtnDescription}>{props.Description}</Text>
                        </View>

                        {/* Previous Icon */}
                        <SvgComponent name="PreviousBlue" />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    const MyAccount_DoubleButton = (props) => {
        return (<View style={styles.MyAccount_DoubleButton}>
            <MyAccount_Button
                iconName={props.iconName1}
                Title={props.Title1}
                Description={props.Description1}
                onPress={props.Nav1}
            />
            <Separator />
            <MyAccount_Button
                iconName={props.iconName2}
                Title={props.Title2}
                Description={props.Description2}
                onPress={props.Nav2}
            />
        </View>)
    }

    const Separator = () => (
        (< Text style={{
            borderBottomWidth: 1,
            borderColor: '#D9D9D9',
            opacity: 1,
            height: 1,
            width: '100%',
        }
        }></Text >)
    )

    const cleanSessionData = async () => {
        try {
            await Promise.all([
                AsyncStorage.setItem('refreshToken', ''),
                AsyncStorage.setItem('SessionAD', ''),
                AsyncStorage.setItem('SessionRK', ''),
            ]);
            console.log("User Data removed");
        } catch (error) {
            console.log(error);
        }
    };

    const deleteAppData = async () => {
        try {
            await AsyncStorage.clear();
            console.log("App Data removed");
        } catch (error) {
            console.log(error);
        }
    }



    //! Navigation
    const Logout = () => {
        // navigation.navigate('Login', { screen: 'TourDC_Login' });
        navigation.navigate('TourDC_Login');
        cleanSessionData();
        if (isConnecting) {
            close();
            open()
        }
    }

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
        <ScrollView style={styles.MyAccount_Container}>
            <SearchBarHeader />
            <UserHeaderInfo />

            <MyAccount_TourDCButton />

            <MyAccount_DoubleButton
                iconName1="Settings"
                Title1="Settings"
                Description1="View and set your account preference"
                Nav1={() => Settings()}

                iconName2="Help"
                Title2="Help Centre"
                Description2="Find the best answer to your questions"
                Nav2={() => open({ view: 'WhatIsAWallet' })}
            />

            <Text>My Rewards</Text>

            <MyAccount_DoubleButton
                iconName1="History"
                Title1="Transaction History"
                Description1="Trade points for coupons and learn how to earn more!"
                Nav1={() => History()}

                iconName2="Voucher"
                Title2="Exchange Vouchers"
                Description2="View vouchers that you can use now"
                Nav2={() => ExchangeVoucher()}
            />

            <TouchableOpacity
                onPress={() => Logout()}
                style={styles.MyAccount_BtnLogout}
            >
                <Text style={styles.MyAccount_LogoutButtonText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={deleteAppData}
                style={styles.MyAccount_BtnLogout}
            >
                <Text style={styles.MyAccount_LogoutButtonText}>DELETE APPDATA</Text>
            </TouchableOpacity>
        </ScrollView >
    );
};


export default MainMyAccount;
