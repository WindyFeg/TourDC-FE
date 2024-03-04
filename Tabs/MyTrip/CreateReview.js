import React, { useState } from 'react';
import { Button, View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import BackNavigationButton from '../Custom/BackNavigationButton';
import SvgComponent from '../../assets/SvgComponent';
import styles from '../../styles.js';

const CreateReview = ({ navigation }) => {
    const [title, onChangeTitle] = React.useState('This is an title');
    const [review, onChangeReview] = React.useState('This is an review');
    const [number, onChangeNumber] = React.useState('');
    const [rating, setRating] = useState(0);

    const Rating = () => {
        const stars = [5, 4, 3, 2, 1];

        return (
            <View style={{ flexDirection: 'row' }}>
                {stars.map((star) => (
                    <TouchableOpacity
                        key={star}
                        onPress={() => setRating(star - 1)}
                    >
                        <SvgComponent
                            name={star <= rating ? "StarBig1" : "StarBig0"}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        );
    }

    return (
        <View>
            <ScrollView>
                <BackNavigationButton navigation={navigation} />
                <View style={styles.CreateReview_container}>
                    <Text style={styles.CreateReview_Text}>How would you rate your experience!</Text>
                    <Rating />
                    {/* input field */}
                    <Text style={styles.CreateReview_Text}>Review Title</Text>
                    <TextInput
                        multiline={true}
                        style={styles.CreateReview_Input}
                        onChangeText={onChangeTitle}
                        value={title}
                    />

                    <Text style={styles.CreateReview_Text}>How would you rate your experience!</Text>

                    <TextInput
                        multiline={true}
                        style={styles.CreateReview_Input}
                        onChangeText={onChangeReview}
                        value={review}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default CreateReview;