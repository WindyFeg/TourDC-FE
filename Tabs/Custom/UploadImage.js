import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../../styles.js';
import * as FileSystem from 'expo-file-system';

const UploadImage = ({ setFiles, setSource }) => {
    const [uri, setUri] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setUri(result.uri);
            setSource(result);
            getBase64();
        }
    };

    const getBase64 = async () => {
        const base64 = await FileSystem.readAsStringAsync(
            uri, { encoding: FileSystem.EncodingType.Base64 });
        setFiles(base64);
    }


    return (
        <View style={styles.CreateReview_uploadImageContainer}>
            <TouchableOpacity style={styles.CreateReview_uploadImageButton}
                onPress={pickImage}>
                <Text style={styles.CreateReview_uploadImageButtonText}>
                    Choose Image
                </Text>
            </TouchableOpacity>

            {uri ? (
                <View style={styles.CreateReview_imageContainer}>
                    <Image source={{ uri: uri }}
                        style={styles.CreateReview_image} />
                </View>
            ) : (
                <Text style={styles.CreateReview_errorText}>No image selected</Text>
            )}
        </View>
    )
}

export default UploadImage;