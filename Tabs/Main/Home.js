import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, Button, ImageBackground } from 'react-native';
import styles from '../../styles';
import homeBackground from '../../assets/background/home_background.png';

const Home = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={homeBackground} resizeMode="cover" style={styles.loginBackground}>
                <Text>GROW
                    YOUR
                    TRAVEL
                    EXPERIENCE.</Text>

                <Text>Discover Trending
                    Checkpoint near you</Text>


                <Text>Best Place</Text>
                <Text>Our Partner</Text>
                <Text>Footer</Text>

            </ImageBackground>
        </View>
    );
}

export default Home;