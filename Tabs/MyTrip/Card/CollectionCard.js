import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-web';
import ReviewPost from '../../Explore/Card/Review/ReviewPost.js';

/* 
! Tourism Page
$ Contains information of a destination, hotel, restaurant, or activity
*/
const CollectionCard = ({ navigation }) => {

    const ReviewPost = () => {
        navigation.navigate('ReviewPost');
    }


    return (
        <View>
            <TouchableOpacity onPress={ReviewPost}>
                <Text>David Beckhamds</Text>
                <Text>What I say : D</Text>
            </TouchableOpacity>
        </View>
    );
};


export default CollectionCard;