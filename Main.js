import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Explore from './Tabs/Main/Explore';
import Home from './Tabs/Main/Home';
import MyAccount from './Tabs/Main/MyAccount';
import MyTrip from './Tabs/Main/MyTrip';

const Tab = createBottomTabNavigator();

const Main = ({ navigation }) => {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home' : 'home-outline';
                    } else if (route.name === 'Map') {
                        iconName = focused ? 'map' : 'map-outline';
                    } else if (route.name === 'User Info') {
                        iconName = focused ? 'person-circle' : 'person-circle-outline';
                    } else if (route.name === 'Settings') { // Add this condition
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}>

                <Tab.Screen name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />

                <Tab.Screen
                    name="Explore"
                    component={Explore}
                    options={{ headerShown: false }}
                />

                <Tab.Screen
                    name="MyAccount"
                    component={MyAccount}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="MyTrip"
                    component={MyTrip}
                    options={{ headerShown: false }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Main;