import React, { useState, useEffect } from 'react';
import { Button, View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
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
import Globals from '../Custom/Globals.js';
import { hexToBytes } from 'viem';

type Props = {
    navigation: StackNavigationProp<any>;
};

const CreateReview: React.FC<Props> = ({ navigation }) => {
    const [file, setFile] = useState<string | null>(null);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [title, onChangeTitle] = useState<string>('This is an title');
    const [reviewText, onChangeReviewText] = useState<string>('This is an review');
    const [rating, setRating] = useState<number>(0);

    const { chain, chains } = getNetwork()
    console.log("chain: ", chain)

    const { data,error, isError, isLoading, isSuccess } = useContractRead({
      address: Tourism_address.Token as `0x${string}`, 
      abi: Tourism_abi.abi,
      functionName: 'touristIdentify', // contract method
      // account: '0x76E046c0811edDA17E57dB5D2C088DB0F30DcC74', // current address
    })
    console.log("dâta:", data)

  const { config } = usePrepareContractWrite({
    address: Tourism_address.Token as `0x${string}`,
    abi: Tourism_abi.abi,
    functionName: 'reviews',
    args: [ '65f2c80ef60b126cb248752b',
            '0x0000000000000000000000000000000000000000000000000000000000000000',
            'Romantic',
            '49',
            'Beautifullll'], // [placeID, postID, title, rate, review]
    account: '0x76E046c0811edDA17E57dB5D2C088DB0F30DcC74', // current address
    chainId: 306,
  })
  const { data: reviewData,error: reviewError, isError: isErrorReview, isLoading: isLoadingReview , isSuccess: isSuccessReview, write: review } = useContractWrite(config)
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
            <View style={{ flexDirection: 'row' }}>
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

    const UploadImage: React.FC = () => {
        return (
            <View style={styles.CreateReview_uploadImageContainer}>
                <TouchableOpacity style={styles.CreateReview_uploadImageButton}
                    onPress={pickImage}>
                    <Text style={styles.CreateReview_uploadImageButtonText}>
                        Choose Image
                    </Text>
                </TouchableOpacity>

                {file ? (
                    <View style={styles.CreateReview_imageContainer}>
                        <Image source={{ uri: file }} 
                        style={styles.CreateReview_image} />
                    </View>
                ) : (
                    <Text style={styles.CreateReview_errorText}>error</Text>
                )}
            </View>
        )
    }

    return (
        <View>
            <ScrollView>
                <BackNavigationButton navigation={navigation} />
                <View style={styles.CreateReview_container}>
                    <Text style={styles.CreateReview_Text}>How would you rate your experience!</Text>
                    <Rating />

                    <Text style={styles.CreateReview_Text}>Review Title</Text>
                    <TextInput
                        multiline={true}
                        style={styles.CreateReview_Input}
                        onChangeText={onChangeTitle}
                        value={title}
                    />

                    <Text style={styles.CreateReview_Text}>How would you rate your experience!</Text>
                    <TextInput
                        multiline={true}
                        style={styles.CreateReview_Input}
                        onChangeText={onChangeReviewText}
                        value={reviewText}
                    />

                    <Text style={styles.CreateReview_Text}>Upload Images</Text>
                    <UploadImage />

                    <TouchableOpacity style={styles.loginBtn}
                        onPress={() => review?.()}>
                        <Text style={styles.btnText}>Post</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default CreateReview;