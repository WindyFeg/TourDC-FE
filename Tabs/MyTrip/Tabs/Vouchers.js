import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import VoucherCard from '../Card/VoucherCard.js';
import styles from '../../../styles.js';
/* 
*/
const Vouchers = ({ navigation }) => {
    return (
        <View>
            <Text style={styles.normalText}>Your voucher after exchange using TourDC Token</Text>
            {Array.from({ length: 4 }, (_, i) => (
                <VoucherCard key={i} navigation={navigation} />
            ))}
        </View>
    );
};


export default Vouchers;
