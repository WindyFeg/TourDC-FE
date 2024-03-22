import '@walletconnect/react-native-compat';
import { WagmiConfig } from 'wagmi';
import { mainnet } from 'viem/chains';
import {
    W3mButton,
    useWeb3Modal,
    createWeb3Modal,
    defaultWagmiConfig,
    Web3Modal
} from '@web3modal/wagmi-react-native'
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import styles from '../../styles.js';
import { Text, View, Image, TextInput, TouchableOpacity, Button, ImageBackground } from 'react-native';
import loginBackground from '../../assets/background/login_background.png';
import TourDCLogo from '../../assets/logo/TourDCLogo.png';
import TourismLogo from '../../assets/logo/TourismLogo.png';
import axios from 'axios';

const Login = ({ navigation }) => {
    //* WalletConnect
    // const { open, close } = useWeb3Modal()
    const providerMetadata = {
        name: 'TourDC',
        icons: ['https://avatars.githubusercontent.com/u/37784886'],
        redirect: {
            // native: 'localhost://'
        }
    };

    // open()

    const wagmiConfig = defaultWagmiConfig({
        chains: [mainnet],
        projectId: '8b6eb1cee75ca1dc62be65c01eef5cc7',
        providerMetadata
    })
    createWeb3Modal({
        projectId: '8b6eb1cee75ca1dc62be65c01eef5cc7',
        chains: [mainnet],
        wagmiConfig: wagmiConfig,
        enableAnalytics: true
    })

    //* Normal Login

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [Wrong, setWrong] = useState(false);



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
                <View style={styles.loginInput}>
                    <TextInput
                        style={styles.loginTextInput}
                        placeholder="Enter your mobile phone or email"
                        placeholderTextColor="#003f5c"
                        onChangeText={(username) => setUsername(username)}
                    />
                </View>

                <Text style={styles.loginLabel}>Password</Text>
                <View style={styles.loginInput}>
                    <TextInput
                        style={styles.loginTextInput}
                        placeholder="* * * * *"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>

            </View>
        )
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
        <WagmiConfig config={wagmiConfig}>

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

                        <LoginInputUI />

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

                        {/* <CustomButton
                            style={styles.metaMaskBtn}
                            // onPress={handleButtonPress}
                            text={'METAMASK'}
                        /> */}

                        <W3mButton />
                    </View>

                </ImageBackground >
            </View >

            <Web3Modal />
        </WagmiConfig>
    )
}

export default Login;