import { W3mButton, W3mConnectButton } from '@web3modal/wagmi-react-native'
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useSignMessage, useAccount } from 'wagmi'
import styles from '../../styles.js';
import { Text, View, ScrollView, Pressable, Image, TextInput, TouchableOpacity, Button, ImageBackground, SafeAreaView, Modal } from 'react-native';
import loginBackground from '../../assets/background/login_background.png';
import TourDCLogo from '../../assets/logo/TourDCLogo.png';
import TourismLogo from '../../assets/logo/TourismLogo.png';
import SvgComponent from '../../assets/SvgComponent';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

const GLOBAL = require('../Custom/Globals.js');

//! Components put outside for not being re-rendered
const LoginInputUI = ({ username, setUsername, password, setPassword }) => {
    return (
        <SafeAreaView>
            <Text style={styles.loginLabel}>Email/Mobile phone</Text>
            <StatusBar style="auto" />
            <View style={styles.loginInput}>
                <TextInput
                    style={styles.loginTextInput}
                    placeholder="Enter your mobile phone or email"
                    placeholderTextColor="#003f5c"
                    onChangeText={setUsername}
                    value={username}
                />
            </View>

            <Text style={styles.loginLabel}>Password</Text>
            <View style={styles.loginInput}>
                <TextInput
                    style={styles.loginTextInput}
                    placeholder="* * * * *"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                />
            </View>

        </SafeAreaView>
    )
}

const LoginNotify = ({ modalVisible, setBackupShareKey, backupShareKey }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                console.log("Modal has been closed.");
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                        This is the first time you login on this device, please enter the share key to continue
                    </Text>
                    <TextInput
                        style={styles.loginTextInput}
                        placeholder="Enter share key"
                        onChangeText={setBackupShareKey}
                        value={backupShareKey}
                    />
                </View>
            </View>
        </Modal>
    );
}

