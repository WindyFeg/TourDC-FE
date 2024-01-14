import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-web';
import ReviewPost from './ReviewPost';

/* 
*/
const ReviewShort = ({ navigation }) => {

    const ReviewPost = () => {
        navigation.navigate('ReviewPost');
    }


    return (
        <View>
            <TouchableOpacity onPress={ReviewPost}>
                <Text>Review Short David Beckhamds</Text>
                <Text>What I say : D</Text>
            </TouchableOpacity>
        </View>
    );
};


export default ReviewShort;
