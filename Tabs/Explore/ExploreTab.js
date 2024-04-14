import React, { useEffect, useRef, useState } from 'react';
import { Animated, Button, View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import TourismCard from './Card/TourismCard';
import axios from 'axios';
const GLOBAL = require('../Custom/Globals.js');

const ExploreTab = ({ navigation }) => {
    const [numberDestinations, setNumberDestinations] = useState(0);
    const [exploreTabData, setExploreTabData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useEffect(() => {
        axios({
            method: 'get',
            url: `${GLOBAL.BASE_URL}/api/destination/getAllDestinations`,
        }).then((response) => {
            setNumberDestinations(response.data.length);
            setExploreTabData(response.data);
            setIsLoading(false);
        }).catch((error) => {
            console.error('Error:', error);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }
        ).start();
    }, [fadeAnim]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#39A7FF" />
            </View>
        );
    }

    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
            <ScrollView vertical={true}>
                {Array.from({ length: numberDestinations }, (_, i) => (
                    console.log('ExploreTabData:', exploreTabData[i]._id),
                    <Animated.View style={{ opacity: fadeAnim }} key={i}>
                        <TourismCard
                            navigation={navigation}
                            // Props
                            placeName={exploreTabData[i].name}
                            placeAddress={exploreTabData[i].address}
                            placeRate={exploreTabData[i].rate}
                            placeThumbnail={exploreTabData[i].thumbnail}
                            placeId={exploreTabData[i]._id}
                            placeList_imgs={exploreTabData[i].list_imgs}
                        />
                    </Animated.View>
                ))}
            </ScrollView>
        </View>
    );
};

export default ExploreTab;