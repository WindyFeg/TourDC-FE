import React from 'react';
import { Button, View, Text, Image, TouchableOpacity } from 'react-native';
import ReviewPost from '../../Explore/Card/Review/ReviewPost.js';

/* 
! Tourism Page
$ Contains information of a destination, hotel, restaurant, or activity
*/
const PostCard = ({ navigation }) => {

    const UseVoucher = () => {
    }

    return (
        <View>
            <TouchableOpacity onPress={ReviewPost}>
                <Text>Fucking Voucher</Text>
                <Button
                    onPress={UseVoucher}
                    title='Use now'
                ></Button>
            </TouchableOpacity>
        </View>
    );
};


export default PostCard;
