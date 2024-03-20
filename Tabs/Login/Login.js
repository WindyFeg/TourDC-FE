import React, { useState } from 'react';
import { PROJECT_ID, WALLET_ID } from '../../Globals.js';
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import {
    SvgComponent,
    styles,
    TourDCLogo,
    TourismLogo,
    loginBackground,
    StatusBar
} from '../../Globals.js';
import {
    WalletConnectModal,
    useWalletConnectModal,
} from '@walletconnect/modal-react-native';



const Login = ({ navigation }) => {
    //* WalletConnect
    const providerMetadata = {
        name: 'TourDC',
    };
    const { open, isConnected, address, provider } = useWalletConnectModal();

    //* Normal Login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [Wrong, setWrong] = useState(false);

    const handleButtonPress = async () => {
        if (isConnected) {
            return provider?.disconnect();
        }
        return open();
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

                    <CustomButton
                        style={styles.metaMaskBtn}
                        onPress={handleButtonPress}
                        text={'METAMASK'}
                    />

                    <WalletConnectModal
                        explorerRecommendedWalletIds={[WALLET_ID]}
                        explorerExcludedWalletIds={'ALL'}
                        projectId={PROJECT_ID}
                        providerMetadata={providerMetadata}
                    />
                </View>

            </ImageBackground >
        </View >
    )
}

export default Login;