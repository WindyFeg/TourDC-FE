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
                {/* Title */}
                <Text>Get our into new
                    Sea Heven in Bali</Text>
                {/* Date */}
                <Text>16/11/2022</Text>

                {/* Image */}
                <Image
                    source={require('../../../assets/logo/DCToken.png')}
                    style={{ width: 25, height: 25 }}
                />
            </TouchableOpacity>
        </View>
    );
};


export default PostCard;
