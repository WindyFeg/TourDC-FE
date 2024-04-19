import React, { useEffect, useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExploreTab from '../Explore/ExploreTab';
import SvgComponent from '../../assets/SvgComponent';
import styles from '../../styles.js';
import DCToken from './DCToken.js';
import Trips from './Tabs/Trips.js';
import Vouchers from './Tabs/Vouchers.js';
import Posts from './Tabs/Posts.js';
import Rewards from './Tabs/Rewards.js';
import * as web3 from '../../service/web3.js';
import { useAccount } from 'wagmi';
import axios from 'axios';
import GLOBAL from '../Custom/Globals.js';
import * as Clipboard from 'expo-clipboard';

const Tab = createMaterialTopTabNavigator();
/* 
*/
const MainMyTrip = () => {
    // const { address, isConnecting, isDisconnected } = useAccount()
    const [SessionAD, setSessionAD] = useState('');
    const [SessionRK, setSessionRK] = useState('');
    const [userData, setUserData] = useState({});
    const [userREP, setUserREP] = useState(0);
    const [userVP, setUserVP] = useState(0);
    const [numberOfToken, setNumberOfToken] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [typeOfAccount, setTypeOfAccount] = useState('Verified');

    //! Debugging 
    // console.log("---My Trip Page---");
    // console.log("SessionAD: " + SessionAD);
    // console.log("userData: " + userData);
    // console.log("userREP: " + userREP);
    // console.log("userVP: " + userVP);
    // console.log("numberOfToken: " + numberOfToken);

    //! Copy Share 3 to clipboard
    const copyToClipboard = async () => {
        if (SessionAD == null) {
            return;
        }
        await Clipboard.setStringAsync(SessionAD);
    };

    //! Load user address
    useEffect(() => {
        const loadData = async () => {
            try {
                setSessionAD(await AsyncStorage.getItem('SessionAD'));
                let randomKey = await AsyncStorage.getItem('SessionRK');
                if (randomKey != null) {
                    setSessionRK(randomKey)
                    setTypeOfAccount('TourDC Account');
                }
                else {
                    setTypeOfAccount('Wallet Account');
                }
                ;
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
                let response = await axios.post(`${GLOBAL.BASE_URL}/api/user/getCurrent`, { address: SessionAD });
                web3.getTouristREP(SessionAD).then((rep) => {
                    setUserREP(rep);
                });
                web3.getTouristVP(SessionAD).then((vp) => {
                    setUserVP(vp);
                });
                web3.getBalanceOf(SessionAD).then((token) => {
                    setNumberOfToken(Number(token))
                });
                setUserData(response.data.user);
            }
            catch (error) {
                console.log(error);
            }
        };

        if (SessionAD != '') fetchUser();
    }, [SessionAD]);

    const Cpvp = () => {
        return (
            <View style={styles.Cpvp_container}>
                <View style={styles.MyTrip_headerStatBig}>
                    <Text style={styles.MyTrip_headerStatTextBig}>
                        {userREP} Ⓡ
                    </Text>
                    <Text style={styles.MyTrip_headerStatTextBig}>
                        Reputation
                    </Text>
                </View>
                <Separator />
                <View style={styles.MyTrip_headerStatBig}>
                    <Text style={styles.MyTrip_headerStatTextBig}>
                        {userVP} Ⓥ
                    </Text>
                    <Text style={styles.MyTrip_headerStatTextBig}>
                        Voting power
                    </Text>
                </View>
            </View>
        )
    }

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
                            source={{ uri: `${GLOBAL.BASE_URL}/api/user/getAvatar/${SessionAD}` }} />
                    </View>

                    <View style={styles.MyTrip_headerText}>
                        {/* Username section */}
                        <Text style={{ fontFamily: 'InterB', fontSize: 18 }}>
                            {props.username}
                        </Text>

                        {/* Icon Sections */}
                        <View style={styles.MyTrip_headerIconContainer}>
                            <View style={styles.MyTrip_headerIcon}>
                                {/* <SvgComponent name="UserVerification" style={styles.MyTrip_headerIcon} /> */}
                                <Text style={styles.typeOfAccount}>{typeOfAccount}</Text>
                            </View>

                            <View style={styles.MyTrip_headerIcon}>
                                {/* <SvgComponent name="Reputation" /> */}
                                <TouchableOpacity onPress={copyToClipboard}>
                                    <Text style={styles.MyTrip_headerStatLinkText}>
                                        {
                                            SessionAD != null ?
                                                (SessionAD.length > 7 ? `${SessionAD.slice(0, 5)}...${SessionAD.slice(-5)}` : SessionAD) :
                                                "No Address"
                                        }
                                    </Text>
                                </TouchableOpacity>
                                <Image
                                    source={require('../../assets/icons/clipboard.png')}
                                    style={styles.tourismPage_clipboardIcon}
                                />
                            </View>
                        </View>

                    </View>

                    {/* Token Section */}
                    <DCToken
                        numberOfToken={numberOfToken}
                    />

                </View>
                {/* Stats Section */}
                <Cpvp />
                {/* <UserStats
                    Posts={props.Posts}
                    Reputation={userREP}
                    Upvote={props.Upvote}
                /> */}


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
                REP={userREP}
                Posts="10"
                Reputation="6"
                Upvote="20"
            />

            <Tab.Navigator
                screenOptions={({ route }) => (styles.MyTrip_Navigator)}
            >
                <Tab.Screen name="Posts" component={Posts} />
                <Tab.Screen name="Trips" component={Trips} />
                <Tab.Screen name="Rewards" component={Rewards} />
                <Tab.Screen name="Vouchers" component={Vouchers} />
            </Tab.Navigator>
        </View>
    );
};


export default MainMyTrip;
