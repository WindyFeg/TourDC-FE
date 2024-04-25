import { React, useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-web';
import styles from '../../../../styles.js';
import SvgComponent from '../../../../assets/SvgComponent.js';
import * as web3 from '../../../../service/web3.js';
import GLOBAL from '../../../Custom/Globals.js';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';

/* 
*/
const ReviewHeader = (props) => {

    // ! Variables
    const { authorID,
        title,
        rating,
        REP,
        userVerification,
        ticketVerified,
        blockchainVerified,
        reputationVerified,
        thumbnail,
        totalReward,
        txHash
    } = props;
    const [username, setUsername] = useState("username");
    const [userData, setUserData] = useState({});

    const ViewTransaction = async (hash) => {
        console.log("Viewing transaction: " + hash);
        if (hash == null) {
            return;
        }
        const url = `https://sepolia.etherscan.io/tx/${hash}`
        await WebBrowser.openBrowserAsync(url);
    }

    const ViewProfile = async (address) => {
        if (address == null) {
            return;
        }
        const url = `https://sepolia.etherscan.io/address/${address}`
        await WebBrowser.openBrowserAsync(url);
    }

    //! Fetch user data of the post
    useEffect(() => {
        const fetchUserPostInfo = async () => {
            console.log("Fetching user post info of: " + authorID);
            let response = await axios.post(`${GLOBAL.BASE_URL}/api/user/getCurrent`, { address: authorID });
            setUserData(response.data.user);
            setUsername(response.data.user.firstName + " " + response.data.user.lastName);
        };
        fetchUserPostInfo();
    }, []);


    const ReviewPostHeader = () => {
        return (
            // Title image
            <ImageBackground
                source={{ uri: `${GLOBAL.BASE_URL}/api/post/getImg/${thumbnail}` }}
                style={styles.ReviewPostHeader_image}
                imageStyle={styles.ReviewPostHeader_image}
            >
                <Text
                    style={styles.ReviewPostHeader_title}>
                    {title}
                </Text>

                {/* User profile*/}
                <View style={styles.ReviewPostHeader_userContainer}>
                    <View style={styles.ReviewPostHeader_backgroundUserAvatar}>
                        <Image
                            style={styles.ReviewPostHeader_userAvatar}
                            source={{ uri: `${GLOBAL.BASE_URL}/api/user/getAvatar/${authorID}` }}
                        />
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={styles.ReviewPostHeader_username}>{username}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {
                                Array.from({ length: 5 }).map((_, i) => (
                                    <SvgComponent key={i} name={i < rating ? "StarSmall0" : "StarSmall1"} />
                                ))
                            }
                        </View>
                    </View>
                </View>





            </ImageBackground>)
    }

    const ReviewPostAchievement = () => {
        return (
            <View style={styles.ReviewPostShort_achievement}>
                <View style={styles.ReviewPost_achievementContainer}>
                    {userVerification && (
                        <TouchableOpacity
                            style={styles.tourismPage_contentHeaderIcons}
                            onPress={() => ViewProfile(authorID)}
                        >
                            <SvgComponent name='UserVerification' />
                            <Text style={styles.tourismPage_contentHeaderTextTitle}>User Verified</Text>
                        </TouchableOpacity>
                    )}
                    {blockchainVerified && (
                        <TouchableOpacity
                            style={styles.tourismPage_contentHeaderIcons}
                            onPress={() => ViewTransaction(txHash)}
                        >
                            <SvgComponent name='Blockchain' />
                            <Text style={styles.tourismPage_contentHeaderTextTitle}>Blockchain Verified</Text>
                        </TouchableOpacity>
                    )}
                    {ticketVerified && (
                        <View style={styles.tourismPage_contentHeaderIcons}>
                            <SvgComponent name='TotalReward' />
                            {
                                totalReward != 0 ?
                                    <Text style={styles.tourismPage_contentHeaderTextTitle}>Total Reward
                                        {'\n'}
                                        {totalReward}
                                    </Text>
                                    :
                                    <Text style={styles.tourismPage_contentHeaderTextTitle}>
                                        Waiting for reward
                                    </Text>
                            }
                        </View>
                    )}
                    {reputationVerified && (
                        <View style={styles.tourismPage_contentHeaderIcons}>
                            <SvgComponent name='Reputation' />
                            <Text style={styles.tourismPage_contentHeaderTextTitle}>
                                Author Reputation
                                {'\n'}
                                {REP}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        )
    }
    return (
        <View style={{ backgroundColor: 'white' }}>
            <ReviewPostHeader />
            <ReviewPostAchievement />
        </View>
    );
};


export default ReviewHeader;
