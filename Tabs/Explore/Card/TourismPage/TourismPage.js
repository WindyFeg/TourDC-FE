import React from 'react';
import { Button, View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import ReviewShort from '../Review/ReviewShort.js';
import WhatPeopleSay from '../Review/WhatPeopleSay.js';
import styles from '../../../../styles.js';
import SvgComponent from '../../../../assets/SvgComponent.js';
/* 
*/
const TourismPage = ({ navigation }) => {

    const NavigationBar = () => {
        return (
            <View>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                >
                    <SvgComponent name="BackArrow" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.optionsBtn}
                    onPress={() => navigation.goBack()}>
                    <SvgComponent name="ThreeDots" />
                </TouchableOpacity>
            </View>
        );
    }

    const DestinationImage = () => {
        return (<View>
            <ImageBackground
                source={require('../../../../assets/destinations/dc_dalat.jpg')}
                style={styles.tourismPageImage}
                imageStyle={styles.tourismPageImage}
            >
                <Text
                    style={styles.tourismPageName}>
                    Da Lat
                </Text>

                <View style={styles.tourismPageRating}>
                    {
                        Array.from({ length: 5 }, (_, i) => (
                            <SvgComponent key={i} name="StarSmall0" />
                        ))
                    }
                    <Text style={{
                        color: '#FFF',
                        fontSize: 12,
                        fontFamily: 'Roboto',
                    }}>
                        From 500+ user reviews
                    </Text>
                </View>

            </ImageBackground>
        </View>)
    }

    const DestinationContentHeader = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <SvgComponent name="Clock" />
                    <Text>Open | Sun, 16:00-21:00 </Text>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <SvgComponent name="Location" />
                    <Text>Address | Lam Dong, Viet Nam </Text>
                </View>
            </View>
        )
    }

    const DestinationContent = () => {
        return (
            <Text>Description</Text>
        )
    }

    return (
        <View>
            {/* Back Button and Options Button */}
            <NavigationBar />

            {/* Destination Page Image */}
            <DestinationImage />

            {/* Destination Page Content */}
            <View>
                {/* Big 2 icon for time and location */}
                <DestinationContentHeader />

                {/* Main Description of the page */}
                <DestinationContent />

                {/* Review section*/}
                <Text>Review</Text>

                {
                    Array.from({ length: 4 }, (_, i) => (
                        <WhatPeopleSay key={i} navigation={navigation} />
                    ))
                }

                {
                    Array.from({ length: 4 }, (_, i) => (
                        <ReviewShort key={i} navigation={navigation} />
                    ))
                }
            </View>
        </View >
    );
};


export default TourismPage;
