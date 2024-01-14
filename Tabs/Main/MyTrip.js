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
import TourismPage from '../Explore/Card/TourismPage/TourismPage.js';
import MainMyTrip from '../MyTrip/MainMyTrip.js';
import CreateReview from '../MyTrip/CreateReview.js';
import ReviewPost from '../Explore/Card/Review/ReviewPost.js';

const Stack = createStackNavigator();

const MyTrip = ({ navigation }) => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="MyTrip" >
                <Stack.Screen name="MyTrip"
                    component={MainMyTrip}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="ScanQR"
                    component={ScanQR}
                />
                <Stack.Screen name="TourismPage"
                    component={TourismPage}
                />

                <Stack.Screen name="CreateReview"
                    component={CreateReview}
                />

                <Stack.Screen name="ReviewPost"
                    component={ReviewPost}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MyTrip;