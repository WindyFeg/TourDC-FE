import React, { useState } from 'react';
import { View, Text, Image, Button, ScrollView } from 'react-native';
import PostCard from '../Card/PostCard.js';
import * as web3 from '../../../service/web3.js';
import { useAccount } from 'wagmi'

/* 
*/
const Posts = ({ navigation }) => {
    const [userAddress, setUserAddress] = useState('');
    const [numberOfPosts, setNumberOfPosts] = useState(0);
    const [response, setResponse] = useState([]);
    const { address, isConnecting, isDisconnected } = useAccount()


    const fetchUserPosts = async () => {
        // console.log("all post")
        // console.log(await web3.getTouristReviews(address))
        setResponse(await web3.getTouristReviews(address))
        setNumberOfPosts(response.length)
    };
    fetchUserPosts();

    return (
        <View>
            <Text>Posts</Text>

            {Array.from({ length: numberOfPosts }, (_, i) => (
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
        </View>
    );
};


export default Posts;
