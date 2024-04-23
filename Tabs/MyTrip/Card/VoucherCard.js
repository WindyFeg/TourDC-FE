import React, { useState, useEffect } from 'react';
import { Button, View, Text, Image, TouchableOpacity } from 'react-native';
import ReviewPost from '../../Explore/Card/Review/ReviewPost.js';
import styles from '../../../styles.js';
import SvgComponent from '../../../assets/SvgComponent.js';
import axios from 'axios';
import TourDCToken from '../../../assets/logo/DCToken.png';
import GLOBAL from '../../Custom/Globals.js';
import * as web3 from '../../../service/web3.js';
/* 
! Tourism Page
$ Contains information of a destination, hotel, restaurant, or activity
*/
const PostCard = ({ navigation }) => {

    async function showVoucherLogic() {
        console.log('Show voucher logic');
    }

    const UseVoucher = () => {
    }

    function convertDateTimeString(dateTimeString) {
        const dateObject = new Date(dateTimeString * 1000);
        if (isNaN(dateObject.getTime())) {
            return null; // Return null for invalid strings
        }
        const time = dateObject.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        const date = dateObject.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

        return `${date}`;
    }

    const VoucherContent = () => {
        return <View>
            {/* Title */}
            <Text style={styles.ExchangeVoucherCard_TextBig}>
                Ueno Park
                <SvgComponent name="VoucherSmall" />
            </Text>
            <Text style={styles.tripCardText}>Discount 50%</Text>
            {/* Date */}
            <Text style={styles.tripCardText}>11/2/3312</Text>
            <TouchableOpacity
                onPress={showVoucherLogic}
                style={styles.Review_BlackBtn}
            >
                <Text style={styles.Review_BlackBtn_Text}>Use voucher</Text>
            </TouchableOpacity>
        </View>
    }

    return (
        <View style={styles.PostCard_Container}>
            <TouchableOpacity
                onPress={ReviewPost}
                style={{ flexDirection: 'row', alignItems: 'center', width: "60%" }}>
                {/* Image */}
                <Image
                    // source={{ uri: `${GLOBAL.BASE_URL}/api/post/getImg/${imageName}` }}
                    source={{ uri: `${GLOBAL.BASE_URL}/api/post/getImg/1711987631923-tourdc-bai-bien-bali-2.jpg` }}
                    style={styles.MyTripCard_Image}
                />
                {/* Content */}
                <VoucherContent />
            </TouchableOpacity>
        </View>
    );
};


export default PostCard;
