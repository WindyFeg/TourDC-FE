import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ActivityIndicator, ScrollView } from 'react-native';
import TripCard from '../Card/TripCard.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const GLOBAL = require('../../Custom/Globals.js');

/* 
*/
const Trips = ({ navigation }) => {
    const [userAddress, setUserAddress] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    //! Load user address
    useEffect(() => {
        const loadData = async () => {
            try {
                setUserAddress(await AsyncStorage.getItem('address'));
            } catch (error) {
                console.log(error);
            }
        };

        loadData();
    }, []);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log("User ss: " + userAddress);
                const response = await axios.get("http://192.168.1.7:5500/api/post/getCheckInPosts", {
                    params: {
                        address: userAddress
                    },
                    headers: { 'Content-Type': 'application/json' }
                });
                console.log(response);
                setIsLoading(false);
            }
            catch (error) {
                console.log("AAAA");
                console.log(error);
                setIsLoading(false);
            }
        };

        if (userAddress != '') fetchPosts();
    }, [userAddress]);

    console.log("Save address in trips: " + userAddress);

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
                    Array.from({ length: 4 }, (_, i) => (
                        <TripCard key={i} navigation={navigation} />
                    ))
            }
        </ScrollView>
    );
};


export default Trips;
