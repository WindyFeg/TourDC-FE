import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import VoucherCard from '../Card/VoucherCard.js';
/* 
*/
const MyVoucher = ({ navigation }) => {
    return (
        <View>
            <Text>My Voucher</Text>
            {Array.from({ length: 4 }, (_, i) => (
                <VoucherCard key={i} navigation={navigation} />
            ))}
        </View>
    );
};


export default MyVoucher;
