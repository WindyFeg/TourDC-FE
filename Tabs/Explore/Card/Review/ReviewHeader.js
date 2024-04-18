import { React, useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { Button } from 'react-native-web';
import styles from '../../../../styles.js';
import SvgComponent from '../../../../assets/SvgComponent.js';
import * as web3 from '../../../../service/web3.js';
import GLOBAL from '../../../Custom/Globals.js';
import axios from 'axios';
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
        thumbnail
    } = props;
    const [username, setUsername] = useState("username");
    const [userData, setUserData] = useState({});


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
                        <View style={styles.tourismPage_contentHeaderIcons}>
                            <SvgComponent name='UserVerification' />
                            <Text style={styles.tourismPage_contentHeaderTextTitle}>User Verified</Text>
                        </View>
                    )}
                    {ticketVerified && (
                        <View style={styles.tourismPage_contentHeaderIcons}>
                            <SvgComponent name='Ticket' />
                            <Text style={styles.tourismPage_contentHeaderTextTitle}>Ticket Verified</Text>
                        </View>
                    )}
                    {blockchainVerified && (
                        <View style={styles.tourismPage_contentHeaderIcons}>
                            <SvgComponent name='Blockchain' />
                            <Text style={styles.tourismPage_contentHeaderTextTitle}>Blockchain Verified</Text>
                        </View>
                    )}
                    {reputationVerified && (
                        <View style={styles.tourismPage_contentHeaderIcons}>
                            <SvgComponent name='Reputation' />
                            <Text style={styles.tourismPage_contentHeaderTextTitle}>{REP} REP</Text>
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
