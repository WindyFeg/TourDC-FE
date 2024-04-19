import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import TripCard from '../Card/TripCard.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const GLOBAL = require('../../Custom/Globals.js');
import styles from '../../../styles.js';

/* 
*/
const Trips = ({ navigation }) => {
    const [numberOfTrips, setNumberOfTrips] = useState(0);
    const [response, setResponse] = useState([]);
    const [userAddress, setUserAddress] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const pullToRefreshFunction = () => {
        setIsLoading(true);
        setRefreshing(true);
        fetchUserTrips();
        setRefreshing(false);
    }

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
    const fetchUserTrips = async () => {
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

    useEffect(() => {
        if (userAddress != '') fetchUserTrips();
    }, [userAddress]);


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
            <Text style={styles.normalText}>You have {numberOfTrips} trip left to review. Please review them to earn bonus points!</Text>

            {
                isLoading ? <LoadingIcon /> :
                    Array.from({ length: numberOfTrips }, (_, i) => (
                        <TripCard key={i}
                            navigation={navigation}

                            // Props
                            postId={response[i].postID}
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
