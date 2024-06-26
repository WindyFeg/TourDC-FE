import 'react-native-get-random-values';
import { Button, View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, Platform, ActivityIndicator, RefreshControl } from 'react-native';
import ReviewShort from '../Review/ReviewShort.js';
import styles from '../../../../styles.js';
import SvgComponent from '../../../../assets/SvgComponent.js';
import React, { useState, useCallback, useEffect } from 'react';
import WhatPeopleSay from '../Review/WhatPeopleSay.js';
import BackNavigationButton from '../../../Custom/BackNavigationButton.js';
import * as web3 from '../../../../service/web3.js';
import { getNetwork } from '@wagmi/core'
import * as Location from 'expo-location';
import {
    useAccount,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
} from "wagmi";
const GLOBAL = require('../../../Custom/Globals.js');
import CheckIn from './CheckIn.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isLoading } from 'expo-font';


const TourismPage = ({ route, navigation }) => {
    //! Variables
    /*
    Get the information from the TourismCard
    location.coords.longitude
    location.coords.latitude
    */
    const [locationDetails, setLocationDetails] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const { placeId,
        placeRate,
        placeName,
        placeAddress,
        placeThumbnail,
        placeList_imgs } = route.params;
    const [reviews, setReviews] = useState([]);
    const [SessionRK, setSessionRK] = useState('');
    const [SessionAD, setSessionAD] = useState('');
    const [IsLoadingReview, setIsLoadingReview] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const pullToRefreshFunction = () => {
        setIsLoadingReview(true);
        setRefreshing(true);
        fetchTourismPage();
        setRefreshing(false);
        // fetchComment (Done Refreshing)
    }

    //! Load SessionRK and SessionAD
    useEffect(() => {
        const loadData = async () => {
            setSessionAD(await AsyncStorage.getItem('SessionAD'));
            setSessionRK(await AsyncStorage.getItem('SessionRK'));

            console.log("SessionRK: " + SessionRK);
            console.log("SessionAD: " + SessionAD);
        }
        loadData();
    }, []);

    //! Location
    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            let geocode = await Location.reverseGeocodeAsync(location.coords);
            setLocationDetails(geocode[0]);
        })();
    }, []);

    //! Smart Contract
    const fetchTourismPage = async () => {
        console.log("Fetching all reviews of id: " + placeId);
        web3.getDestinationReviews(SessionAD, placeId).then((result) => {
            setReviews(result)
            setIsLoadingReview(false);
        })
    };
    useEffect(() => {
        if (SessionAD != '') fetchTourismPage();
    }, [SessionAD]);

    useEffect(() => {
        console.log("All review of id update: " + placeId + "\n", reviews);
    }, [reviews])
    //! Functions


    //! Components

    const LoadingIcon = () => {
        return (
            <ActivityIndicator size="large" color="#39A7FF"
                style={{
                    margin: 10
                }}
            />
        )
    }

    const NavigationBar = () => {
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

    const DestinationImage = () => {
        return (<View>
            <ImageBackground
                source={{ uri: `${GLOBAL.BASE_URL}/api/destination/getDestinationPicture/${placeThumbnail}` }}
                style={styles.tourismPageImage}
                imageStyle={styles.tourismPageImage}
            >
                <Text
                    style={styles.tourismPageName}>
                    {placeName}
                </Text>

                <View style={styles.tourismPageRating}>
                    {
                        Array.from({ length: placeRate }, (_, i) => (
                            <SvgComponent key={i} name="StarSmall0" />
                        ))
                    }
                    <Text style={{
                        color: '#FFF',
                        fontSize: 12,
                        fontFamily: 'Roboto',
                    }}>
                        From 500+ user reviews
                    </Text>
                </View>

            </ImageBackground>
        </View >)
    }

    /*
    Show the time and location of the destination
    */
    const DestinationContentHeader = () => {
        return (
            <View style={styles.tourismPage_contentHeader}>
                <View style={styles.tourismPage_contentHeaderIcons}>
                    <SvgComponent name="Clock" />
                    <Text style={styles.tourismPage_contentHeaderTextTitle}>Open |</Text>
                    <Text style={styles.tourismPage_contentHeaderText}>Sun, 16:00-21:00 </Text>
                </View>

                <View style={styles.tourismPage_contentHeaderIcons}>
                    <SvgComponent name="Location" />
                    <Text style={styles.tourismPage_contentHeaderTextTitle}>Address |</Text>
                    <Text style={styles.tourismPage_contentHeaderText}>{placeAddress} </Text>
                </View>
            </View>
        )
    }

    /*
    Show the content of the page
    If the content is more than 4 lines, show the "Read more" button
    */
    const DestinationContent = (props) => {
        const [textShown, setTextShown] = useState(false); //To show ur remaining Text
        const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
        const toggleNumberOfLines = () => { //To toggle the show text or hide it
            setTextShown(!textShown);
        }

        const onTextLayout = useCallback(e => {
            setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not

        }, []);

        return (
            <View>
                <View style={styles.mainContainer}>
                    <Text
                        onTextLayout={onTextLayout}
                        numberOfLines={textShown ? undefined : 4}
                        style={styles.tourismPage_contentHeaderTextContent}>What is Lorem Ipsum?
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                        Why do we use it?
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


                        Where does it come from?
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

                        Where can I get some?
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</Text>


                </View>

                {/* Image and Read more Section */}

                <View style={styles.tourismPage_contentImageContainer}>
                    {
                        lengthMore ? <Text
                            onPress={toggleNumberOfLines}
                            style={styles.readMoreBtn}>{textShown ? 'Read less' : 'Read more'}</Text>
                            : null
                    }

                    <View style={styles.tourismPage_contentImages}>
                        {placeList_imgs.map((img, index) => (
                            <Image
                                key={index}
                                source={{ uri: `${GLOBAL.BASE_URL}/api/destination/getDestinationPicture/${thumbnail}` }}
                                style={styles.tourismPage_contentImage}
                            />
                        ))}
                    </View>
                </View>
            </View>
        )
    }

    /*
    Show the review section of the page
    */
    const WhatPeopleSayContainer = () => {
        return (
            <View>
                <Text style={styles.tourismPage_whatPeopleSay}>What People Say</Text>
                <ScrollView horizontal={true}>
                    {
                        Array.from({ length: 5 }, (_, i) => (
                            <View key={i}>
                                <WhatPeopleSay navigation={navigation} />
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        );
    }

    /*
    Show the review section of the page
    */
    const ReviewContainer = () => {
        return (
            <View>
                <Text style={styles.tourismPage_whatPeopleSay}>Reviews</Text>
                {
                    IsLoadingReview ? <LoadingIcon /> :
                        Array.from({ length: reviews.length }, (_, i) => (
                            <ReviewShort
                                key={i}
                                navigation={navigation}
                                // props
                                author={reviews[i].author}
                                placeId={reviews[i].placeId}
                                placeName={reviews[i].placeName}
                                postId={reviews[i].postID}
                                arrivalDate={reviews[i].arrivalDate}
                                createTime={reviews[i].createTime}
                                review={reviews[i].review}
                                rate={reviews[i].rate}
                                title={reviews[i].title}
                                upvoteNum={reviews[i].upvoteNum}
                                isVoted={reviews[i].isVoted}
                                SessionRK={SessionRK}
                                SessionAD={SessionAD}
                                totalReward={reviews[i].totalReward}
                                txHash={reviews[i].hash}
                            />
                        ))
                }
            </View>
        )
    }

    const CheckInButton = () => {
        return (
            <View style={styles.tourismPage_checkInBtn}>
                {locationDetails && (<Text style={styles.tourismPage_checkInLocationText}>
                    Current Location:
                    {locationDetails.name},
                    {locationDetails.street},
                    {locationDetails.region},
                    {locationDetails.country}
                </Text>)}


                <CheckIn
                    placeId={placeId}
                    placeName={placeName}
                    location={location}
                    userAddress={SessionAD}
                    randomKey={SessionRK}
                    isWalletRegister={SessionRK == null ? true : false}
                />
            </View>
        )
    }

    const { chain, chains } = getNetwork()
    console.log("chain: ", chain)

    //! Render
    return (<ScrollView
        style={{
            backgroundColor: '#fff',
        }}
        stickyHeaderIndices={[3]}
        refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={pullToRefreshFunction}
            />
        }
    >
        {/* Back Button and Options Button */}
        <BackNavigationButton navigation={navigation} />

        {/* Destination Page Image */}
        <DestinationImage />

        {/* Big 2 icon for time and location */}
        <DestinationContentHeader />

        <CheckInButton />

        {/* Main Description of the page */}
        <DestinationContent />

        {/* Review section*/}
        <WhatPeopleSayContainer />

        <ReviewContainer />
    </ScrollView>
    );
};


export default TourismPage;
