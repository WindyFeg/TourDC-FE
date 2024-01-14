import React from 'react';
import { View, Text, Image } from 'react-native';
import TourismCard from './Card/TourismCard';

/* 
! Explore Tab
$ Contains all destination, hotel, restaurant, and activity cards
*/
const ExploreTab = ({ navigation }) => {
    return (
        <View>
            {Array.from({ length: 4 }, (_, i) => (
                <TourismCard key={i} navigation={navigation} />
            ))}
        </View>
    );
};


export default ExploreTab;
