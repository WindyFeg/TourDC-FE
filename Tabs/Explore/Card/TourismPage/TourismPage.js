import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-web';
import ReviewShort from '../Review/ReviewShort.js';
import WhatPeopleSay from '../Review/WhatPeopleSay.js';

/* 
*/
const TourismPage = ({ navigation }) => {
    return (
        <View>
            <Text>DA LAT</Text>
            <Text>MAIN TOURISM PAGE</Text>
            <Text>Description</Text>
            <Text>Review</Text>

            {Array.from({ length: 4 }, (_, i) => (
                <WhatPeopleSay key={i} navigation={navigation} />
            ))}

            {Array.from({ length: 4 }, (_, i) => (
                <ReviewShort key={i} navigation={navigation} />
            ))}
        </View>
    );
};


export default TourismPage;
