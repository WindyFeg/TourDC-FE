import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-web';
import styles from '../../../../styles';
import ReviewPostHeader from './ReviewHeader';
/* 
*/
const ReviewPost = () => {
    return (
        <View>
            <ReviewPostHeader />

            <Text>My Point</Text>
            <Text>Point History</Text>
            <Text>+ 32 point</Text>
            <Text>Exchange HCMUT Voucher</Text>
        </View>
    );
};


export default ReviewPost;
