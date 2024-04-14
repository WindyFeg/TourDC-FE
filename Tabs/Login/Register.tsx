import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Pressable,
    Image,
    TextInput,
    TouchableOpacity,
    Button,
    ImageBackground,
    ActivityIndicator,
    SafeAreaView,
    Modal,
    ScrollView
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import BackNavigationButton from '../Custom/BackNavigationButton.js';
import styles from '../../styles.js';
import { StatusBar } from 'expo-status-bar';
import loginBackground from '../../assets/background/login_background.png';
import * as ImagePicker from "expo-image-picker";
import UploadImage from '../Custom/UploadImage.js';
import axios from 'axios';
/// addition
import shamir from '../../service/shamir.js';
import aes from '../../service/aes.js';
import {
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
} from "wagmi";
import Tourism_abi from "../../contracts/Tourism.json"
import Tourism_address from "../../contracts/Tourism-address.json"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAccount, HelloWorld } from '../../service/create_account.js';
import { err } from 'react-native-svg/lib/typescript/xml.js';
import { autoRegister } from '../../service/signmessage.js'
import * as WebBrowser from 'expo-web-browser';
import { render } from 'react-native-web';

const FormData = require('form-data');
const GLOBAL = require('../Custom/Globals.js');

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

const NameInputUI = ({ label,
    placeholder,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    isPassword,
    keyboardType }) => {
    return (
        <SafeAreaView>
            <Text style={styles.loginLabel}>{label}</Text>
            <StatusBar style="auto" />
            <View style={styles.loginInput}>
                <View>
                    <TextInput
                        style={styles.nameTextInput}
                        placeholder={'First'}
                        placeholderTextColor="#003f5c"
                        secureTextEntry={isPassword}
                        onChangeText={setFirstName}
                        value={firstName}
                        keyboardType={keyboardType}
                    />
                </View>
                <View >
                    <TextInput
                        style={styles.nameTextInput}
                        placeholder={'Last'}
                        placeholderTextColor="#003f5c"
                        secureTextEntry={isPassword}
                        onChangeText={setLastName}
                        value={lastName}
                        keyboardType={keyboardType}
                    />

                </View>
            </View>
        </SafeAreaView>
    )
}

