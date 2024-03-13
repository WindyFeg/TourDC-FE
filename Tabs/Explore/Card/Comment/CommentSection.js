import React from 'react';
import { View, Text } from 'react-native';
import Comment from './Comment.js';

const CommentSection = () => {
    return (
        <View style={{ backgroundColor: 'white' }}>
            {
                Array.from({ length: 4 }).map((_, i) => (
                    <Comment />
                ))
            }
        </View>
    );
};

export default CommentSection;