import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExploreTab from '../Explore/ExploreTab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SvgComponent from '../../assets/SvgComponent';
import styles from '../../styles.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScanQR from '../ScanQR';
import MainExplore from '../Explore/MainExplore';
import TourismPage from '../Explore/Card/TourismPage/TourismPage.js';
import ReviewPost from '../Explore/Card/Review/ReviewPost.js';

const Stack = createStackNavigator();

/* 
! Navigation Explore page
$ Includes the QR Code and Explore Tabs
*/
const Explore = ({ navigation }) => {

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Explore"
            >
                <Stack.Screen name="Explore"
                    component={MainExplore}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="ScanQR"
                    component={ScanQR}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="TourismPage"
                    component={TourismPage}
                    options={{ headerShown: false }}
                />

                <Stack.Screen name="ReviewPost"
                    component={ReviewPost}
                    options={{ headerShown: false }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Explore;