const Login = ({ navigation }) => {
    const [session, setSession] = useState(undefined)
    //* Normal Login
    const { address, isConnecting, isDisconnected } = useAccount()
    const [userAddress, setUserAddress] = useState(undefined);
    const [tourDCAddress, setTourDCAddress] = useState(undefined);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [encryptPrivateKey, setEncryptPrivateKey] = useState('');
    const [shareKey, setShareKey] = useState('');
    const [backupShareKey, setBackupShareKey] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [Wrong, setWrong] = useState(false);
    const [walletAddressStatus, setWalletAddressStatus] = useState([]);
    const [modalVisible, setModalVisible] = useState(true);

    console.log("-----------------Login-----------------");
    console.log("User Address: " + userAddress);
    console.log("TourDC Address: " + tourDCAddress);
    console.log("Wallet Address: " + address);
    console.log("Check Address: \n" + JSON.stringify(walletAddressStatus));
    console.log("Check Address: \n" + walletAddressStatus);

    //! Create session
    useEffect(() => {
        const createSession = async () => {
            try {
                const rawValue = JSON.stringify(session);
                var session = await AsyncStorage.getItem('session');

            } catch (error) {
                console.log(error);
            }
        };
        createSession();
    }, [session]);

    //! Get user address from storage
    useEffect(() => {
        const loadData = async () => {
            try {
                setUserAddress(await AsyncStorage.getItem('address'));
                console.log("Storage address: " + userAddress)
            } catch (error) {
                console.log(error);
            }
        };

        loadData();
    }, []);

    //! Store user address to storage 
    //! based on login method 
    useEffect(() => {
        const storeData = async (_userAddress) => {
            //* 
            try {
                await Promise.all([
                    AsyncStorage.setItem('address', _userAddress),
                ]);

                setSession({
                    userAddress: _userAddress,
                });

                console.log("Save address: " + _userAddress);
            } catch (error) {
                console.log(error);
            }
        };
        // Login with Wallet account
        if (address != undefined) {
            storeData(address);
            checkWalletAddress();
            return;
        }
        // Login with username and password
        if (tourDCAddress != undefined) {
            storeData(tourDCAddress);
            navigation.navigate('TourDC_Main');
            return;
        }
    }, [address, tourDCAddress]);

    //! Check wallet address
    //! If address is already registered, navigate to Main page
    //! If address is not registered, navigate to Register page
    const checkWalletAddress = async () => {
        try {
            const response = await axios.post(`${GLOBAL.BASE_URL}/api/user/checkAddress`, {
                address: userAddress
            });
            // Wallet address already registered,
            setWalletAddressStatus(response.data);
            console.log("Address found in Smart Contract");
            navigation.navigate('TourDC_Main');
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data.success === false) {
                console.log("Address not found in Smart Contract");
                // Wallet address not registered,
                navigation.navigate('TourDC_Register',
                    {
                        isWalletRegister: true
                    });


            }
            setWrong(true);
        }
    }

    //! TourDC Login
    const fetchLoginData = async () => {
        try {
            const response = await axios.post(`${GLOBAL.BASE_URL}/api/user/login`, {
                username: username,
                password: password
            });
            if (response.data === "Invalid credentials") {
                setWrong(true);
            }
            else {
                console.log("User login address: \n" + response.data.userData.wallet_address);

                setTourDCAddress(response.data.userData.wallet_address);
                setEncryptPrivateKey(response.data.userData.private_key_encrypted);
                setRefreshToken(response.data.userData.refreshToken);
                setShareKey(response.data.userData.share_key);
                return true;
            }
        } catch (error) {
            console.error(error);
            setWrong(true);
            return false;
        }
    }

    //! Disconnect
    useEffect(() => {
        if (isDisconnected) {
            console.log("Disconnected");
            setUserAddress(undefined);
            setTourDCAddress(undefined);
            setEncryptPrivateKey('');
        }
    }, [isDisconnected]);

    //! Navigation
    const Register = () => {
        navigation.navigate('TourDC_Register',
            {
                isWalletRegister: false
            });
    }

    const ForgotPassword = () => {
        navigation.navigate('TourDC_ForgotPassword');
    }

    //! Login Logic
    const loginLogic = async () => {
        //! get share 1
        let status = await fetchLoginData();
        if (status) {
            getOtherShareKey();
        }
    }

    //! Get other share key
    const getOtherShareKey = async () => {
        try {
            //! try to get share 2 
            const share2 = await AsyncStorage.getItem('share');

            //! if share 2 is null, Ask user to input share 3
            if (share2 == null) {
                setModalVisible(true);
            }
        } catch (error) {
        }
    }

    const CustomButton = ({ onPress, text, style }) => (
        <TouchableOpacity style={[style]} onPress={onPress}>
            {
                text === 'METAMASK' ?
                    <SvgComponent name="MetaMask" /> :
                    null
            }
            <Text style={styles.btnText}>{text}</Text>
        </TouchableOpacity>
    );

    return (
        <>
            <LoginNotify
                modalVisible={modalVisible}
                setBackupShareKey={setBackupShareKey}
                backupShareKey={backupShareKey}
            />
            <View style={styles.container}>
                <ImageBackground source={loginBackground} resizeMode="cover" style={styles.loginBackground}>

                    {/* Logo Section */}
                    <View style={styles.pinkOverlay} />
                    <View style={styles.loginLogoContainer}>
                        <Image
                            style={styles.tourismLogo}
                            source={TourismLogo}
                        />
                        <Image
                            style={styles.tourDCLogo}
                            source={TourDCLogo}
                        />
                    </View>

                    {/* Login Section */}
                    <View style={styles.loginBackgroundOverlay}>
                        <Text style={styles.loginBigText}>
                            Login/Register
                        </Text>

                        {Wrong && <Text style={{ color: "red" }}>
                            Wrong username or password
                        </Text>}

                        <LoginInputUI
                            username={username}
                            setUsername={setUsername}
                            password={password}
                            setPassword={setPassword}
                        />

                        <TouchableOpacity onPress={ForgotPassword}>
                            <Text style={styles.loginText}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>

                        <CustomButton
                            style={styles.loginBtn}
                            onPress={loginLogic}
                            text={'LOGIN'}
                        />

                        <CustomButton
                            style={styles.loginBtn}
                            onPress={Register}
                            text={'REGISTER'}
                        />

                        {/* Other method section */}
                        <Text style={styles.loginText}>  By registering, you agree to our Terms & Conditions and that you have read our Privacy Policy.</Text>
                        <Text style={styles.loginText}>_________Other method_________</Text>

                        <W3mConnectButton
                            style={styles.metaMaskBtn}
                            label={
                                <View style={styles.metaMaskView} >
                                    <SvgComponent name="MetaMask" />
                                    <Text style={styles.btnText}>Connect Wallet</Text>
                                </View>
                            }
                            testID="button-connect"
                        />
                    </View>
                </ImageBackground >
            </View >
        </>
    )
}

export default Login;