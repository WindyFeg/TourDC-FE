import React from 'react';
import { Button, View, Text, Image, TouchableOpacity } from 'react-native';
import ReviewPost from '../../Explore/Card/Review/ReviewPost.js';
import CreateReview from '../CreateReview';
import styles from '../../../styles.js';
import GLOBAL from '../../Custom/Globals.js';
/* 
*/
const TripCard = (props) => {
    // ! Variables
    const { navigation
        , postId
        , postList_imgs
        , trHash
        , placeId
        , checkInTime

    } = props;

    const ReviewPost = () => {
        navigation.navigate('ReviewPost');
    }

    const CreateReview = () => {
        navigation.navigate('CreateReview');
    }

    const TripCardContent = (props) => {
        return (
            <View>
                <Text>Post ID: {postId}</Text>
                <Text>Check In date: {checkInTime}</Text>

                <TouchableOpacity
                    onPress={CreateReview}
                    style={props.CreateReview ? styles.Review_BlackBtn : styles.Review_BlueBtn}
                >
                    <Text style={props.CreateReview ? styles.Review_BlackBtn_Text : styles.Review_BlueBtn_Text}>Create Review</Text>
                </TouchableOpacity>
            </View>)
    }


    return (
        <View style={styles.PostCard_Container}>
            <TouchableOpacity onPress={ReviewPost} style={styles.TripCardContainer}>
                {/* Image */}
                <Image
                    source={{ uri: `${GLOBAL.BASE_URL}/api/destination/getDestinationById/${placeId}` }}
                    style={styles.MyTripCard_Image}
                />

                <TripCardContent CreateReview={true} />
            </TouchableOpacity>
        </View>
    );
};


export default TripCard;
