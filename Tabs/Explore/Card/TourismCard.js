import React from 'react';
import { View, Text, Image, Button, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../../../styles';
import SvgComponent from '../../../assets/SvgComponent';

/* 
! Card 
$ Contains basic information of a destination, hotel, restaurant, or activity
*/
const TourismCard = ({ score, name, address, navigation }) => {
    return (
        // Destination Card

        <View style={styles.destinationCard}>
            <ImageBackground
                source={URL = 'http://localhost:5500/api/destination/getDestinationThumbnailById/65d6ec325ecf27cb3d803d87'}
                style={styles.bcDestinationImage}
                imageStyle={styles.bcDestinationImage}
            >
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('TourismPage')}>
                        <Text style={styles.bcDestinationScore}>
                            {score}
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
        </View>
    );
};


export default TourismCard;
