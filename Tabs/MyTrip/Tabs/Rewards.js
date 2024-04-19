import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { RewardUpvoteCard, RewardPostCard } from '../Card/RewardCard.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as web3 from '../../../service/web3.js';
import styles from '../../../styles.js';

/* 
*/
const Rewards = ({ navigation }) => {

    const [SessionAD, setSessionAD] = useState('');
    const [SessionRK, setSessionRK] = useState('');
    const [rewards, setRewards] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const pullToRefreshFunction = () => {
        setIsLoading(true);
        setRefreshing(true);
        fetchUserRewards();
        setRefreshing(false);
    }

    //! Debugging
    console.log("SessionAD: " + SessionAD);
    console.log("Rewards: " + rewards);

    //! Load user address
    useEffect(() => {
        const loadData = async () => {
            try {
                setSessionAD(await AsyncStorage.getItem('SessionAD'));
                setSessionRK(await AsyncStorage.getItem('SessionRK'));
            } catch (error) {
                console.log(error);
            }
        };

        loadData();
    }, []);

    //! Fetch user rewards
    const fetchUserRewards = async () => {
        try {
            console.log('User Address:', SessionAD);
            web3.getListOfReward(SessionAD).then((response) => {
                console.log("Rewards:");
                console.log(response);
                setRewards(response);
                setIsLoading(false);
            });
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (SessionAD != '') fetchUserRewards();
    }, [SessionAD]);

    //! Component
    const LoadingIcon = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#39A7FF" />
            </View>
        );
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={pullToRefreshFunction}
                />
            }
        >

            <Text style={styles.normalText}>You can claimed your reward from your Upvote or posting a review </Text>

            {
                isLoading ? <LoadingIcon /> :
                    <>
                        {Array.from({ length: rewards.length }, (_, i) => (
                            rewards[i].reason == 0 &&
                            <RewardUpvoteCard
                                key={i}
                                navigation={navigation}
                                authorId={rewards[i].author}
                                createTime={rewards[i].createTime}
                                postId={rewards[i].postID}
                                rewardPoint={rewards[i].rewardPoint}
                                SessionAD={SessionAD}
                                SessionRK={SessionRK}
                            />
                        ))}
                        {Array.from({ length: rewards.length }, (_, i) => (
                            rewards[i].reason == 1 &&
                            <RewardPostCard
                                key={i}
                                navigation={navigation}
                                authorId={rewards[i].author}
                                createTime={rewards[i].createTime}
                                postId={rewards[i].postID}
                                rewardPoint={rewards[i].rewardPoint}
                                SessionAD={SessionAD}
                                SessionRK={SessionRK}
                            />
                        ))}
                    </>
            }
        </ScrollView>
    );
};

export default Rewards;
