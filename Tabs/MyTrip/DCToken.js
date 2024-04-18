import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-web';
import styles from '../../styles.js';
import TourDCToken from '../../assets/logo/DCToken.png';
import * as web3 from '../../service/web3.js';
/* 
! Tourism Page
$ Contains information of a destination, hotel, restaurant, or activity
*/
const DCToken = ({ numberOfToken }) => {

    return (
        <View>
            <View style={styles.MyTrip_headerToken}>
                <Text
                    style={styles.MyTrip_headerTokenText}
                >{numberOfToken}</Text>
                <Image
                    source={TourDCToken}
                    style={{ width: 20, height: 20 }}
                />
            </View>
        </View>
    );
};


export default DCToken;
