import React from 'react';
import { View, TextInput } from 'react-native';
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExploreTab from '../Explore/ExploreTab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SvgComponent from '../../assets/SvgComponent';

const Tab = createMaterialTopTabNavigator();


const Explore = () => {
    return (
        <View style={{ flex: 1 }}>
            <TextInput
                style={{
                    height: 40,
                    borderRadius: 5,
                    borderColor: '#D9D9D9',
                    borderWidth: 1,
                    backgroundColor: '#FFF',
                    width: 284,
                    height: 44,

                }}
                // can you add icon by using screen options?

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
    )
}

export default Explore;