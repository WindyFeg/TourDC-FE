import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import CollectionCard from '../Card/CollectionCard.js';

/* 
*/
const Rewards = ({ navigation }) => {
    return (
        <View>

            <Text>Rewards</Text>

            {Array.from({ length: 4 }, (_, i) => (
                <CollectionCard key={i} navigation={navigation} />
            ))}
        </View>
    );
};

export default Rewards;
