import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Button, Modal } from 'react-native';
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
import { useWeb3Modal } from '@web3modal/wagmi-react-native'
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import GLOBAL from '../Custom/Globals.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import {
    useAccount,
    useDisconnect
} from "wagmi";
import * as web3 from '../../service/web3.js';
import ERC20With4RMechanism from '../../contracts/ERC20With4RMechanism-address.json';
import TourismContract from '../../contracts/Tourism-address.json';
import VoucherContract from '../../contracts/Voucher-address.json';

/* 
! Tourism Page
$ Contains information of a destination, hotel, restaurant, or activity
*/
const MainMyAccount = ({ navigation }) => {
    const { open, close } = useWeb3Modal()
    const { token, setToken } = useState('')
    const { address, isConnecting, isDisconnected } = useAccount()
    const { disconnect } = useDisconnect()
    const [SessionAD, setSessionAD] = useState('');
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    //! Load user address
    useEffect(() => {
        const loadData = async () => {
            try {
                setSessionAD(await AsyncStorage.getItem('SessionAD'));
            } catch (error) {
                console.log(error);
            }
        };

        loadData();
    }, []);

    const ViewAddress = async (address) => {
        if (address == undefined) return;

        const url = `https://sepolia.etherscan.io/address/${address}`
        await WebBrowser.openBrowserAsync(url);
    }


    //! Fetch user data from blockchain
    // 0": "Phong", "1": "Tran", "2": "11111111111111", "3": 15n, "4": 100n, "REP": 15n, "VP": 100n, "__length__": 5, "firstName": "Phong", "lastName": "Tran", "phoneNumber": "11111111111111"}
    useEffect(() => {
        const fetchUser = async () => {
            try {
                let response = await axios.post(`${GLOBAL.BASE_URL}/api/user/getCurrent`, { address: SessionAD });
                setUserData(response.data.user);
            }
            catch (error) {
                console.log(error);
            }
        };

        if (SessionAD != '') fetchUser();
    }, [SessionAD]);


    //! Components
    const UserHeaderInfo = () => {
        return (
            <View style={styles.UserHeader_Info}>

                <View style={styles.UserHeader_Inline}>
                    <Image
                        style={styles.UserHeader_Avatar}
                        source={{ uri: `${GLOBAL.BASE_URL}/api/user/getAvatar/${SessionAD}` }}
                    />

                    <View
                        style={styles.UserHeader_Text}
                    >
                        <Text style={styles.UserHeader_UserName}>{userData.firstName + " " + userData.lastName}</Text>
                        <Text style={styles.UserHeader_Phone}>{userData.phoneNumber}</Text>
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={styles.UserHeader_Verify}>
                                CONTRACT VERIFIED
                            </Text>
                        </TouchableOpacity>
                        {/* <Text style={styles.UserHeader_NumberPost}>
                            Voting Power: {Number(userData.VP)}
                        </Text> */}
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
                        <View
                        //style={styles.MyAccount_PreviousIcon}
                        >
                            <SvgComponent name={props.iconName} />
                        </View>

                        {/* Options Text */}
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.MyAccount_BtnTitle}>{props.Title}</Text>
                            <Text style={styles.MyAccount_BtnDescription}>{props.Description}</Text>
                        </View>

                        {/* Previous Icon */}
                        <View
                            style={styles.MyAccount_PreviousIcon}
                        >
                            {/* 
                            <SvgComponent name="PreviousBlue" />
                             */}
                        </View>
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

    const History = () => {
        navigation.navigate('TransactionHistory');
    }

    const ContractVerifiedNotification = () => {
        return (<Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalBigText}>
                        Contract Verified
                    </Text>

                    <Text style={styles.modalText}>
                        Your account has been verified by the TourDC contract
                    </Text>

                    <TouchableOpacity
                        style={styles.contractVerified_btnContainer}
                        onPress={() => ViewAddress(ERC20With4RMechanism.Token)}
                    >
                        <Text style={styles.contractVerified_btnText}>ERC20With4RMechanism</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.contractVerified_btnContainer}
                        onPress={() => ViewAddress(TourismContract.Token)}
                    >
                        <Text style={styles.contractVerified_btnText}>Tourism Contract</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.contractVerified_btnContainer}
                        onPress={() => ViewAddress(VoucherContract.Token)}
                    >
                        <Text style={styles.contractVerified_btnText}>Voucher Contract</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.tourismPage_checkInBtnContainer}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.tourismPage_checkInBtnText}>CLOSE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>)
    }

    return (
        <>
            <ContractVerifiedNotification />
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
                    Description1="View your transaction history"
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
                    <Text style={styles.MyAccount_LogoutButtonText}>LOGOUT</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={deleteAppData}
                    style={styles.MyAccount_BtnLogout}
                >
                    <Text style={styles.MyAccount_LogoutButtonText}>DELETE APPDATA</Text>
                </TouchableOpacity>
            </ScrollView >
        </>
    );
};


export default MainMyAccount;
