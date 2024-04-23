import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
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
import VoucherImage from '../../assets/voucher/voucher.jpg';

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
            console.log("All Voucher", response);
            setVouchers(response);
            setNumberOfVoucher(response.length);
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
        console.log('Exchange Voucher');
        try {
            const response = await autoExchangeVoucher(SessionRK, SessionAD, voucherId);
            console.log("Exchange Voucher", response);
        } catch (error) {
            console.log(error);
        }
    }

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
                        source={VoucherImage}
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
                        <Text style={styles.TransactionCard_Text}>Discount: {voucherDiscount}%</Text>

                        {/* Date */}
                        <Text style={styles.TransactionCard_Text}>{voucherExpireDate}</Text>

                        <TouchableOpacity
                            onPress={() => ExchangeVoucherLogic(voucherId)}
                            style={styles.Review_BlueBtn}
                        >
                            <Text style={styles.Review_BlueBtn_Text}>Exchange Voucher</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    const LoadingIcon = () => {
        return (
            <ActivityIndicator size="large" color="#39A7FF"
                style={{
                    margin: 10
                }}
            />
        )
    }

    return (
        <>
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
                    <Text style={styles.normalText}>All of the vouchers below must exchange through TourDC token and will be listed on MyTrip</Text>

                    {/* List of vouchers */}
                </View>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={pullToRefreshFunction}
                    />
                }
            >

                {
                    isLoading ? <LoadingIcon /> :
                        Array.from({ length: numberOfVoucher }, (_, i) => (
                            <ExchangeVoucherCard
                                key={i}
                                voucherId={vouchers[i].id}
                                voucherAmount={vouchers[i].amount}
                                voucherExpireDate={convertDateTimeString(vouchers[i].expiry)}
                                voucherDiscount={vouchers[i].discount}
                                voucherContent={vouchers[i].content}
                                voucherPrice={vouchers[i].price}
                            />
                        ))
                }
            </ScrollView>
        </>
    );
};


export default ExchangeVoucher;
