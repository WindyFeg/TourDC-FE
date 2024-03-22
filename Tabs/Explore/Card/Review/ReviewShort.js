import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Button } from 'react-native-web';
import ReviewPost from './ReviewPost';
import styles from '../../../../styles';
import ReviewHeader from './ReviewHeader';
import SvgComponent from '../../../../assets/SvgComponent';
import * as web3 from '../../../../service/web3.js';

/* 
*/
const ReviewShort = (props) => {
    // ! Variables
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

    // ! Components
    /*
    Pass the short post's information to ReviewPost
    */
    const ReviewPost = () => {
        navigation.navigate('ReviewPost',
            {
                navigation: navigation,
                author: author,
                postID: postID,
                placeId: placeId,
                placeName: placeName,
                arrivalDate: arrivalDate,
                createTime: createTime,
                review: review,
                rate: rate,
                title: title,
                upvoteNum: upvoteNum
            }
        );
    }

    const ReviewPostShortContent = (props) => {
        return <View >
            <Text style={styles.ReviewPostShort_content}>{review}</Text>
        </View>
    }

    const ReviewPostShortFooter = () => {
        return (
            <View style={styles.ReviewPostFooter}>
                <View style={styles.UpvoteButtonContainer}>
                    <TouchableOpacity
                        style={styles.UpvoteButton}
                        onPress={() => setHeartSelected(!isHeartSelected)}
                    >
                        <SvgComponent name={isHeartSelected ? 'Heart1' : 'Heart0'} />
                    </TouchableOpacity >
                    <Text style={styles.UpvoteButtonText}>{upvoteNum}</Text>
                </View>
                <Text style={styles.UpvoteButtonText}>
                    {/* {new Date(arrivalDate * 1000).toISOString()} */}
                    {arrivalDate}
                </Text>
            </View >
        )
    }

    // ! Render
    return (
        <View style={styles.ReviewPostShort_container}>
            {/* Thumbnail, user and achievement */}
            <ReviewHeader
                authorID={author}
                title={title}
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
