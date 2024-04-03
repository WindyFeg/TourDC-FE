import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, Button, ImageBackground, ScrollView } from 'react-native';
import styles from '../../styles';
import homeBackground from '../../assets/background/home_background.png';

const Home = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={homeBackground} resizeMode="cover" style={styles.loginBackground}>
                <Text style={styles.HomeTitle}>
                    GROW
                    {'\n'}
                    YOUR
                    {'\n'}
                    TRAVEL
                    {'\n'}
                    EXPERIENCE.
                </Text>

                <Text
                    style={styles.HomeSubTitle}
                >We specialize in applying blockchain technology to store your memorable experiences.</Text>

            </ImageBackground>

            {/* 
            <Text
                style={styles.HomeTitleBlack}
            >Discover Trending
                Checkpoint near you</Text>
            <Text
                style={styles.HomeTitleBlack}
            >Our Partner</Text>
            <Text>Footer</Text> */}
        </View>
    );
}

export default Home;