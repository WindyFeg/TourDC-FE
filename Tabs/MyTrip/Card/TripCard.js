import React from 'react';
import { Button, View, Text, Image, TouchableOpacity } from 'react-native';
import ReviewPost from '../../Explore/Card/Review/ReviewPost.js';
import CreateReview from '../CreateReview';

/* 
*/
const TripCard = ({ navigation }) => {

    const ReviewPost = () => {
        navigation.navigate('ReviewPost');
    }

    const CreateReview = () => {
        navigation.navigate('CreateReview');
    }


    return (
        <View>
            <TouchableOpacity onPress={ReviewPost}>
                <Text>David Beckhamds</Text>
                <Text>What I say : D</Text>

                <Button
                    title="Create Review"
                    onPress={CreateReview}
                ></Button>
            </TouchableOpacity>
        </View>
    );
};


export default TripCard;
