import React from 'react';
import { View, Text, Image, Button, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../../../styles';
import SvgComponent from '../../../assets/SvgComponent';
import axios from 'axios';
const GLOBAL = require('../../Custom/Globals.js');
/* 
! Card 
$ Contains basic information of a destination, hotel, restaurant, or activity
*/
const TourismCard = ({ id, navigation, name, address, rate, thumbnail, list_imgs }) => {

    return (
        <View style={styles.destinationCard}>
            <ImageBackground
                source={{ uri: `${GLOBAL.BASE_URL}/api/destination/getDestinationPicture/${thumbnail}` }}
                style={styles.bcDestinationImage}
                imageStyle={styles.bcDestinationImage}
            >
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('TourismPage')}>
                        <Text style={styles.bcDestinationScore}>
                            {/* {props.rate} */}
                            <SvgComponent
                                name="StarSmall0"
                                style={styles.bcDestinationStar}
                            />
                        </Text>

                        <View style={styles.bcTextContainer}>
                            <Text style={styles.bcDestinationName}>
                                {name}
                            </Text>

                            <Text style={styles.bcDestinationAddress}>
                                {address}
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
