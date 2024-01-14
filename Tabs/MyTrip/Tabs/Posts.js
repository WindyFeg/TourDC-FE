import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import PostCard from '../Card/PostCard.js';

/* 
*/
const Posts = ({ navigation }) => {
    return (
        <View>
            <Text>Posts</Text>

            {Array.from({ length: 4 }, (_, i) => (
                <PostCard key={i} navigation={navigation} />
            ))}
        </View>
    );
};


export default Posts;
