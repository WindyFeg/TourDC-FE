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
            const response = axios.post(`${GLOBAL.BASE_URL}/api/transaction/getTransactions`, { address: SessionAD });
            console.log(response);
            // setTransactions(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (SessionAD != '') fetchUserTransactionHistory();
    }, [SessionAD]);

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
                            <Text style={styles.TransactionCard_TextCopy}>
                                ({postID})
                            </Text>
                        </View>

                        {/* Date */}
                        <Text style={styles.TransactionCard_Text}>{transactionDate}</Text>

                        {/* Author address */}
                        <Text style={styles.TransactionCard_Text}>From: {userAddress}</Text>

                        {/* Hash and token */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={styles.TransactionCard_Text}>Transaction Hash:</Text>
                            <Text style={styles.TransactionCard_TextCopy}>{transactionHash}</Text>

                            <Text style={styles.TransactionCard_TextBig}> + {numberOfToken}
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
                    <TransactionCard
                        transactionHash={"1234512345"}
                        postID={"0x1234567890"}
                        transactionDate={"2021-09-01"}
                        reason={"Upvote Reward"}
                        numberOfToken={"10"}
                        userAddress={"0x1234567890"}
                    />
                    <TransactionCard
                        transactionHash={"0x1234567890"}
                        postID={"0x1234567890"}
                        transactionDate={"2021-09-01"}
                        reason={"Post"}
                        numberOfToken={"10"}
                        userAddress={"0x1234567890"}
                    />
                    <TransactionCard
                        transactionHash={"0x1234567890"}
                        postID={"0x1234567890"}
                        transactionDate={"2021-09-01"}
                        reason={"Post"}
                        numberOfToken={"10"}
                        userAddress={"0x1234567890"}
                    />
                    <TransactionCard
                        transactionHash={"0x1234567890"}
                        postID={"0x1234567890"}
                        transactionDate={"2021-09-01"}
                        reason={"Post"}
                        numberOfToken={"10"}
                        userAddress={"0x1234567890"}
                    />
                    <TransactionCard
                        transactionHash={"0x1234567890"}
                        postID={"0x1234567890"}
                        transactionDate={"2021-09-01"}
                        reason={"Post"}
                        numberOfToken={"10"}
                        userAddress={"0x1234567890"}
                    />
                </ScrollView>
            </View>
        </View>
    );
};


export default TransactionHistory;
