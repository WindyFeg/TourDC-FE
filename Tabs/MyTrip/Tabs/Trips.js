import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ActivityIndicator, ScrollView } from 'react-native';
import TripCard from '../Card/TripCard.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const GLOBAL = require('../../Custom/Globals.js');

/* 
*/
const Trips = ({ navigation }) => {
    const [numberOfTrips, setNumberOfTrips] = useState(0);
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

    //! Fetch user trips
    useEffect(() => {
        const fetchPosts = async () => {
            axios({
                method: 'post',
                url: `${GLOBAL.BASE_URL}/api/post/getCheckInPosts`,
                data: {
                    "address": userAddress
                }
            }).then((response) => {
                setResponse(response.data.data);
                setNumberOfTrips(response.data.data.length);
                setIsLoading(false);
            }).catch((error) => {
                console.error('Error:', error);
                setIsLoading(false);
            });
        };

        if (userAddress != '') fetchPosts();
    }, [userAddress]);


    const LoadingIcon = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#39A7FF" />
            </View>
        );
    }

    return (
        <ScrollView>
            <Text>You have 1 trip left to review. Please review them to earn bonus points!</Text>

            {
                isLoading ? <LoadingIcon /> :
                    Array.from({ length: numberOfTrips }, (_, i) => (
                        <TripCard key={i}
                            navigation={navigation}

                            // Props
                            postId={response[i]._id}
                            postList_imgs={response[i].list_imgs}
                            trHash={response[i].trHash}
                            placeId={response[i].placeid}
                            checkInTime={response[i].checkInTime}
                        />
                    ))
            }
        </ScrollView>
    );
};


export default Trips;
