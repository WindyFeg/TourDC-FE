import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import styles from '../../styles.js';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

const Login = ({ navigation }) => {
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

    return (
        <View style={styles.container}>

            <Text>Login/Register</Text>

            <Text>Email/Mobile phone</Text>
            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Tên đăng nhập"
                    placeholderTextColor="#003f5c"
                    onChangeText={(username) => setUsername(username)}
                />
            </View>

            <Text>Password</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Mật Khẩu"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <TouchableOpacity onPress={() => ForgotPassword()}>
                <Text>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={() => Authentication()}>
                <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={() => Register()}>
                <Text style={styles.loginText}>REGISTER</Text>
            </TouchableOpacity>

            <Text>  By registering, you agree to our Terms & Conditions and that you have read our Privacy Policy.</Text>
            <Text>_________Other_Method_________</Text>

            <TouchableOpacity style={styles.loginBtn} onPress={() => MetaMask()}>
                <Text >METAMASK</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Login;