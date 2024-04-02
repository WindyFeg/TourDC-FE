import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, Image, TextInput, TouchableOpacity, Button, ImageBackground, SafeAreaView } from 'react-native';
import BackNavigationButton from '../Custom/BackNavigationButton';
import styles from '../../styles.js';
import { StatusBar } from 'expo-status-bar';
import loginBackground from '../../assets/background/login_background.png';
import * as ImagePicker from "expo-image-picker";
import UploadImage from '../Custom/UploadImage.js';

//! Components put outside for not being re-rendered
const RegisterInputUI = ({ label,
    placeholder,
    text,
    setText,
    isPassword,
    keyboardType }) => {
    return (
        <SafeAreaView>
            <Text style={styles.loginLabel}>{label}</Text>
            <StatusBar style="auto" />
            <View style={styles.loginInput}>
                <TextInput
                    style={styles.loginTextInput}
                    placeholder={placeholder}
                    placeholderTextColor="#003f5c"
                    secureTextEntry={isPassword}
                    onChangeText={setText}
                    value={text}
                    keyboardType={keyboardType}
                />
            </View>
        </SafeAreaView>
    )
}

const Register = ({ navigation }) => {

    //! State for Register from user
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [age, setAge] = useState('');
    const [avt, setAvt] = useState('');
    const [avtSource, setAvtSource] = useState('');

    const [walletAddress, setWalletAddress] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [errorText, setErrorText] = useState(null);

    const checkPasswords = () => {
        if (password !== confirmPassword) {
            setErrorText('Passwords do not match');
        } else {
            setErrorText(null);
        }
    };

    useEffect(() => {
        checkPasswords();
    }, [password, confirmPassword]);

    return (
        <View styles={styles.registerContainer}>
            <View style={styles.registerHeader}>
            </View>
            <BackNavigationButton
                navigation={navigation}
            />
            <ImageBackground source={loginBackground} resizeMode="cover" style={styles.registerBackground}>

                <View style={styles.registerBackgroundOverlay}>
                    <Text style={styles.loginBigText}>
                        Register
                    </Text>

                    <RegisterInputUI
                        label={'Username'}
                        placeholder={'Enter your username'}
                        text={username}
                        setText={setUsername}
                        isPassword={false}
                        keyboardType={'default'}
                    />
                    <RegisterInputUI
                        label={'Password'}
                        placeholder={'Enter your username'}
                        text={password}
                        setText={setPassword}
                        isPassword={true}
                        keyboardType={'default'}
                    />
                    <RegisterInputUI
                        label={'Confirm Password'}
                        placeholder={'Enter your username'}
                        text={confirmPassword}
                        setText={setConfirmPassword}
                        isPassword={true}
                        keyboardType={'default'}
                    />
                    <RegisterInputUI
                        label={'Phone Number'}
                        placeholder={'Enter your username'}
                        text={phoneNumber}
                        setText={setPhoneNumber}
                        isPassword={false}
                        keyboardType={'numeric'}
                    />
                    <RegisterInputUI
                        label={'Age'}
                        placeholder={'Enter your username'}
                        text={age}
                        setText={setAge}
                        isPassword={false}
                        keyboardType={'numeric'}
                    />

                    <UploadImage
                        setFiles={setAvt}
                        setSource={setAvtSource}
                    />

                    {
                        errorText && <Text style={styles.CreateReview_errorText}>
                            {errorText}
                        </Text>
                    }

                </View>
            </ImageBackground>
        </View>
    )
}

export default Register;