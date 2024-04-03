import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, Image, TextInput, TouchableOpacity, Button, ImageBackground, SafeAreaView } from 'react-native';
import BackNavigationButton from '../Custom/BackNavigationButton';
import styles from '../../styles.js';
import { StatusBar } from 'expo-status-bar';
import loginBackground from '../../assets/background/login_background.png';
import * as ImagePicker from "expo-image-picker";
import UploadImage from '../Custom/UploadImage.js';
import axios from 'axios';
/// addition
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import Tourism_abi from "../../contracts/Tourism.json"
import Tourism_address from "../../contracts/Tourism-address.json" 

const FormData = require('form-data');
const GLOBAL = require('../Custom/Globals.js');

//! Components put outside for not being re-rendered
const RegisterInputUI = ({ label,
    placeholder,
    text,
    setText,
    isPassword,
    keyboardType }) => {

    const { config } = usePrepareContractWrite({
      address: Tourism_address.Token as `0x${string}`,
      abi: Tourism_abi.abi,
      functionName: 'register',
      args: ['firstName', 'lastName', 'phoneNumber'], // [placeID]
      account: '0x...addressFromWallet...', // current address
      chainId: 306,
    })

    const { data: registerData,
      error: registerError, 
      isError: isErrorRegister, 
      isLoading: isLoadingRegister , 
      isSuccess: isSuccessRegister, 
      write: register } = useContractWrite(config)

    
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
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [avt, setAvt] = useState('');
    const [avtSource, setAvtSource] = useState('');

    const [walletAddress, setWalletAddress] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [errorText, setErrorText] = useState(null);
    const [successText, setSuccessText] = useState(null);

    //! Check if passwords match
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

    //! Register
    function getImageType(filename) {
        const extension = filename.split('.').pop().toLowerCase();
        switch (extension) {
            case 'png': return 'image/png';
            case 'jpg': return 'image/jpeg';
            case 'jpeg': return 'image/jpeg';
            case 'gif': return 'image/gif';
            case 'bmp': return 'image/bmp';
            case 'pdf': return 'application/pdf';

            default: return 'application/octet-stream';
        }
    }


    const fetchRegisterData = async () => {
        if (errorText) {
            return;
        }

        console.log(avtSource);
        const filename = avtSource.uri.split('/').pop();
        const imageType = getImageType(filename);
        console.log(filename);
        console.log(imageType);

        const registerForm = new FormData();
        registerForm.append('username', username);
        registerForm.append('password', password);
        registerForm.append('phoneNumber', phoneNumber);
        registerForm.append('age', age);
        registerForm.append('name', name);
        registerForm.append('role', "user");
        registerForm.append('file', {
            uri: avtSource.uri,
            type: imageType,
            name: filename,
        });

        console.log(registerForm);

        try {
            const response = await axios.post(`${GLOBAL.BASE_URL}/api/user/register`,
                registerForm,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    transformRequest: (data, headers) => {
                        return data;
                    },
                },
            );
            // console.log(response.data);
            setSuccessText('Register successfully');
            setErrorText(null);
            navigation.navigate('TourDC_Login');
        }
        catch (error) {
            console.error(error);
            setErrorText('Username already exists');
            setSuccessText(null);
        }
    }

    const CustomButton = ({ onPress, text, style }) => (
        <TouchableOpacity style={[style]} onPress={onPress}>
            <Text style={styles.btnText}>{text}</Text>
        </TouchableOpacity>
    );

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
                        placeholder={'* * *'}
                        text={password}
                        setText={setPassword}
                        isPassword={true}
                        keyboardType={'default'}
                    />
                    <RegisterInputUI
                        label={'Confirm Password'}
                        placeholder={'* * *'}
                        text={confirmPassword}
                        setText={setConfirmPassword}
                        isPassword={true}
                        keyboardType={'default'}
                    />
                    <RegisterInputUI
                        label={'Full Name'}
                        placeholder={'Full Name'}
                        text={name}
                        setText={setName}
                        isPassword={false}
                        keyboardType={'default'}
                    />
                    <RegisterInputUI
                        label={'Phone Number'}
                        placeholder={'84+'}
                        text={phoneNumber}
                        setText={setPhoneNumber}
                        isPassword={false}
                        keyboardType={'numeric'}
                    />
                    <RegisterInputUI
                        label={'Age'}
                        placeholder={'Age'}
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

                    {
                        successText && <Text style={styles.CreateReview_successText}>
                            {successText}
                        </Text>
                    }
                    <CustomButton
                        style={styles.loginBtn}
                        onPress={fetchRegisterData}
                        text={'REGISTER'}
                    />

                </View>
            </ImageBackground>
        </View>
    )
}

export default Register;