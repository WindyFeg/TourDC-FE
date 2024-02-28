import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Button } from 'react-native-web';
import ReviewPost from './ReviewPost';
import styles from '../../../../styles';
import ReviewPostHeader from './ReviewHeader';
/* 
*/
const ReviewShort = ({ navigation }) => {

    const ReviewPost = () => {
        navigation.navigate('ReviewPost');
    }




    return (
        <View style={styles.ReviewPostShort_container}>
            <TouchableOpacity onPress={ReviewPost}>
                <ReviewPostHeader />
            </TouchableOpacity>
        </View>
    );
};


export default ReviewShort;
