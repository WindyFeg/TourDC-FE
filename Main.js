import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Explore from './Tabs/Main/Explore';
import Home from './Tabs/Main/Home';
import MyAccount from './Tabs/Main/MyAccount';
import MyTrip from './Tabs/Main/MyTrip';

import Home_Icon from './assets/icons/home.svg';
import Explore_Icon from './assets/icons/explore.svg';

const Tab = createBottomTabNavigator();

const Main = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
            <NavigationContainer independent={true}>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = focused ? 'home' : 'home-outline';
                            } else if (route.name === 'Explore') {
                                iconName = focused ? 'navigate-circle' : 'navigate-circle-outline';
                            } else if (route.name === 'MyTrip') {
                                iconName = focused ? 'images' : 'images-outline';
                            } else if (route.name === 'MyAccount') { // Add this condition
                                iconName = focused ? 'person' : 'person-outline';
                            }
                            <ion-icon name="navigate-circle-outline"></ion-icon>
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'gray',
                    })}
                >

                    <Tab.Screen
                        name="Home"
                        component={Home}
                        options={{ headerShown: false }}
                    />

                    <Tab.Screen
                        name="Explore"
                        component={Explore}
                        options={{ headerShown: false }}
                    />

                    <Tab.Screen
                        name="MyTrip"
                        component={MyTrip}
                        options={{ headerShown: false }}
                    />

                    <Tab.Screen
                        name="MyAccount"
                        component={MyAccount}
                        options={{ headerShown: false }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView >
    );
};

export default Main;
