import React from 'react';
import { View, Text, Image, Button } from 'react-native';

/* 
! Card 
$ Contains basic information of a destination, hotel, restaurant, or activity
*/
const TourismCard = ({ navigation }) => {
    return (
        <View>

            <Text>Da Lat</Text>
            <Text>Lam Dong, VietNam</Text>
            <Text>4.5/5</Text>
            {/* create a button to navigate to Tourism Page */}
            <Button
                title="Go to Tourism Page"
                onPress={() => navigation.navigate('TourismPage')}
            />
        </View>
    );
};


export default TourismCard;
