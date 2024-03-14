import { React, useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { Button } from 'react-native-web';
import styles from '../../../../styles.js';
import SvgComponent from '../../../../assets/SvgComponent.js';
import * as web3 from '../../../../service/web3.js';

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
        reputationVerified } = props;
    const [username, setUsername] = useState("username");


    //! Smart Contract
    useEffect(() => {
        const fetchTourismPage = async () => {
            // TODO
            const response = await web3.getTouristInfor(authorID);
            setUsername(response.firstName + " " + response.lastName);
        };
        fetchTourismPage();
    }, []);


    const ReviewPostHeader = () => {
        return (
            // Title image
            <ImageBackground
                source={require('../../../../assets/destinations/dc_dalat.jpg')}
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
                            source={require('../../../../assets/destinations/dc_dalat.jpg')}
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
