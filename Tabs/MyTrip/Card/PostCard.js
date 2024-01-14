import React from 'react';
import { Button, View, Text, Image, TouchableOpacity } from 'react-native';
import ReviewPost from '../../Explore/Card/Review/ReviewPost.js';

/* 
*/
const PostCard = ({ navigation }) => {

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


export default PostCard;
