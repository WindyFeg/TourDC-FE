import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, ScrollView, ActivityIndicator } from 'react-native';
import PostCard from '../Card/PostCard.js';
import * as web3 from '../../../service/web3.js';
import { useAccount } from 'wagmi'
import AsyncStorage from '@react-native-async-storage/async-storage';

/* 
*/
const Posts = ({ navigation }) => {
    const [numberOfPosts, setNumberOfPosts] = useState(0);
    const [response, setResponse] = useState([]);
    const [userAddress, setUserAddress] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    //! Load user address
    useEffect(() => {
        const loadData = async () => {
            try {
                setUserAddress(await AsyncStorage.getItem('SessionAD'));
            } catch (error) {
                console.log(error);
            }
        };

        loadData();
    }, []);

    //! Fetch user posts
    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await web3.getTouristReviews(userAddress);
                setResponse(response);
                setNumberOfPosts(response.length);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        if (userAddress != '') fetchUserPosts();
    }, [userAddress]);


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
            backgroundColor="#F9F9F9"
        >
            <Text>All of your reviews</Text>

            {
                isLoading ? <LoadingIcon /> :
                    Array.from({ length: numberOfPosts }, (_, i) => (
                        <PostCard
                            key={i}
                            navigation={navigation}

                            // Props
                            postId={response[i].postId}
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
