
import React from 'react';
import { Button, View, Text, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../styles';
import SvgComponent from '../../assets/SvgComponent';

const BackNavigationButton = ({ navigation }) => {
    return (
        <View>
            <TouchableOpacity
                style={styles.backBtn}
                onPress={() => navigation.goBack()}
            >
                <SvgComponent name="BackArrow" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.optionsBtn}
                onPress={() => navigation.goBack()}>
                <SvgComponent name="ThreeDots" />
            </TouchableOpacity>
        </View>
    );
}

export default BackNavigationButton;