import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, RefreshControl } from 'react-native';
import { Button } from 'react-native-web';
import styles from '../../styles.js';
import GLOBAL from '../Custom/Globals.js';
import axios from 'axios';
import BackNavigationButton from '../Custom/BackNavigationButton.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgComponent from '../../assets/SvgComponent.js';
import TourDCToken from '../../assets/logo/DCToken.png';
import * as Clipboard from 'expo-clipboard';
import * as WebBrowser from 'expo-web-browser';
/* 
! Tourism Page
$ Contains information of a destination, hotel, restaurant, or activity
*/
const TransactionHistory = ({ navigation }) => {

    const [SessionAD, setSessionAD] = useState('');
    const [numberOfTransactions, setNumberOfTransactions] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const pullToRefreshFunction = () => {
        setIsLoading(true);
        setRefreshing(true);
        fetchUserTransactionHistory();
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

    //! Fetch user transaction history
    const fetchUserTransactionHistory = async () => {
        try {
            console.log('User Address:', SessionAD);
            const response = await axios.post(`${GLOBAL.BASE_URL}/api/transaction/getTransactions`, { address: SessionAD });
            console.log("fetchUserTransactionHistory", response.data.data);
            setTransactions(response.data.data);
            setNumberOfTransactions(response.data.data.length);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (SessionAD != '') fetchUserTransactionHistory();
    }, [SessionAD]);

    const ViewTransaction = async (hash) => {
        const url = `https://explorer.vbchain.vn/vibi/tx/${hash}`
        await WebBrowser.openBrowserAsync(url);
    }

    const copyToClipboard = async (data) => {
        if (data == null) {
            return;
        }
        await Clipboard.setStringAsync(data);
    };

    function convertDateTimeString(dateTimeString) {
        const dateObject = new Date(dateTimeString * 1000);
        if (isNaN(dateObject.getTime())) {
            return "? Ago";
        }
        const time = dateObject.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        const date = dateObject.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return `${time}, ${date}`;
    }

    const TransactionCard = (props) => {
        const {
            transactionHash,
            postID,
            transactionDate,
            reason,
            numberOfToken,
            userAddress,
        } = props;

        return (
            <View style={styles.TransactionCard_Container}>
                <View style={styles.TransactionCard_Inline}>
                    <View style={styles.TransactionCard_icon}>
                        <SvgComponent name="SendTransaction" />
                    </View>
                    <View style={styles.TransactionCard_Information}>

                        {/* Type of transaction */}
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={styles.TransactionCard_TextBig}>
                                {reason} {' '}
                            </Text>
                            <TouchableOpacity
                                onPress={() => copyToClipboard(postID)}>
                                <Text style={styles.TransactionCard_TextCopy}>
                                    ${postID.slice(0, 5)}...${postID.slice(-5)}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Date */}
                        <Text style={styles.TransactionCard_Text}>{transactionDate}</Text>

                        {/* Author address */}
                        <Text style={styles.TransactionCard_Text}>From: {`${userAddress.slice(0, 5)}...${userAddress.slice(-5)}`}</Text>

                        {/* Hash and token */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={styles.TransactionCard_Text}>Transaction Hash:</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    ViewTransaction(transactionHash);
                                    copyToClipboard(transactionHash);
                                }}

                            >
                                <Text style={styles.TransactionCard_TextCopy}>{
                                    `${transactionHash.slice(0, 5)}...${transactionHash.slice(-5)}`
                                }</Text>
                            </TouchableOpacity>

                            <Text style={styles.TransactionCard_TextBig}> + {numberOfToken / (10 ** 18)}
                                <Image
                                    source={TourDCToken}
                                    style={{ width: 15, height: 15 }}
                                />
                            </Text>
                        </View>
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

            <View style={styles.TransactionHistory_Container}>
                <View style={styles.Transaction_SearchBar}>
                    <TouchableOpacity >
                        <SvgComponent name="Search" />
                    </TouchableOpacity>

                    <TextInput
                        style={styles.Transaction_SearchInput}
                        placeholder="Search Transaction"
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

                    {
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
                    }
                </ScrollView>
            </View>
        </View>
    );
};


export default TransactionHistory;
