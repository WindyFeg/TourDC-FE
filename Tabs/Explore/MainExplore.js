import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExploreTab from '../Explore/ExploreTab';
import SvgComponent from '../../assets/SvgComponent';
import styles from '../../styles.js';

const Tab = createMaterialTopTabNavigator();

/* 
! Explore page
$ Contain Explore Tabs
*/
const SearchBarHeader = ({ navigation }) => {
    {/* Header View */ }
    const QRCode = () => {
        navigation.navigate('ScanQR');
    }

    return (<View style={styles.headerContainer}>
        <TouchableOpacity style={styles.qrCodeBtn} onPress={() => QRCode()}>
            <SvgComponent name="QRCode" />
        </TouchableOpacity>

        <View style={styles.SearchBar}>
            <TouchableOpacity onPress={() => QRCode()}>
                <SvgComponent name="Search" />
            </TouchableOpacity>

            <TextInput
                style={styles.SearchInput}
                placeholder="Search"
            />
        </View>
    </View>)
}
const MainExplore = ({ navigation }) => {


    return (
        <View style={styles.mainExploreContainer}>
            {/* Header */}
            <SearchBarHeader
                navigation={navigation}
            />

            {/* Explore Tabs */}
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        return <SvgComponent name={route.name} color={color} size={size} />;
                    },
                    tabBarActiveTintColor: '#878282',
                    tabBarInactiveTintColor: '#878282',
                    pressColor: 'white',
                    tabBarStyle: { backgroundColor: '#ffffff' },
                })}
                barStyle={{ backgroundColor: '#694fad' }}
                tabBarOptions={{
                    activeTintColor: '#878282',
                    inactiveTintColor: '#878282',
                    activeBackgroundColor: '#878282',
                    inactiveBackgroundColor: '#878282',
                    labelStyle: { fontSize: 9 },
                }}
            >
                <Tab.Screen name="Destination" component={ExploreTab} />
                <Tab.Screen name="Hotel" component={ExploreTab} />
                <Tab.Screen name="Restaurant" component={ExploreTab} />
                <Tab.Screen name="Activities" component={ExploreTab} />
            </Tab.Navigator>
        </View >
    );
};


// export default MainExplore;

module.exports = {
    MainExplore,
    SearchBarHeader
}