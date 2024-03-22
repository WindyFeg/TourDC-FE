import React, { useEffect, useState } from 'react';
import { Button, View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import TourismCard from './Card/TourismCard';
import axios from 'axios';
const GLOBAL = require('../Custom/Globals.js');

const ExploreTab = ({ navigation }) => {
    const [numberDestinations, setNumberDestinations] = useState(0);
    const [exploreTabData, setExploreTabData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add this line

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

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View>
            <ScrollView>
                {Array.from({ length: numberDestinations }, (_, i) => (
                    console.log('ExploreTabData:', exploreTabData[i]._id),
                    <TourismCard
                        key={i}
                        navigation={navigation}
                        // Props
                        name={exploreTabData[i].name}
                        address={exploreTabData[i].address}
                        rate={exploreTabData[i].rate}
                        thumbnail={exploreTabData[i].thumbnail}
                        id={exploreTabData[i]._id}
                        list_imgs={exploreTabData[i].list_imgs}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default ExploreTab;