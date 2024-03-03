
import React from 'react';
import { Button } from 'react-native';

const CustomBackButton = ({ navigation }) => {
    return (
        <Button title="Go Back" onPress={() => navigation.goBack()} />
        
    );
};

export default CustomBackButton;