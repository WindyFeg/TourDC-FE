import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, RefreshControl } from 'react-native';
import { Button } from 'react-native-web';
import styles from '../../styles.js';
import GLOBAL from '../Custom/Globals.js';
import axios from 'axios';
import BackNavigationButton from '../Custom/BackNavigationButton.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import SvgComponent from '../../assets/SvgComponent.js';
import * as WebBrowser from 'expo-web-browser';
import { getAllVoucher } from '../../service/voucher.js'
import TourDCToken from '../../assets/logo/DCToken.png';
import { autoExchangeVoucher } from '../../service/signmessage.js';

/* 
! Tourism Page
$ Contains information of a destination, hotel, restaurant, or activity
*/
const ExchangeVoucher = ({ navigation }) => {

    const [SessionAD, setSessionAD] = useState('');
    const [SessionRK, setSessionRK] = useState('');
    const [numberOfVoucher, setNumberOfVoucher] = useState(0);
    const [vouchers, setVouchers] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const pullToRefreshFunction = () => {
        setIsLoading(true);
        setRefreshing(true);
        fetchUserExchangeVoucher();
        setRefreshing(false);
    }

    //! Load user address
    useEffect(() => {
        const loadData = async () => {
            try {
                setSessionAD(await AsyncStorage.getItem('SessionAD'));
                setSessionRK(await AsyncStorage.getItem('SessionRK'));
            } catch (error) {
                console.log(error);
            }
        };

        loadData();
    }, []);

    //! Fetch user ExchangeVoucher history
    const fetchUserExchangeVoucher = async () => {
        try {
            console.log('Fetch all voucher:');
            const response = await getAllVoucher();
            console.log("All Voucher", response.data.data);
            setVouchers(response.data.data);
            setNumberOfVoucher(response.data.data.length);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (SessionAD != '') fetchUserExchangeVoucher();
    }, [SessionAD]);

    const ExchangeVoucherLogic = async (voucherId) => {
        // console.log('Exchange Voucher');
        // try {
        //     const response = await autoExchangeVoucher(SessionRK, SessionAD, voucherId);
        //     console.log("Exchange Voucher", response.data.data);
        //     fetchUserExchangeVoucher();
        // } catch (error) {
        //     console.log(error);
        // }
    }

    // const ViewTransaction = async (hash) => {
    //     const url = `https://explorer.vbchain.vn/vibi/tx/${hash}`
    //     await WebBrowser.openBrowserAsync(url);
    // }

    // const copyToClipboard = async (data) => {
    //     if (data == null) {
    //         return;
    //     }
    //     await Clipboard.setStringAsync(data);
    // };

    function convertDateTimeString(dateTimeString) {
        const dateObject = new Date(dateTimeString * 1000);
        if (isNaN(dateObject.getTime())) {
            return "? Ago";
        }
        const time = dateObject.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        const date = dateObject.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return `${time}, ${date}`;
    }

    const ExchangeVoucherCard = (props) => {
        const {
            voucherId,
            voucherAmount,
            voucherExpireDate,
            voucherDiscount,
            voucherContent,
            voucherPrice,
        } = props;

        return (
            <View style={styles.ExchangeVoucherCard_Container}>
                <View style={styles.ExchangeVoucherCard_Inline}>
                    <Image
                        source={{ uri: `${GLOBAL.BASE_URL}/api/post/getImg/1711987631923-tourdc-bai-bien-bali-2.jpg` }}
                        // source={{ uri: `${GLOBAL.BASE_URL}/api/post/getImg/${imageName}` }}
                        style={styles.ExchangeVoucherCard_Image}
                    />

                    {/* </View> */}
                    <View style={styles.TransactionCard_Information}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={styles.ExchangeVoucherCard_TextBig}>
                                {voucherContent}
                            </Text>
                        </View>
                        <View style={styles.ExchangeVoucherCard_PriceContainer}>
                            <Image
                                source={TourDCToken}
                                style={{ width: 15, height: 15 }}
                            />
                            <Text style={styles.ExchangeVoucherCardText}> {voucherPrice}
                            </Text>
                        </View>

                        {/* Discount */}
                        <Text style={styles.TransactionCard_Text}>{voucherDiscount}</Text>

                        {/* Date */}
                        <Text style={styles.TransactionCard_Text}>{voucherExpireDate}</Text>

                        <TouchableOpacity
                            onPress={ExchangeVoucherLogic(voucherId)}
                            style={styles.Review_BlueBtn}
                        >
                            <Text style={styles.Review_BlueBtn_Text}>Exchange Voucher</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View>
            <BackNavigationButton
                navigation={navigation}
            />

            <View style={[styles.ExchangeVoucher_Container, styles.TransactionHistory_Container]}>
                <View style={styles.Transaction_SearchBar}>
                    <TouchableOpacity >
                        <SvgComponent name="Search" />
                    </TouchableOpacity>

                    <TextInput
                        style={styles.Transaction_SearchInput}
                        placeholder="Search Exchange Voucher"
                    />
                </View>

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={pullToRefreshFunction}
                        />
                    }
                >

                    {/*
                        Array.from({ length: numberOfTransactions }, (_, i) => (
                            <TransactionCard
                                key={i}
                                transactionHash={transactions[i].trHash}
                                postID={transactions[i].postID}
                                transactionDate={transactions[i].date}
                                reason={transactions[i].reason}
                                numberOfToken={transactions[i].amount}
                                userAddress={transactions[i].userAddr}
                            />
                        ))
                    */}
                    <ExchangeVoucherCard
                        voucherId="1"
                        voucherAmount="1"
                        voucherExpireDate="17:00 - 13/01/2023"
                        voucherDiscount="Discount 50%"
                        voucherContent="Ueno Park"
                        voucherPrice="1"
                    />
                </ScrollView>
            </View>
        </View>
    );
};


export default ExchangeVoucher;
