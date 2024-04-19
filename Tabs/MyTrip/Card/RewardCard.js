import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-web';
import ReviewPost from '../../Explore/Card/Review/ReviewPost.js';
import styles from '../../../styles.js';
import GLOBAL from '../../Custom/Globals.js';
import * as web3 from '../../../service/web3.js';
import { autoGetReward } from '../../../service/signmessage.js';
import axios from 'axios';
/* 
! Tourism Page
$ Contains information of a destination, hotel, restaurant, or activity
*/
async function claimRewardPointOnBlockchain(
    SessionRK,
    SessionAD,
    postId
) {
    try {
        console.log('Claiming reward point...');
        console.log('SessionRK:', SessionRK);
        console.log('SessionAD:', SessionAD);
        console.log('postId:', postId);
        const response = await autoGetReward(SessionRK, SessionAD, postId);
        console.log(response);
    } catch (error) {
        console.error('Error claiming reward point:', error);
    }
}

const ClaimRewardButton = (props) => {
    const {
        postId,
        SessionAD,
        SessionRK
    } = props;

    return (
        <TouchableOpacity
            onPress={claimRewardPointOnBlockchain(
                SessionRK,
                SessionAD,
                postId
            )}
            style={styles.Review_BlueBtn}
        ></TouchableOpacity>
    );
}
export const RewardUpvoteCard = (props) => {

    const {
        navigation,
        authorId,
        createTime,
        postId,
        rewardPoint,
        SessionAD,
        SessionRK
    } = props;
    const [postInfor, setPostInfor] = useState({});

    const fetchTripInfor = async () => {
        web3.getReviewByPostID(postId).then((response) => {
            setPostInfor(response);
            console.log(response);
        });
    }
    useEffect(() => {
        fetchTripInfor();
    }, []);

    const ReviewPost = () => {
        // navigation.navigate('ReviewPost');
    }

    //! Tủn this into reward list
    return (
        <View style={styles.RewardUpvoteCard_Container}>
            <TouchableOpacity onPress={ReviewPost}>
                <View style={styles.RewardCard_avatarContainer}>
                    <Image
                        style={styles.RewardCard_userAvatar}
                        source={{ uri: `${GLOBAL.BASE_URL}/api/user/getAvatar/${authorId}` }} />
                    <ClaimRewardButton
                        postId={postId}
                        SessionAD={SessionAD}
                        SessionRK={SessionRK}
                    />
                    <Text>Total Reward</Text>
                    <Text>{rewardPoint}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export const RewardPostCard = (props) => {

    const {
        navigation,
        authorId,
        createTime,
        postId,
        rewardPoint,
        SessionAD,
        SessionRK
    } = props;

    const [postInfor, setPostInfor] = useState({});
    const [imageName, setImageName] = useState('');
    const [tripName, setTripName] = useState('');



    const fetchReviewImages = async () => {
        try {
            console.log('postId:', postId);
            const response = await axios.get(`${GLOBAL.BASE_URL}/api/post/getImgs/${postId}`);
            console.log('response:', response);
            setImageName(response.data.data[0]);
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

    const ReviewPost = () => {
        // navigation.navigate('ReviewPost');
    }

    //! Tủn this into reward list
    return (
        <View style={styles.RewardPostCard_Container}>
            <TouchableOpacity onPress={ReviewPost}>
                <View style={styles.RewardCard_avatarContainer}>
                    <Image
                        source={{ uri: `${GLOBAL.BASE_URL}/api/destination/getDestinationPicture/${imageName}` }}
                        style={styles.MyTripCard_Image}
                    />
                    <View style={styles.RewardCard_InforContainer}>
                        <ClaimRewardButton
                            postId={postId}
                            SessionAD={SessionAD}
                            SessionRK={SessionRK}
                        />

                        <Text>Total Reward</Text>
                        <Text>{rewardPoint}</Text>
                        <Text>Your reward point</Text>
                        <Text>{rewardPoint}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}