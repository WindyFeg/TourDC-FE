import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { Button } from 'react-native-web';
import styles from '../../../../styles.js';
import SvgComponent from '../../../../assets/SvgComponent.js';
/* 
*/

const ReviewPostHeader = (props) => {
    return (
        // Title image
        <ImageBackground
            source={require('../../../../assets/destinations/dc_dalat.jpg')}
            style={styles.ReviewPostHeader_image}
            imageStyle={styles.ReviewPostHeader_image}
        >
            <Text
                style={styles.ReviewPostHeader_title}>
                Get our into new
                Sea Heven in Bali
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
                    <Text style={styles.ReviewPostHeader_username}>{props.uName}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {
                            Array.from({ length: 5 }).map((_, i) => (
                                <SvgComponent key={i} name={i < props.nStart ? "StarBig0" : "StarBig1"} />
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
                <View style={styles.tourismPage_contentHeaderIcons}>
                    <SvgComponent name='UserVerification' />
                    <Text style={styles.tourismPage_contentHeaderTextTitle}>User Verified</Text>
                </View>
                <View style={styles.tourismPage_contentHeaderIcons}>
                    <SvgComponent name='Ticket' />
                    <Text style={styles.tourismPage_contentHeaderTextTitle}>Ticket Verified</Text>
                </View>
                <View style={styles.tourismPage_contentHeaderIcons}>
                    <SvgComponent name='Blockchain' />
                    <Text style={styles.tourismPage_contentHeaderTextTitle}>Blockchain Verified</Text>
                </View>
                <View style={styles.tourismPage_contentHeaderIcons}>
                    <SvgComponent name='Reputation' />
                    <Text style={styles.tourismPage_contentHeaderTextTitle}>15 REP</Text>
                </View>
            </View>

        </View>
    )
}

const ReviewHeader = () => {
    return (
        <View>
            <ReviewPostHeader nStart={3} uName={'David BeckHam'} />
            <ReviewPostAchievement />
        </View>
    );
};


export default ReviewHeader;
