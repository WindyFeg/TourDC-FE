import React, { useState, useEffect } from 'react';
import { Button, View, Text, Image, TouchableOpacity } from 'react-native';
import ReviewPost from '../../Explore/Card/Review/ReviewPost.js';
import styles from '../../../styles.js';
import SvgComponent from '../../../assets/SvgComponent.js';
import axios from 'axios';
import TourDCToken from '../../../assets/logo/DCToken.png';
import GLOBAL from '../../Custom/Globals.js';
import * as web3 from '../../../service/web3.js';
/* 
*/
const PostCard = (props) => {

    // ! Variables
    const { navigation
        , postId
        , postTitle
        , postReview
        , placeId
        , placeName
        , placeRate
        , placeAddress
        , createTime
        , upvoteNumber

    } = props;
    const [postInfor, setPostInfor] = useState({});
    const [imageName, setImageName] = useState('');

    const fetchReviewImages = async () => {
        try {
            console.log('postId:', postId);
            const response = await axios.get(`${GLOBAL.BASE_URL}/api/post/getImgs/${postId}`);
            setImageName(response.data.data[0]);
            console.log(`${GLOBAL.BASE_URL}/api/destination/getDestinationPicture/${imageName}`);
        } catch (error) {
            console.error('Error fetching review images:', error);
        }
    };

    const fetchTripInfor = async () => {
        web3.getReviewByPostID(postId).then((response) => {
            setPostInfor(response);
            console.log(response);
        });

    }
    useEffect(() => {
        fetchReviewImages();
        fetchTripInfor();
    }, []);


    // ! Components
    const ReviewPost = () => {
        // navigation.navigate('ReviewPost');
    }

    function convertDateTimeString(dateTimeString) {
        // Create a Date object from the ISO 8601 formatted string
        const dateObject = new Date(dateTimeString * 1000);
        // Check if the Date object is valid
        if (isNaN(dateObject.getTime())) {
            return null; // Return null for invalid strings
        }
        // Format the time (hours:minutes)
        const time = dateObject.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        // Format the date (day/month/year)
        const date = dateObject.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

        return `${date}`;
    }

    const PostCardContent = () => {
        return <View>
            {/* Title */}
            <Text style={styles.tripCardBigText}>{postTitle}</Text>
            <Text style={styles.tripCardText}>{placeName}</Text>
            {/* Date */}
            <Text style={styles.tripCardText}>Create at: {convertDateTimeString(String(createTime))}</Text>

            {/* Token */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.rewardCardText}>Reward: {postInfor.reward}
                    <Image
                        source={TourDCToken}
                        style={{ width: 17, height: 17 }}
                    />
                </Text>

                <Text style={styles.rewardCardText}>{upvoteNumber}</Text>
                <SvgComponent name="HeartSmall1" />
            </View>
        </View>
    }

    return (
        <View style={styles.PostCard_Container}>
            <TouchableOpacity
                onPress={ReviewPost}
                style={{ flexDirection: 'row', alignItems: 'center', width: "60%" }}>
                {/* Image */}
                <Image
                    source={{ uri: `${GLOBAL.BASE_URL}/api/post/getImg/${imageName}` }}
                    style={styles.MyTripCard_Image}
                />
                {/* Content */}
                <PostCardContent />
            </TouchableOpacity>
        </View>
    );
};


export default PostCard;
