import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Button } from 'react-native-web';
import ReviewPost from './ReviewPost';
import styles from '../../../../styles';
import ReviewHeader from './ReviewHeader';
import SvgComponent from '../../../../assets/SvgComponent';
/* 
*/
const ReviewShort = (props) => {
    const {
        navigation,
        author,
        postID,
        placeId,
        placeName,
        arrivalDate,
        createTime,
        review,
        rate,
        title,
        upvoteNum } = props;

    const [isHeartSelected, setHeartSelected] = useState(false);

    const ReviewPost = () => {
        navigation.navigate('ReviewPost');
    }

    const ReviewPostShortContent = (props) => {
        return <View >
            <Text style={styles.ReviewPostShort_content}>{review}</Text>
        </View>
    }

    const ReviewPostShortFooter = (props) => {
        return (
            <View style={styles.ReviewPostFooter}>
                <View style={styles.UpvoteButtonContainer}>
                    <TouchableOpacity
                        style={styles.UpvoteButton}
                        onPress={() => setHeartSelected(!isHeartSelected)}
                    >
                        <SvgComponent name={isHeartSelected ? 'Heart1' : 'Heart0'} />
                    </TouchableOpacity >
                    <Text style={styles.UpvoteButtonText}>500</Text>
                </View>
                <Text style={styles.UpvoteButtonText}> 12/5/2020</Text>
            </View >
        )
    }


    return (
        <View style={styles.ReviewPostShort_container}>
            {/* Thumbnail, user and achievement */}
            <ReviewHeader
                title={title}
                username={author}
                rating={rate}
                REP={100}
                userVerification={true}
                ticketVerified={true}
                blockchainVerified={true}
                reputationVerified={true}
            />

            {/* Content */}
            <TouchableOpacity onPress={ReviewPost}>
                <ReviewPostShortContent />
            </TouchableOpacity>

            {/* Like and date */}
            <ReviewPostShortFooter />
        </View>
    );
};


export default ReviewShort;
