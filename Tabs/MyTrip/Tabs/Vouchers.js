import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import VoucherCard from '../Card/VoucherCard.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const GLOBAL = require('../../Custom/Globals.js');
import styles from '../../../styles.js';
import { getUserVouchers } from '../../../service/voucher.js';

/* 
*/
const Vouchers = ({ navigation }) => {

    const [SessionAD, setSessionAD] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [numberOfVoucher, setNumberOfVoucher] = useState(0);
    const [vouchers, setVouchers] = useState([]);

    const pullToRefreshFunction = () => {
        setIsLoading(true);
        setRefreshing(true);
        fetchUserVoucher();
        setRefreshing(false);
    }

    //! Load user address
    useEffect(() => {
        const loadData = async () => {
            try {
                setSessionAD(await AsyncStorage.getItem('SessionAD'));
            } catch (error) {
                console.log(error);
            }
        };

        loadData();
    }, []);

    //! Fetch user ExchangeVoucher history
    const fetchUserVoucher = async () => {
        try {
            console.log('Fetch user voucher:');
            const response = await getUserVouchers(SessionAD);
            console.log("User Voucher", response);
            setVouchers(response);
            setNumberOfVoucher(response.length);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={pullToRefreshFunction}
                />
            }
        >
            <Text style={styles.normalText}>Your voucher after exchange using TourDC Token</Text>

            {Array.from({ length: numberOfVoucher }, (_, i) => (
                <VoucherCard
                    key={i}
                    navigation={navigation}

                    voucherAmount={vouchers[i].amount}
                    voucherContent={vouchers[i].content}
                    voucherId={vouchers[i].id}
                    voucherDiscount={vouchers[i].discount}
                    voucherExpireDate={vouchers[i].expiry}
                    voucherPrice={vouchers[i].price}
                />
            ))}
        </ScrollView>
    );
};


export default Vouchers;
