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
import CreateReview from '../MyTrip/CreateReview';
import ReviewPost from '../Explore/Card/Review/ReviewPost.js';

const Stack = createStackNavigator();

const MyTrip = ({ navigation }) => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="MyTrip" >
                <Stack.Screen name="MyTrip"
                    component={MainMyTrip}
                    options={{ headerShown: false }}
                    navigation={navigation}
                />
                <Stack.Screen name="ScanQR"
                    component={ScanQR}
                    options={{ headerShown: false }}
                    navigation={navigation}
                />
                <Stack.Screen name="TourismPage"
                    component={TourismPage}
                    options={{ headerShown: false }}
                    navigation={navigation}
                />

                <Stack.Screen name="CreateReview"
                    component={CreateReview}
                    options={{ headerShown: false }}
                    navigation={navigation}
                />

                <Stack.Screen name="ReviewPost"
                    component={ReviewPost}
                    options={{ headerShown: false }}
                    navigation={navigation}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MyTrip;