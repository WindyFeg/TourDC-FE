import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Explore from './Tabs/Main/Explore';
import Home from './Tabs/Main/Home';
import MyAccount from './Tabs/Main/MyAccount';
import MyTrip from './Tabs/Main/MyTrip';

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
                                iconName = focused ? 'explore' : 'explore-outline';
                            } else if (route.name === 'MyAccount') {
                                iconName = focused ? 'picture' : 'picture-outline';
                            } else if (route.name === 'Settings') { // Add this condition
                                iconName = focused ? 'user' : 'user-outline';
                            }

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
        </SafeAreaView>
    );
};

export default Main;
