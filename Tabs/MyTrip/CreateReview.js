import React, { useState } from 'react';
import { Button, View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import BackNavigationButton from '../Custom/BackNavigationButton';
import SvgComponent from '../../assets/SvgComponent';
import styles from '../../styles.js';
import * as ImagePicker from "expo-image-picker";


const CreateReview = ({ navigation }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);


    const [title, onChangeTitle] = React.useState('This is an title');
    const [review, onChangeReview] = React.useState('This is an review');
    const [rating, setRating] = useState(0);

    const Rating = () => {
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
        const { status } = await ImagePicker.
            requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {

            // If permission is denied, show an alert 
            Alert.alert(
                "Permission Denied",
                `Sorry, we need camera  
                 roll permission to upload images.`
            );
        } else {

            // Launch the image library and get 
            // the selected image 
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(result); // Log the result object

            if (!result.cancelled) {

                // If an image is selected (not cancelled),  
                // update the file state variable 
                setFile(result.assets[0].uri);
                onChangeTitle(result.assets[0].uri);

                // Clear any previous errors 
                setError(null);
            }
        }
    };

    const UploadImage = () => {
        return (<View style={styles.CreateReview_uploadImageContainer}>
            {/* <Text style={styles.CreateReview_uploadImageHeader}>
                Add Image:
            </Text> */}

            {/* Button to choose an image */}
            <TouchableOpacity style={styles.CreateReview_uploadImageButton}
                onPress={pickImage}>
                <Text style={styles.CreateReview_uploadImageButtonText}>
                    Choose Image
                </Text>
            </TouchableOpacity>

            {file ? (
                // Display the selected image 
                <View style={styles.CreateReview_imageContainer}>
                    <Image source={{ uri: file }}
                        style={styles.CreateReview_image} />
                </View>
            ) : (
                <Text style={styles.CreateReview_errorText}>{error}</Text>
            )}
        </View>)
    }

    return (
        <View>
            <ScrollView>
                <BackNavigationButton navigation={navigation} />
                <View style={styles.CreateReview_container}>
                    {/* REVIEW RATING    */}
                    <Text style={styles.CreateReview_Text}>How would you rate your experience!</Text>
                    <Rating />

                    {/* REVIEW TITLE */}
                    <Text style={styles.CreateReview_Text}>Review Title</Text>
                    <TextInput
                        multiline={true}
                        style={styles.CreateReview_Input}
                        onChangeText={onChangeTitle}
                        value={title}
                    />

                    {/* WRITE REVIEW */}
                    <Text style={styles.CreateReview_Text}>How would you rate your experience!</Text>
                    <TextInput
                        multiline={true}
                        style={styles.CreateReview_Input}
                        onChangeText={onChangeReview}
                        value={review}
                    />

                    {/* UPLOAD IMAGE */}
                    <Text style={styles.CreateReview_Text}>Upload Images</Text>
                    <UploadImage />
                </View>
            </ScrollView>
        </View>
    );
};

export default CreateReview;
