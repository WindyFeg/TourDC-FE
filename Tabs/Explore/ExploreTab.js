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
            {Array.from({ length: 10 }, (_, i) => (
                <TourismCard
                    key={i}
                    navigation={navigation}

                    // Props
                    name="Da Lat"
                    address="Lam Dong"
                    score="4.5"
                />
            ))}
        </View>
    );
};


export default ExploreTab;
