import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Button } from 'react-native-web';
import ReviewPost from './ReviewPost';
import styles from '../../../../styles';
import ReviewPostHeader from './ReviewHeader';
import SvgComponent from '../../../../assets/SvgComponent';
/* 
*/
const ReviewShort = ({ navigation }) => {
    const [isHeartSelected, setHeartSelected] = useState(false);

    const ReviewPost = () => {
        navigation.navigate('ReviewPost');
    }

    const ReviewPostShortContent = () => {
        return <View >
            <Text style={styles.ReviewPostShort_content}>This week we move on to Week 5 of Season 13 of the Steemit Engagement Challenge. There are seven more contests from the Engagement Challenge Communities. Make sure you enter as many of the contests as you can, and vote and comment on other entries, to be in with a chance of winning the prize votes from</Text>
        </View>
    }

    const ReviewPostShortFooter = (props) => {
        return (
            <View style={styles.ReviewPostFooter}>
                <View style={styles.UpvoteButtonContainer}>
                    <TouchableOpacity
                        style={styles.UpvoteButton}
                        onPress={() => setHeartSelected(!isHeartSelected)}
                    >
                        <SvgComponent name={isHeartSelected ? 'Heart1' : 'Heart0'} />
                    </TouchableOpacity >
                    <Text style={styles.UpvoteButtonText}>500</Text>
                </View>
                <Text style={styles.UpvoteButtonText}> 12/5/2020</Text>
            </View >
        )
    }


    return (
        <View style={styles.ReviewPostShort_container}>
            {/* Thumbnail, user and achievement */}
            <ReviewPostHeader />

            {/* Content */}
            <TouchableOpacity onPress={ReviewPost}>
                <ReviewPostShortContent />
            </TouchableOpacity>

            {/* Like and date */}
            <ReviewPostShortFooter />
        </View>
    );
};


export default ReviewShort;
