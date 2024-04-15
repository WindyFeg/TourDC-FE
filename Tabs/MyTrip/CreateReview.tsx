import React, { useState, useEffect } from 'react';
import { Button, View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, TextInput, Alert, Modal, ActivityIndicator } from 'react-native';
import BackNavigationButton from '../Custom/BackNavigationButton.js';
import SvgComponent from '../../assets/SvgComponent.js';
import styles from '../../styles.js';
import * as ImagePicker from "expo-image-picker";
import { StackNavigationProp } from '@react-navigation/stack';
import {
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    //   useTransactionReceipt  
} from "wagmi";
import Tourism_abi from "../../contracts/Tourism.json"
import Tourism_address from "../../contracts/Tourism-address.json"
import { getNetwork } from '@wagmi/core'
import axios from 'axios';
import GLOBAL from '../Custom/Globals.js';
import UploadImage from '../Custom/UploadImage.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { autoCreatePost } from '../../service/signmessage.js';
import * as Clipboard from 'expo-clipboard';
import * as WebBrowser from 'expo-web-browser';

type Props = {
    navigation: StackNavigationProp<any>;
    route: any; // Add the 'route' property to the Props interface
};

const CreateReview: React.FC<Props> = ({ route, navigation }) => {
    const {
        postId,
        placeId,
        trHash,
        tripName,
        checkInTime,
        placeThumbnail,
    } = route.params;
    const [file, setFile] = useState<string | null>(null);
    const [source, setSource] = useState<string | null>(null);
    const [title, onChangeTitle] = useState<string>('This is an title');
    const [reviewText, onChangeReviewText] = useState<string>('This is an review');
    const [rating, setRating] = useState<number>(0);
    const { chain, chains } = getNetwork()
    const [SessionRK, setSessionRK] = useState('');
    const [SessionAD, setSessionAD] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [successText, setSuccessText] = useState('');
    const [txHash, setTxHash] = useState('');

    useEffect(() => {
        const loadData = async () => {
            const rk = await AsyncStorage.getItem('SessionRK');
            const ad = await AsyncStorage.getItem('SessionAD');

            if (rk !== null && ad !== null) {
                setSessionRK(rk);
                setSessionAD(ad);
            }
        }
        loadData();
    }, []);

    const ViewTransaction = async () => {
        const url = `https://blockchain.agridential.vn/vibi/tx/${registerHash}`
        await WebBrowser.openBrowserAsync(url);
    }

    //! Copy Transaction Hash to clipboard
    const copyToClipboard = async () => {
        if (txHash == null) {
            return;
        }
        await Clipboard.setStringAsync(txHash);
    };

    async function createPostLogic() {
        if (SessionRK === '') {
            console.log('Wallet');
            review?.();
        }
        else {
            console.log('TourDC');
            setModalVisible(true);
            createPostOnBlockChain();
        }
    }

    const { data, error, isError, isLoading, isSuccess } = useContractRead({
        address: Tourism_address.Token as `0x${string}`,
        abi: Tourism_abi.abi,
        functionName: 'touristIdentify', // contract method
        account: `0x${SessionAD.substring(2)}`, // current address
    })

    async function createPostOnBlockChain() {
        console.log('SessionRK: ', SessionRK);
        console.log('SessionAD: ', SessionAD);
        console.log('placeId: ', placeId);
        console.log('postId: ', postId);
        console.log('title: ', title);
        console.log('rating: ', rating * 10);
        console.log('reviewText: ', reviewText);
        let response = await autoCreatePost(
            SessionRK,
            SessionAD,
            placeId,
            postId,
            title,
            rating * 10,
            reviewText,
        );
        setSuccessText('Your review has been posted successfully!');
        setTxHash(response);
    }

    const { config } = usePrepareContractWrite({
        address: Tourism_address.Token as `0x${string}`,
        abi: Tourism_abi.abi,
        functionName: 'reviews',
        args: [placeId,
            postId,
            title,
            rating * 10,
            reviewText], // [placeID, postID, title, rate, review]
        account: `0x${SessionAD.substring(2)}`, // current address
        chainId: 306,
    })

    const { data: reviewData,
        error: reviewError,
        isError: isErrorReview,
        isLoading: isLoadingReview,
        isSuccess: isSuccessReview,
        write: review } = useContractWrite(config)
    useEffect(() => {
        console.log('reviewData: ', reviewData)
        console.log('reviewError: ', reviewError)
        console.log('isErrorReview: ', isErrorReview)
        console.log('isLoadingReview: ', isLoadingReview)
        console.log('isSuccess: ', isSuccess)

    }, [reviewData, reviewError, isErrorReview, isLoadingReview, isSuccess]);

    const Rating: React.FC = () => {
        const stars = [5, 4, 3, 2, 1];

        return (
            <View style={{ flexDirection: 'row', margin: 10 }}>
                {stars.map((star) => (
                    <TouchableOpacity
                        key={star}
                        onPress={() => setRating(star - 1)}
                    >
                        <SvgComponent
                            name={star <= rating ? "StarBig1" : "StarBig0"}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        );
    }

    const ModalButton = ({ onPress, text }) => (
        <TouchableOpacity
            style={styles.tourismPage_checkInBtnContainer}
            onPress={onPress}
        >
            <Text style={styles.tourismPage_checkInBtnText}>{text}</Text>
        </TouchableOpacity>
    );

    const LoadingIcon = () => {
        return (
            <ActivityIndicator size="large" color="#39A7FF"
                style={{
                    margin: 10
                }}
            />
        );
    }

    const CreateReviewNotify = () => {
        return (
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    console.log("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalBigText}>
                            Post Review
                        </Text>
                        <Text style={styles.modalText}>
                            Your review will be processed and posted on the {tripName} review page section.
                        </Text>

                        {
                            txHash ?
                                (
                                    <View>
                                        <Text style={styles.tourismPage_checkInLocationText}>
                                            Your transaction Hash, (Touch to copy):
                                        </Text>
                                        <View style={styles.modalCopyTextContainer}>
                                            <TouchableOpacity onPress={() => copyToClipboard()}>
                                                <Text style={styles.tourismPage_checkInLocationText}>
                                                    {txHash}
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
                                    Getting transaction Hash...
                                </Text>
                        }


                        {
                            successText == '' ?
                                <LoadingIcon />
                                :
                                <Text style={styles.CreateReview_successText}>
                                    {successText}
                                </Text>
                        }

                        {
                            errorText == null ?
                                null
                                :
                                <Text style={styles.CreateReview_errorText}>
                                    {errorText}
                                </Text>
                        }

                        <ModalButton
                            onPress={ViewTransaction}
                            text={'Open transaction Hash'}
                        />

                        <ModalButton
                            onPress={() => {
                                setModalVisible(false);
                            }}
                            text={'Close'}
                        />

                    </View>
                </View>
            </Modal>
        );
    }


    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                "Permission Denied",
                `Sorry, we need camera roll permission to upload images.`
            );
        } else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(result);

            if (!result.canceled) {
                setFile(result.assets[0].uri);
                onChangeTitle(result.assets[0].uri);
                setErrorText(null);
            }
        }
    };

    return (
        <View style={{ backgroundColor: '#fff', height: "100%" }}>
            <CreateReviewNotify />
            <ScrollView>
                <BackNavigationButton navigation={navigation} />
                <View style={styles.CreateReview_container}>
                    <Image
                        source={{ uri: `${GLOBAL.BASE_URL}/api/destination/getDestinationPicture/${placeThumbnail}` }}
                        style={styles.reviewDestinationImage}
                    // imageStyle={styles.reviewDestinationImage}
                    />
                    <Text style={styles.CreateReview_BigText}>How would you rate your experience?</Text>
                    <Text style={styles.CreateReview_Text}>Please rate your satisfaction with this destination (1-5)</Text>
                    <Rating />

                    <Text style={styles.CreateReview_BigText}>Review Title</Text>
                    <Text style={styles.CreateReview_Text}>This is a title, you can rename it for better readability.</Text>
                    <TextInput
                        multiline={true}
                        style={styles.CreateReview_Input}
                        onChangeText={onChangeTitle}
                        value={title}
                    />

                    <Text style={styles.CreateReview_BigText}>What do you think at {tripName}?</Text>
                    <Text style={styles.CreateReview_Text}>
                        Tell Us About Your Trip:
                        {'\n'}• What did you love about your trip to {tripName}?
                        {'\n'}• What did you enjoy the most, and would you recommend it to others?
                        {'\n'}• Share your tips, and things
                    </Text>
                    <TextInput
                        multiline={true}
                        style={styles.CreateReview_Input}
                        onChangeText={onChangeReviewText}
                        value={reviewText}
                    />

                    <Text style={styles.CreateReview_BigText}>Upload Images</Text>
                    <Text style={styles.CreateReview_Text}>Share your travel memories with us by uploading photos from your trip.</Text>

                    <UploadImage
                        setFiles={setFile}
                        setSource={setSource}
                    />

                    <TouchableOpacity style={styles.loginBtn}
                        onPress={createPostLogic}>
                        <Text style={styles.btnText}>Post</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default CreateReview;