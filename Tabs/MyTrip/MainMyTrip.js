import React from 'react';
import { Button } from 'react-native-web';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExploreTab from '../Explore/ExploreTab';
import SvgComponent from '../../assets/SvgComponent';
import styles from '../../styles.js';

import Trips from './Tabs/Trips.js';
import MyVoucher from './Tabs/MyVoucher.js';
import Posts from './Tabs/Posts.js';
import Collections from './Tabs/Collections.js';

const Tab = createMaterialTopTabNavigator();
/* 
! Tourism Page
$ Contains information of a destination, hotel, restaurant, or activity
*/
const MainMyTrip = () => {

    const HeaderMyTrip = () => {
        return (<>
            <Text>Hello, Traveler</Text>
            <Text>Where are you going?</Text>
        </>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <HeaderMyTrip />

            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        return <SvgComponent name={route.name} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Trips" component={Trips} />
                <Tab.Screen name="My Voucher" component={MyVoucher} />
                <Tab.Screen name="Posts" component={Posts} />
                <Tab.Screen name="Collections" component={Collections} />
            </Tab.Navigator>
        </View>
    );
};


export default MainMyTrip;
