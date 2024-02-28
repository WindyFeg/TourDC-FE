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
                <Text style={styles.ReviewPostHeader_username}>David BeckHam</Text>
            </View>

            {/* {
            Array.from({ length: 5 }).map((_, i) => (
                <SvgComponent key={i} name={i < props.nStart ? "StarBig0" : "StarBig1"} />
            ))
        } */}



        </ImageBackground>)
}

const ReviewPostAchievement = () => {
    return (
        <View style={styles.ReviewPostShort_achievement}>
            <Text>👍 100</Text>
            <Text>💬 100</Text>
            <Text>👀 100</Text>
        </View>
    )
}

const ReviewHeader = () => {
    return (
        <View>
            <ReviewPostHeader nStart={3} />
            <ReviewPostAchievement />
        </View>
    );
};


export default ReviewHeader;
