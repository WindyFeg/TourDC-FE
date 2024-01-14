import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import CollectionCard from '../Card/CollectionCard.js';

/* 
*/
const Collections = ({ navigation }) => {
    return (
        <View>

            <Text>Collections</Text>

            {Array.from({ length: 4 }, (_, i) => (
                <CollectionCard key={i} navigation={navigation} />
            ))}
        </View>
    );
};


export default Collections;
