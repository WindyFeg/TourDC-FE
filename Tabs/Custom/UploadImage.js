import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../../styles.js';

const UploadImage = ({ setFiles, setSource }) => {
    const [file, setFile] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setFile(result.uri);
            setFiles(result);
            setSource(result.uri);
        }
    };

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
                <Text style={styles.CreateReview_errorText}>No image selected</Text>
            )}
        </View>
    )
}

export default UploadImage;