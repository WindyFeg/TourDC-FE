import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Button } from 'react-native-web';
import ReviewPost from './ReviewPost';
import styles from '../../../../styles';
import ReviewHeader from './ReviewHeader';
import SvgComponent from '../../../../assets/SvgComponent';
import * as web3 from '../../../../service/signmessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GLOBAL from '../../../Custom/Globals';
import axios from 'axios';

/* 
*/
const ReviewShort = (props) => {
    // ! Variables
    const {
        navigation,
        author,
        postId,
        placeId,
        placeName,
        arrivalDate,
        createTime,
        review,
        rate,
        title,
        upvoteNum,
        isVoted,
        SessionRK,
        SessionAD,
    } = props;

    const [isHeartSelected, setHeartSelected] = useState(isVoted);
    const [listImgs, setListImgs] = useState([]);

    // ! Fetch review images
    useEffect(() => {
        const fetchReviewImages = async () => {
            console.log('postId:', postId);
            console.log(`${GLOBAL.BASE_URL}/api/post/getImgs/${postId}`);
            const response = await axios.get(`${GLOBAL.BASE_URL}/api/post/getImgs/${postId}`);
            setListImgs(response.data.data);
        };
        fetchReviewImages();
    }, []);

    // ! Components
    /*
    Pass the short post's information to ReviewPost
    */
    const ReviewPost = () => {
        navigation.navigate('ReviewPost',
            {
                navigation: navigation,
                author: author,
                postId: postId,
                placeId: placeId,
                placeName: placeName,
                arrivalDate: arrivalDate,
                createTime: createTime,
                review: review,
                rate: rate,
                title: title,
                upvoteNum: upvoteNum,
                listImgs: listImgs,
            }
        );
    }

    // ! Upvote user on blockchain
    async function upvoteOnBlockChain() {
        console.log('upvoteOnBlockChain');
        console.log('SessionRK:', SessionRK);
        console.log('SessionAD:', SessionAD);
        console.log('postId:', postId);
        const response = await web3.autoUpvote(SessionRK, SessionAD, postId)
        console.log('response:', response)
    }

    const upVoteLogic = () => {
        if (isHeartSelected === false) {
            setHeartSelected(true);
            upvoteOnBlockChain();
        }
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
                        onPress={upVoteLogic}
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
                thumbnail={listImgs[0]}
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
