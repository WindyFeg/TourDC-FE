import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
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

const Tab = createMaterialTopTabNavigator();
/* 
*/
const MainMyTrip = () => {

    const fetchRewards = async () => {
        // console.log("calls");
        // const reviews = await touristRewardPointOnPostID('0x1a620c351c07763f430897AeaA2883E37cA0aaCD', '0x26eecb00ddef76d58362552f4fd2e782ae49d1e064ccd5b06bd70dcd8039ec35');
        // console.log(reviews);
        // console.log(await getTouristInfor('0x1a620c351c07763f430897AeaA2883E37cA0aaCD'));
        // console.log(await getBalanceOf("0x76E046c0811edDA17E57dB5D2C088DB0F30DcC74"))
        // console.log(await getTouristInfor('0x2936E9fACfF3fb5DDc08d13DB19659ec093cdE69'))
        // console.log(await getDestinationReviews("1"))
        console.log(await web3.getTouristInfor('0x1a620c351c07763f430897AeaA2883E37cA0aaCD'))
        console.log("Get Destination Reviews")
        console.log(await web3.getDestinationReviews("1"))
    };
    fetchRewards();

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
                            source={require('../../assets/destinations/dc_dalat.jpg')} />
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
        <View style={{ flex: 1 }}>
            <HeaderMyTrip
                username="David BeckHam"
                REP="100"
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
