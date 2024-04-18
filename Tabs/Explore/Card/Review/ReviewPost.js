import { React, useState, useEffect } from 'react';
import { Button, ScrollView, View, Text, Image } from 'react-native';
import styles from '../../../../styles';
import ReviewHeader from './ReviewHeader';
import BackNavigationButton from '../../../Custom/BackNavigationButton';
import * as web3 from '../../../../service/web3.js';
import CommentSection from '../Comment/CommentSection.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GLOBAL from '../../../Custom/Globals';
/* 
*/
const ReviewPost = ({ route, navigation }) => {
    const { author,
        postId,
        placeId,
        placeName,
        arrivalDate,
        createTime,
        review,
        rate,
        title,
        upvoteNum,
        listImgs } = route.params;

    const [SessionRK, setSessionRK] = useState('');
    const [SessionAD, setSessionAD] = useState('');


    //! Debugging
    console.log("Post ID: " + postId);
    console.log("Place ID: " + placeId);
    console.log("SessionRK: " + SessionRK);
    console.log("SessionAD: " + SessionAD);

    //! Load SessionRK and SessionAD
    useEffect(() => {
        const loadData = async () => {
            setSessionAD(await AsyncStorage.getItem('SessionAD'));
            setSessionRK(await AsyncStorage.getItem('SessionRK'));
        }
        loadData();
    }, []);



    // ! Components
    /*
    Show the content of the page
    If the content is more than 4 lines, show the "Read more" button
    */
    const ReviewContent = (props) => {
        return (
            <View style={{ backgroundColor: 'white' }}>
                <View style={styles.mainContainer}>
                    <Text
                        style={styles.tourismPage_contentHeaderTextContent}>{review}</Text>


                </View>

                {/* Image and Read more Section */}

                <View style={styles.tourismPage_contentImageContainer}>
                    <Text
                        style={styles.readMoreBtn}>Images</Text>
                    <View style={styles.tourismPage_contentImages}>
                        <Image
                            source={{ uri: `${GLOBAL.BASE_URL}/api/post/getImg/${listImgs[0]}` }}
                            style={styles.tourismPage_contentImage}
                        />
                        <Image
                            source={{ uri: `${GLOBAL.BASE_URL}/api/post/getImg/${listImgs[1]}` }}
                            style={styles.tourismPage_contentImage}
                        />
                    </View>

                    <View style={styles.tourismPage_contentImages}>
                        <Image
                            source={{ uri: `${GLOBAL.BASE_URL}/api/post/getImg/${listImgs[2]}` }}
                            style={styles.tourismPage_contentImage}
                        />
                        <Image
                            source={{ uri: `${GLOBAL.BASE_URL}/api/post/getImg/${listImgs[3]}` }}
                            style={styles.tourismPage_contentImage}
                        />
                    </View>
                </View>
            </View>
        )
    }


    return (
        <ScrollView>
            <View>

                <BackNavigationButton navigation={navigation} />

                <ReviewHeader
                    authorID={author}
                    title={title}
                    rating={rate}
                    REP={100}
                    userVerification={true}
                    ticketVerified={true}
                    blockchainVerified={true}
                    reputationVerified={true}
                    thumbnail={listImgs[0]}
                />

                <ReviewContent />

                <CommentSection
                    postId={postId}
                    placeId={placeId}
                    SessionRK={SessionRK}
                    SessionAD={SessionAD}
                />
            </View>
        </ScrollView>
    );
};


export default ReviewPost;
