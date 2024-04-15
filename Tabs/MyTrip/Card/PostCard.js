import React from 'react';
import { Button, View, Text, Image, TouchableOpacity } from 'react-native';
import ReviewPost from '../../Explore/Card/Review/ReviewPost.js';
import styles from '../../../styles.js';
import SvgComponent from '../../../assets/SvgComponent.js';
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


    // ! Components
    const ReviewPost = () => {
        // navigation.navigate('ReviewPost');
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

    const PostCardContent = () => {
        return <View>
            {/* Title */}
            <Text style={styles.tripCardBigText}>{postTitle}</Text>
            <Text style={styles.tripCardText}>{placeName}</Text>
            {/* Date */}
            <Text style={styles.tripCardText}>Create at: {convertDateTimeString(String(createTime))}</Text>

            {/* Token */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>{placeRate}</Text>
                <Image
                    source={require('../../../assets/logo/DCToken.png')}
                    style={{ width: 25, height: 25 }}
                />
                <Text>1000</Text>
                <SvgComponent name="Heart1" />
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
                    source={require('../../../assets/background/bai-bien-bali-2.jpg')}
                    style={styles.MyTripCard_Image}
                />
                {/* Content */}
                <PostCardContent />
            </TouchableOpacity>
        </View>
    );
};


export default PostCard;
