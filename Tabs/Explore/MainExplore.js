import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExploreTab from '../Explore/ExploreTab';
import SvgComponent from '../../assets/SvgComponent';
import styles from '../../styles.js';

const Tab = createMaterialTopTabNavigator();

const MainExplore = ({ navigation }) => {

    const QRCode = () => {
        navigation.navigate('ScanQR');
    }

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.loginBtn} onPress={() => QRCode()}>
                <Text style={styles.loginText}>QR CODE</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.SearchInput}
                placeholder="Search"
            />

            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        return <SvgComponent name={route.name} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Destination" component={ExploreTab} />
                <Tab.Screen name="Hotel" component={ExploreTab} />
                <Tab.Screen name="Restaurant" component={ExploreTab} />
                <Tab.Screen name="Activities" component={ExploreTab} />
            </Tab.Navigator>
        </View>
    );
};


export default MainExplore;
