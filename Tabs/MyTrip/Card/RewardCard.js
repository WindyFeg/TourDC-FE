import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-web';
import ReviewPost from '../../Explore/Card/Review/ReviewPost.js';
import styles from '../../../styles.js';
import GLOBAL from '../../Custom/Globals.js';
import * as web3 from '../../../service/web3.js';
import { autoGetReward } from '../../../service/signmessage.js';
import axios from 'axios';
import TourDCToken from '../../../assets/logo/DCToken.png';
/* 
! Tourism Page
$ Contains information of a destination, hotel, restaurant, or activity
*/
const ClaimRewardButton = (props) => {
    const {
        postId,
        SessionAD,
        SessionRK
    } = props;

    async function claimRewardPointOnBlockchain() {
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

    return (
        <TouchableOpacity
            onPress={claimRewardPointOnBlockchain}
            style={styles.Review_BlueBtn}
        >
            <Text style={
                styles.Review_BlueBtn_Text
            }>CLAIM
                <Image
                    source={TourDCToken}
                    style={{ width: 15, height: 15 }}
                />
            </Text>
        </TouchableOpacity >
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
    const [authorName, setAuthorName] = useState('');

    const fetchTripInfor = async () => {
        web3.getReviewByPostID(postId).then((response) => {
            setPostInfor(response);
            console.log(response);
        });
        let _user = (await axios.post(`${GLOBAL.BASE_URL}/api/user/getCurrent`, { address: authorId })).data.user
        console.log(_user)
        setAuthorName(_user.firstName + ' ' + _user.lastName)
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

                    <View style={styles.RewardCard_InforContainer}>
                        <Text style={styles.rewardCardBigText}>{
                            authorName
                        }</Text>

                        <Text style={styles.rewardCardText}>Title: {
                            postInfor && postInfor.title &&
                            (postInfor.title.length > 20 ? `${postInfor.title.slice(0, 17)}...` : postInfor.title)
                        }</Text>
                        <Text style={styles.rewardCardText}>Upvote Reward: {rewardPoint}
                            <Image
                                source={TourDCToken}
                                style={{ width: 15, height: 15 }}
                            />
                        </Text>

                    </View>
                    <ClaimRewardButton
                        postId={postId}
                        SessionAD={SessionAD}
                        SessionRK={SessionRK}
                    />
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

        return ` ${date}`;
    }

    const ReviewPost = () => {
        // navigation.navigate('ReviewPost');
    }

    //! Tủn this into reward list
    return (
        <View style={styles.RewardPostCard_Container}>
            <TouchableOpacity onPress={ReviewPost}>
                <View style={styles.RewardCard_avatarContainer}>
                    <Image
                        source={{ uri: `${GLOBAL.BASE_URL}/api/post/getImg/${imageName}` }}
                        style={styles.MyTripCard_Image}
                    />
                    <View style={styles.RewardCard_InforContainer}>
                        <Text style={styles.rewardCardBigText}>{
                            postInfor && postInfor.title &&
                            (postInfor.title.length > 20 ? `${postInfor.title.slice(0, 17)}...` : postInfor.title)
                        }</Text>
                        <Text style={styles.rewardCardText}>Total Reward: {postInfor.reward}
                            <Image
                                source={TourDCToken}
                                style={{ width: 15, height: 15 }}
                            />
                        </Text>
                        <Text style={styles.rewardCardText}>Your Reward: {rewardPoint}
                            <Image
                                source={TourDCToken}
                                style={{ width: 15, height: 15 }}
                            />
                        </Text>

                        <Text
                            style={styles.rewardCardText}
                        >Posted in:
                            {convertDateTimeString(Number(postInfor.createTime))}
                        </Text>
                        <ClaimRewardButton
                            postId={postId}
                            SessionAD={SessionAD}
                            SessionRK={SessionRK}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}