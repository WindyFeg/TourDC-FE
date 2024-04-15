import React, { useEffect, useState } from 'react';
import { Button, View, Text, Image, TouchableOpacity } from 'react-native';
import ReviewPost from '../../Explore/Card/Review/ReviewPost.js';
import CreateReview from '../CreateReview';
import styles from '../../../styles.js';
import GLOBAL from '../../Custom/Globals.js';
import axios from 'axios';
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
    const [imageName, setImageName] = useState('');
    const [tripName, setTripName] = useState('');

    useEffect(async () => {
        let response = await axios.get(`${GLOBAL.BASE_URL}/api/destination/getDestinationById/${placeId}`)
        setImageName(response.data.thumbnail);
        setTripName(response.data.name);
    }, []);

    const ReviewPost = () => {
        // navigation.navigate('ReviewPost');
    }

    const CreateReview = () => {
        navigation.navigate('CreateReview',
            {
                postId: postId,
                trHash: trHash,
                placeId: placeId,
                tripName: tripName,
                checkInTime: checkInTime,
                placeThumbnail: imageName
            }
        );
    }

    function convertDateTimeString(dateTimeString) {
        // Create a Date object from the ISO 8601 formatted string
        const dateObject = new Date(dateTimeString);
        // Check if the Date object is valid
        if (isNaN(dateObject.getTime())) {
            return null; // Return null for invalid strings
        }
        // Format the time (hours:minutes)
        const time = dateObject.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        // Format the date (day/month/year)
        const date = dateObject.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

        return `${time}, ${date}`;
    }

    const TripCardContent = (props) => {
        return (
            <View>
                <Text style={styles.tripCardBigText}>{tripName}</Text>
                <Text
                    style={styles.tripCardText}
                >Check In at:
                    {convertDateTimeString(String(checkInTime))}
                </Text>
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
                    source={{ uri: `${GLOBAL.BASE_URL}/api/destination/getDestinationPicture/${imageName}` }}
                    style={styles.MyTripCard_Image}
                />

                <TripCardContent CreateReview={true} />
            </TouchableOpacity>
        </View>
    );
};


export default TripCard;
