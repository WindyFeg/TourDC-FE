import React from 'react';
import { View, Text, Image, Button, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../../../styles';
import SvgComponent from '../../../assets/SvgComponent';
import axios from 'axios';
const GLOBAL = require('../../Custom/Globals.js');
/* 
! Card 
$ Contains basic information of a destination, hotel, restaurant, or activity
*/const TourismCard = (props) => {
    // ! Variables
    const { placeId
        , navigation
        , placeName
        , placeAddress
        , placeRate
        , placeThumbnail
        , placeList_imgs } = props;
    const modifiedRate = Math.floor(placeRate / 10);

    // ! Components
    /*
        Pass the short Tourism page's information to Full Tourism Page
    */
    const TourismPage = () => {
        navigation.navigate('TourismPage',
            {
                placeId: placeId,
                placeName: placeName,
                placeAddress: placeAddress,
                placeRate: modifiedRate,
                placeThumbnail: placeThumbnail,
                placeList_imgs: placeList_imgs
            });
    }

    // ! Render
    return (
        <View style={styles.destinationCard}>
            <ImageBackground
                source={{ uri: `${GLOBAL.BASE_URL}/api/destination/getDestinationPicture/${placeThumbnail}` }}
                style={styles.bcDestinationImage}
                imageStyle={styles.bcDestinationImage}
            >
                <View>
                    <TouchableOpacity onPress={TourismPage}>
                        <Text style={styles.bcDestinationScore}>
                            {modifiedRate}
                            <SvgComponent
                                name="StarSmall0"
                                style={styles.bcDestinationStar}
                            />
                        </Text>

                        <View style={styles.bcTextContainer}>
                            <Text style={styles.bcDestinationName}>
                                {placeName}
                            </Text>

                            <Text style={styles.bcDestinationAddress}>
                                {placeAddress}
                            </Text>
                        </View>
                        {/* create a button to navigate to Tourism Page */}
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View >
    );
};


export default TourismCard;
