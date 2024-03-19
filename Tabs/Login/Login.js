import "node-libs-expo/globals";
import "react-native-url-polyfill/auto";
import "react-native-get-random-values";

// import text encoding
import 'text-encoding';

import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import styles from '../../styles.js';
import { Text, View, Image, TextInput, TouchableOpacity, Button, ImageBackground } from 'react-native';
import loginBackground from '../../assets/background/login_background.png';
import TourDCLogo from '../../assets/logo/TourDCLogo.png';
import TourismLogo from '../../assets/logo/TourismLogo.png';
import axios from 'axios';
import { useSDK } from "@metamask/sdk-react";
// import MetaMaskSDK from '@metamask/sdk';
// import { Linking } from 'react-native';
// import BackgroundTimer from 'react-native-background-timer';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [Wrong, setWrong] = useState(false);
    const { connect, disconnect, account, chainId, ethereum } = useSDK();

    const connectWallet = async () => {
        try {
            await connect();
        } catch (error) {
            console.error("Failed to connect wallet:", error);
        }
    };

    useEffect(() => {
        // Use the 'account' and 'chainId' returned by 'useSDK'
        if (account && chainId) {
            // Handle account and network changes
        }
    }, [account, chainId]);

    const disconnectWallet = async () => {
        await disconnect();
    };

    const Authentication = () => {
        navigation.navigate('TourDC_Main');
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

    const LoginInputUI = () => {
        return (
            <View>
                <Text style={styles.loginLabel}>Email/Mobile phone</Text>
                <StatusBar style="auto" />
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Tên đăng nhập"
                        placeholderTextColor="#003f5c"
                        onChangeText={(username) => setUsername(username)}
                    />
                </View>

                <Text style={styles.loginLabel}>Password</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Mật Khẩu"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>

            </View>
        )
    }

    const CustomButton = ({ onPress, children, style }) => (
        <TouchableOpacity style={[styles.loginBtn, style]} onPress={onPress}>
            <Text style={styles.loginText}>{children}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ImageBackground source={loginBackground} resizeMode="cover" style={styles.loginBackground}>
                {/* import image */}

                <View style={styles.pinkOverlay}>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={styles.tourismLogo}
                        source={TourismLogo}
                    />

                    <Image
                        style={styles.tourDCLogo}
                        source={TourDCLogo}
                    />
                </View>

                <View style={styles.loginBackgroundOverlay}>
                    <Text style={{
                        color: 'rgba(0, 0, 0, 0.70)',
                        // fontFamily: 'Inter',
                        fontSize: 18,
                        fontStyle: 'normal',
                        fontWeight: '400',
                        lineHeight: 22,
                    }}>
                        Login/Register
                    </Text>

                    <LoginInputUI />

                    <CustomButton onPress={ForgotPassword}>
                        Forgot Password?
                    </CustomButton>

                    <CustomButton style={styles.loginBtn} onPress={Authentication}>
                        LOGIN
                    </CustomButton>

                    <CustomButton style={styles.registerBtn} onPress={Register}>
                        REGISTER
                    </CustomButton>

                    <Text>  By registering, you agree to our Terms & Conditions and that you have read our Privacy Policy.</Text>
                    <Text>_________Other_Method_________</Text>

                    <CustomButton style={styles.loginBtn} onPress={connectWallet}>
                        MetaMask
                    </CustomButton>
                </View>

            </ImageBackground>
        </View>
    )
}

export default Login;