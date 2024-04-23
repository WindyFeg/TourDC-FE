import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import PostCard from '../Card/PostCard.js';
import * as web3 from '../../../service/web3.js';
import { useAccount } from 'wagmi'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const GLOBAL = require('../../Custom/Globals.js');
import styles from '../../../styles.js';
/* 
*/
const Posts = ({ navigation }) => {
    const [numberOfPosts, setNumberOfPosts] = useState(0);
    const [response, setResponse] = useState([]);
    const [SessionAD, setSessionAD] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const pullToRefreshFunction = () => {
        setIsLoading(true);
        setRefreshing(true);
        fetchUserPosts();
        setRefreshing(false);
    }

    //! Load user address
    useEffect(() => {
        const loadData = async () => {
            try {
                setSessionAD(await AsyncStorage.getItem('SessionAD'));
            } catch (error) {
                console.log(error);
            }
        };

        loadData();
    }, []);

    //! Fetch user posts
    const fetchUserPosts = async () => {
        try {
            console.log('úe:', SessionAD);
            const response = await web3.getTouristReviews(SessionAD);
            setResponse(response);
            setNumberOfPosts(response.length);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (SessionAD != '') fetchUserPosts();
    }, [SessionAD]);


    const LoadingIcon = () => {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
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
            backgroundColor="#F9F9F9"
        >
            <Text style={styles.normalText}>All of your reviews</Text>

            {
                isLoading ? <LoadingIcon /> :
                    Array.from({ length: numberOfPosts }, (_, i) => (
                        <PostCard
                            key={i}
                            navigation={navigation}

                            // Props
                            postId={response[i].postID}
                            postTitle={response[i].title}
                            postReview={response[i].review}
                            placeId={response[i].placeId}
                            placeName={response[i].placeName}
                            placeRate={response[i].rate}
                            placeAddress={response[i].placeAddress}
                            createTime={response[i].createTime}
                            upvoteNumber={response[i].upvoteNum}
                        />
                    ))}
        </ScrollView>
    );
};


export default Posts;
