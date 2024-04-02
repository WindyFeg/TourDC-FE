import React, { useEffect, useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExploreTab from '../Explore/ExploreTab';
import SvgComponent from '../../assets/SvgComponent';
import styles from '../../styles.js';
import DCToken from './DCToken.js';
import Trips from './Tabs/Trips.js';
import MyVoucher from './Tabs/MyVoucher.js';
import Posts from './Tabs/Posts.js';
import Collections from './Tabs/Collections.js';
import * as web3 from '../../service/web3.js';
import { useAccount } from 'wagmi';
import axios from 'axios';
const GLOBAL = require('../Custom/Globals.js');

const Tab = createMaterialTopTabNavigator();
/* 
*/
const MainMyTrip = () => {
    // const { address, isConnecting, isDisconnected } = useAccount()
    const [userAddress, setUserAddress] = useState('');
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    //! Load user address
    useEffect(() => {
        const loadData = async () => {
            try {
                setUserAddress(
                    await
                        AsyncStorage.getItem('address'));
            } catch (error) {
                console.log(error);
            }
        };

        loadData();
    }, []);


    //! Fetch user data from blockchain
    // 0": "Phong", "1": "Tran", "2": "11111111111111", "3": 15n, "4": 100n, "REP": 15n, "VP": 100n, "__length__": 5, "firstName": "Phong", "lastName": "Tran", "phoneNumber": "11111111111111"}
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setUserData(await web3.getTouristInfor(userAddress));
            }
            catch (error) {
                console.log(error);
            }
        };

        if (userAddress != '') fetchUser();
    }, [userAddress]);

    const HeaderMyTrip = (props) => (
        <View>
            <ImageBackground
                source={require('../../assets/MyTrip/gradientColor.png')}
                style={styles.MyTrip_headerBackground}
                imageStyle={styles.MyTrip_headerBackground}
            >
                {/* Avatar and Icon */}
                <View style={styles.MyTrip_headerContainer}>
                    <View style={styles.MyTrip_backgroundUserAvatar}>
                        <Image
                            style={styles.MyTrip_userAvatar}
                            source={{ uri: `${GLOBAL.BASE_URL}/api/user/getAvatar/${userAddress}` }} />
                    </View>

                    <View style={styles.MyTrip_headerText}>
                        {/* Username section */}
                        <Text style={{ fontFamily: 'InterL', fontSize: 16 }}>
                            Hello, Traveler
                        </Text>
                        <Text style={{ fontFamily: 'InterB', fontSize: 18 }}>
                            {props.username}
                        </Text>

                        {/* Icon Sections */}
                        <View style={styles.MyTrip_headerIconContainer}>
                            <View style={styles.MyTrip_headerIcon}>
                                <SvgComponent name="UserVerification" style={styles.MyTrip_headerIcon} />
                                <Text style={{ fontFamily: 'InterB', fontSize: 9 }}>Verified</Text>
                            </View>

                            <View style={styles.MyTrip_headerIcon}>
                                <SvgComponent name="Reputation" />
                                <Text style={{ fontFamily: 'InterB', fontSize: 9 }}>REP: {props.REP}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Token Section */}
                    <DCToken />

                </View>
                {/* Stats Section */}
                <UserStats
                    Posts={props.Posts}
                    Trips={props.Trips}
                    Upvote={props.Upvote}
                />


            </ImageBackground>
        </View>
    )

    const UserStats = (props) => (
        <View style={styles.MyTrip_headerStatsContainer}>
            <View style={styles.MyTrip_headerStat}>
                <Text style={styles.MyTrip_headerStatText}>
                    {props.Posts}
                </Text>
                <Text style={styles.MyTrip_headerStatText}>Posts</Text>
            </View>
            <Separator />
            <View style={styles.MyTrip_headerStat}>
                <Text style={styles.MyTrip_headerStatText}>
                    {props.Trips}
                </Text>
                <Text style={styles.MyTrip_headerStatText}>
                    Trips
                </Text>
            </View>
            <Separator />
            <View style={styles.MyTrip_headerStat}>
                <Text style={styles.MyTrip_headerStatText}>
                    {props.Upvote}
                </Text>
                <Text style={styles.MyTrip_headerStatText}>
                    Upvote
                </Text>
            </View>
        </View>
    )

    const Separator = () => (
        (< Text style={{ borderLeftWidth: 2, borderColor: '#D9D9D9', marginLeft: 10, marginRight: 10, opacity: 1 }
        }></Text >)
    )

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <HeaderMyTrip
                username={userData.firstName + " " + userData.lastName}
                REP={userData.REP}
                Posts="10"
                Trips="5"
                Upvote="20"
            />

            <Tab.Navigator
                screenOptions={({ route }) => (styles.MyTrip_Navigator)}
            >
                <Tab.Screen name="Posts" component={Posts} />
                <Tab.Screen name="Trips" component={Trips} />
                <Tab.Screen name="Collections" component={Collections} />
                <Tab.Screen name="My Voucher" component={MyVoucher} />
            </Tab.Navigator>
        </View>
    );
};


export default MainMyTrip;
