import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-web';
import styles from '../../styles.js';
import TourDCToken from '../../assets/logo/DCToken.png';
import * as web3 from '../../service/web3.js';
import * as WebBrowser from 'expo-web-browser';
import * as Clipboard from 'expo-clipboard';
import smartcontract_address from '../../contracts/ERC20With4RMechanism-address.json';

/* 
! Tourism Page
$ Contains information of a destination, hotel, restaurant, or activity
*/
const DCToken = ({ numberOfToken, SessionAD }) => {
    //! Copy Share 3 to clipboard
    const copyToClipboard = async () => {
        if (SessionAD == null) {
            return;
        }
        await Clipboard.setStringAsync(SessionAD);
    };

    const CheckBalance = async () => {
        if (SessionAD == null) {
            return;
        }
        const url = `https://sepolia.etherscan.io/token/${smartcontract_address.Token}?a=${SessionAD}`
        await WebBrowser.openBrowserAsync(url);
    }

    const CheckUserVerified = async () => {
        if (SessionAD == null) {
            return;
        }
        const url = `https://sepolia.etherscan.io/address/${SessionAD}`
        await WebBrowser.openBrowserAsync(url);
    }

    return (
        <View>
            <TouchableOpacity
                onPress={() => CheckBalance()}
            >
                <View style={styles.MyTrip_headerToken}>
                    <View style={styles.MyTrip_headerTokenIconAndText}>
                        <Text
                            style={styles.MyTrip_headerTokenText}
                        >{numberOfToken}</Text>
                        <Image
                            source={TourDCToken}
                            style={{ width: 20, height: 20 }}
                        />
                    </View>

                    <Text style={styles.MyTrip_headerStatLinkTextSmall}>
                        Check Balance
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.MyTrip_UserVerifiedButton}
                onPress={() => CheckUserVerified()}
            >
                <TouchableOpacity onPress={copyToClipboard}>
                    <Text style={styles.MyTrip_headerStatLinkText}>
                        {
                            SessionAD != null ?
                                (SessionAD.length > 7 ? `${SessionAD.slice(0, 5)}...${SessionAD.slice(-5)}` : SessionAD) :
                                "No Address"
                        }
                        <Image
                            source={require('../../assets/icons/clipboard.png')}
                            style={styles.tourismPage_clipboardIcon}
                        />
                    </Text>
                </TouchableOpacity>
                <Text style={styles.MyTrip_headerStatLinkTextSmall}>
                    User Verified
                </Text>
            </TouchableOpacity>

        </View>
    );
};


export default DCToken;
