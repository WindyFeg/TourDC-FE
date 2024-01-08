import React from 'react';
import { View, TextInput } from 'react-native';
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExploreTab from '../Explore/ExploreTab';

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
                placeholder="Search"
            />
            <Tab.Navigator>
                <Tab.Screen name="Destination" component={ExploreTab} />
                <Tab.Screen name="Hotel" component={ExploreTab} />
                <Tab.Screen name="Restaurant" component={ExploreTab} />
                <Tab.Screen name="Activities" component={ExploreTab} />
            </Tab.Navigator>
        </View>
    )
}

export default Explore;