const Register = ({ route, navigation }) => {

    const { isWalletRegister } = route.params;

    //! State for Register from user
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [avt, setAvt] = useState('');
    const [avtSource, setAvtSource] = useState('');

    const [walletAddress, setWalletAddress] = useState('');
    const [encryptedPrivateKey, setEncryptedPrivateKey] = useState('');
    const [shares, setShares] = useState(['']);
    const [privateKey, setPrivateKey] = useState('');
    const [errorText, setErrorText] = useState('');
    const [successText, setSuccessText] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isSend, setIsSend] = useState(false);
    // some hash
    const [registerHash, setRegisterHash] = useState<String | null>(null);


    //! Load user address
    //! Check if Register by Wallet or by Username
    useEffect(() => {
        const loadData = async () => {
            try {
                const address = await AsyncStorage.getItem('SessionAD');
                setUserAddress(address !== null ? address : '');
            } catch (error) {
                console.log(error);
            }
        };

        loadData();
    }, []);

    //! Check if passwords match
    useEffect(() => {
        if (password !== confirmPassword) {
            setErrorText('Passwords do not match');
        } else {
            setErrorText('');
        }
    }, [password, confirmPassword]);

    //! Adding user info to smart contract
    const { config } = usePrepareContractWrite({
        address: Tourism_address.Token as `0x${string}`,
        abi: Tourism_abi.abi,
        functionName: 'register',
        args: [firstName, lastName, phoneNumber], // [placeID]
        account: `0x${userAddress.substring(2)}`,// current address
        chainId: 306,
    })

    const { data: registerData,
        error: registerError,
        isError: isErrorRegister,
        isLoading: isLoadingRegister,
        isSuccess: isSuccessRegister,
        write: addInfoToAddress } = useContractWrite(config)

    console.log("---------Is Wallet Register---------", isWalletRegister)
    console.log("registerData: ", registerData)
    console.log("registerError: ", registerError)
    console.log("isErrorRegister: ", isErrorRegister)
    console.log("isLoadingRegister: ", isLoadingRegister)
    console.log("isSuccessRegister: ", isSuccessRegister)
    console.log("current address", walletAddress)
    console.log("current private Key", privateKey)
    console.log("Encrypted Private Key", encryptedPrivateKey);
    console.log("Shares", shares);


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

    const ViewTransaction = async () => {
        const url = `https://blockchain.agridential.vn/vibi/tx/${registerHash}`
        await WebBrowser.openBrowserAsync(url);
    }

    //! Copy Share 3 to clipboard
    const copyToClipboard = async () => {
        if (shares[2] == null) {
            return;
        }
        await Clipboard.setStringAsync(shares[2]);
    };

    //! Save Share 2 to device
    const saveShare2 = async () => {
        try {
            await AsyncStorage.setItem(username, shares[1]);
            console.log("Share 2 saved");
        } catch (error) {
            console.log(error);
        }
    };


    //! Create smart contract account to get private key
    const createSmartContractAccount = async () => {
        try {
            let response = await createAccount();
            if (response !== null) {
                console.log(response);
                setPrivateKey(response.privateKey);
                setWalletAddress(response.walletAddress);
            }
        } catch (error) {
            console.error("Failed to create account:", error);
        }
    }

    //! Register user to server
    const fetchRegisterData = async () => {
        if (errorText) {
            return;
        }

        console.log(avtSource);
        const avtSourceObj = typeof avtSource === 'string' ? { uri: avtSource } : avtSource;
        const filename = avtSourceObj.uri.split('/').pop();
        const imageType = getImageType(filename);
        console.log(filename);
        console.log(imageType);

        const registerForm = new FormData();
        registerForm.append('username', username);
        registerForm.append('password', password);
        registerForm.append('phoneNumber', phoneNumber);
        registerForm.append('age', age);
        registerForm.append('firstName', firstName);
        registerForm.append('lastName', lastName);
        registerForm.append('wallet_address', walletAddress)
        registerForm.append('role', isWalletRegister ? "walletUser" : "tourdcUser");
        registerForm.append('file', {
            uri: avtSourceObj.uri,
            type: imageType,
            name: filename,
        });

        registerForm.append('share_key',
            isWalletRegister ? null : shares[0]);
        registerForm.append('private_key_encrypted', isWalletRegister ? null : encryptedPrivateKey);

        console.log("registerForm: ", registerForm);

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
            console.log(response.data);
            setSuccessText('Register successfully');
            setErrorText('');
            // register on blockchain 

        }
        catch (error) {
            console.error(error);
            setErrorText("Register failed");
            setSuccessText('');
        }
    }

    const privateKeyEncrypt = async () => {
        //$ Get random key and shares it
        let shares = await shamir.shares_key_shamir();
        let randomKey = await shamir.shamir_combine(shares[0], shares[1]);
        //$ Convert shares to hex
        let hexShares = shares.map((share) => {
            return share.toString('hex');
        })
        setShares(hexShares);

        //$ encrypt private key
        let encryptedPrivateKey = await aes.encryptedPrivateKey(randomKey.key, privateKey);

        //! Save share 1 and encrypted private key (Server)
        setEncryptedPrivateKey(encryptedPrivateKey.encryptedKey ?? '');

        //! Save share 2 (Device)
        saveShare2();

        //! Show share 3 (User)
    }

    // resgister user to blockchain
    async function registerOnBlockchain() {
        console.log(firstName, lastName, phoneNumber, privateKey)
        setRegisterHash(await autoRegister(privateKey, firstName, lastName, phoneNumber) as String)
    }


    async function registerTourDCUser() {
        try {
            //$ Create smart contract account to get private key
            await createSmartContractAccount();
        } catch (error) {
            console.error("Error during registration:", error);
        }
    }

    //$ Encrypt private key and send share to server
    useEffect(() => {
        if (privateKey !== '') {
            privateKeyEncrypt();
        }
    }, [privateKey]);

    //$ Register user to server 
    //$ Call Blockchain to register user
    useEffect(() => {
        const registerAndFetch = async () => {
            if (encryptedPrivateKey !== '') {
                await registerOnBlockchain();
                fetchRegisterData();
            }
        };

        registerAndFetch();
    }, [encryptedPrivateKey]);

    const registerWalletUser = () => {
        //$ Add user info to smart contract with wallet address 
        addInfoToAddress?.();
        //$ Register user to server 
        fetchRegisterData();
    }


    //! Register Logic
    const registerLogic = () => {
        if (isWalletRegister) {
            registerWalletUser();
        } else {
            registerTourDCUser();
        }
    }


    //! Components 
    const RegisterNotify = () => {

        useEffect(() => {
            if (isSend) {
                console.log("Registering...");
                setTimeout(registerLogic, 1000);
                setIsSend(false);
            }
        }, [isSend]);

        return (
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            TourDC will verify your information to complete the registration
                        </Text>
                        {/* Share 3 */}
                        {
                            encryptedPrivateKey ?
                                (
                                    <View>
                                        <Text style={styles.tourismPage_checkInLocationText}>
                                            Your private share key, Please be backed-up this key (Touch to copy):
                                        </Text>
                                        <View style={styles.modalCopyTextContainer}>
                                            <TouchableOpacity onPress={() => copyToClipboard()}>
                                                <Text style={styles.tourismPage_checkInLocationText}>
                                                    {encryptedPrivateKey}
                                                    <Image
                                                        source={require('../../assets/icons/clipboard.png')}
                                                        style={styles.tourismPage_clipboardIcon}
                                                    />
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ) :
                                <Text style={styles.tourismPage_checkInLocationText}>
                                    Encrypting private key...
                                </Text>
                        }
                        {
                            registerHash ?
                                (
                                    <View>
                                        <Text style={styles.tourismPage_checkInLocationText}>
                                            Your Register Hash, (Touch to copy):
                                        </Text>
                                        <View style={styles.modalCopyTextContainer}>
                                            <TouchableOpacity onPress={() => copyToClipboard()}>
                                                <Text style={styles.tourismPage_checkInLocationText}>
                                                    {registerHash}
                                                    <Image
                                                        source={require('../../assets/icons/clipboard.png')}
                                                        style={styles.tourismPage_clipboardIcon}
                                                    />
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ) :
                                <Text style={styles.tourismPage_checkInLocationText}>
                                    Getting Register Hash...
                                </Text>
                        }

                        {/* Close button */}
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

                        {
                            errorText || successText ? null :
                                <LoadingIcon />
                        }


                        <TouchableOpacity
                            style={styles.tourismPage_checkInBtnContainer}
                            onPress={ViewTransaction}>
                            <Text style={styles.tourismPage_checkInBtnText}
                            >
                                Open transaction Hash
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.tourismPage_checkInBtnContainer}
                            onPress={() => {
                                setModalVisible(false)
                                navigation.navigate('TourDC_Login');
                            }}
                        >
                            <Text style={styles.tourismPage_checkInBtnText}>
                                Close
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        )
    }

    const LoadingIcon = () => {
        return (
            <ActivityIndicator size="large" color="#39A7FF"
                style={{
                    margin: 10
                }}
            />
        );
    }


    const CustomButton = ({ onPress, text, style }) => (
        <TouchableOpacity style={[style]} onPress={onPress}>
            <Text style={styles.btnText}>{text}</Text>
        </TouchableOpacity>
    );

    return (
        <>
            <RegisterNotify />
            <View >

                <View style={styles.registerHeader}>
                </View>
                <BackNavigationButton
                    navigation={navigation}
                />
                <ImageBackground source={loginBackground} resizeMode="cover" style={styles.registerBackground}>

                    <View style={styles.registerBackgroundOverlay}>
                        <ScrollView >
                            <Text style={styles.loginBigText}>
                                {isWalletRegister ? 'New Wallet Register' : 'TourDC Register'}
                            </Text>
                            {
                                isWalletRegister && <Text style={styles.loginText}>
                                    All of your wallet information will connect to TourDC
                                </Text>

                            }

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

                            <NameInputUI
                                label={'Input Name'}
                                placeholder={'First Name'}
                                isPassword={false}
                                firstName={firstName}
                                setFirstName={setFirstName}
                                lastName={lastName}
                                setLastName={setLastName}
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
                                onPress={() => {
                                    setModalVisible(true);
                                    setIsSend(true);
                                }}
                                text={'REGISTER'}
                            />
                        </ScrollView>
                    </View>
                </ImageBackground>
            </View >
        </>
    )
}

export default Register;
