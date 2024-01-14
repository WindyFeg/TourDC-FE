import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import TripCard from '../Card/TripCard.js';

/* 
*/
const Trips = ({ navigation }) => {
    return (
        <View>

            <Text>Trips</Text>

            {Array.from({ length: 4 }, (_, i) => (
                <TripCard key={i} navigation={navigation} />
            ))}
        </View>
    );
};


export default Trips;
