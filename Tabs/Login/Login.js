import { W3mButton, W3mConnectButton } from '@web3modal/wagmi-react-native'
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useSignMessage, useAccount } from 'wagmi'
import styles from '../../styles.js';
import { Text, View, Pressable, Image, TextInput, TouchableOpacity, Button, ImageBackground, SafeAreaView } from 'react-native';
import loginBackground from '../../assets/background/login_background.png';
import TourDCLogo from '../../assets/logo/TourDCLogo.png';
import TourismLogo from '../../assets/logo/TourismLogo.png';
import SvgComponent from '../../assets/SvgComponent';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const Login = ({ navigation }) => {
    //* Normal Login
    const { address, isConnecting, isDisconnected } = useAccount()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [Wrong, setWrong] = useState(false);

    useEffect(() => {
        const storeData = async () => {
            let _userAddress = userAddress ? userAddress : address;
            let _refreshToken = refreshToken ? refreshToken : null;
            try {
                await Promise.all([
                    AsyncStorage.setItem('address', _userAddress),
                    AsyncStorage.setItem('refreshToken', _refreshToken),
                    AsyncStorage.setItem('privateKey', privateKey)
                ]);
                console.log("Save address: " + userAddress);
            } catch (error) {
                console.log(error);
            }
        };

        storeData();
        navigation.navigate('TourDC_Main');
    }, [address, userAddress]);

    useEffect(() => {
        if (isDisconnected) {
            console.log("Disconnected");
        }
    }, [isDisconnected]);

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

                setUserAddress(response.data.userData.wallet_address);
                setPrivateKey(response.data.userData.private_key);
                setRefreshToken(response.data.userData.refreshToken);
                navigation.navigate('TourDC_Main');
            }
        } catch (error) {
            console.error(error);
            setWrong(true);
        }
    }

    const Authentication = () => {
        fetchLoginData();
    }

    const Register = () => {
        navigation.navigate('TourDC_Register');
    }

    const ForgotPassword = () => {
        navigation.navigate('TourDC_ForgotPassword');
    }

    const MetaMask = () => {
        navigation.navigate('TourDC_Main');
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
                        onPress={Authentication}
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
                                <Text style={styles.btnText}>METAMASK</Text>
                            </View>
                        }
                        testID="button-connect"
                    />
                </View>

            </ImageBackground >
        </View >


    )
}

export default Login;