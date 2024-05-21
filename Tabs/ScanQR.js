import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    Modal,
    ActivityIndicator,
    TouchableOpacity,
    Image
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from '../styles.js';
import CustomBackButton from './Custom/CustomBackButton.js';
import BackNavigationButton from './Custom/BackNavigationButton.js';
import axios from 'axios';
import SvgComponent from '../assets/SvgComponent.js';
const GLOBAL = require('./Custom/Globals.js');


const ScanQR = ({ navigation }) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [ScannedData, setScannedData] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //* Tourism scan data
    const [TourismData, setTourismData] = useState({
        placeId: '',
        placeName: '',
        placeAddress: '',
        placeRate: '',
        placeThumbnail: '',
        placeList_imgs: ''
    });

    const OpenTourismPage = () => {
        navigation.navigate('TourismPage', {
            placeId: TourismData.placeId,
            placeName: TourismData.placeName,
            placeAddress: TourismData.placeAddress,
            placeRate: Math.round(TourismData.placeRate / 10),
            placeThumbnail: TourismData.placeThumbnail,
            placeList_imgs: TourismData.placeList_imgs
        });
    }

    useEffect(() => {
        const fetchQRData = async () => {
            try {
                const response = await axios.get(`${GLOBAL.BASE_URL}/api/destination/getDestinationById/${ScannedData}`);

                if (response.data == null) {
                    console.log('Data not found');
                    return;
                }

                console.log('Data:', response.data);

                setTourismData({
                    placeId: response.data._id,
                    placeName: response.data.name,
                    placeAddress: response.data.address,
                    placeRate: response.data.rate,
                    placeThumbnail: response.data.thumbnail,
                    placeList_imgs: response.data.list_imgs
                });
                setIsLoading(false);

            } catch (error) {
                console.log(error);
            }

        }
        if (ScannedData != '')
            fetchQRData();
    }, [ScannedData]);

    //* Camera permission

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setIsLoading(true);
        setScanned(true);
        setScannedData(data);
        setModalVisible(true);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }



    //! Modal
    const QRTourismPageNotify = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalBigText}>
                            {TourismData.placeName} Tourism Page
                        </Text>

                        <Image
                            source={{ uri: `${GLOBAL.BASE_URL}/api/destination/getDestinationPicture/${TourismData.placeThumbnail}` }}
                            style={styles.QrCode_TourismImage}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.loginText}>Traveler Rating: </Text>
                            {
                                Array.from({ length: 5 }).map((_, i) => (
                                    <SvgComponent key={i} name={i < Math.round(TourismData.placeRate / 10) ? "StarSmall0" : "StarSmall1"} />
                                ))
                            }
                        </View>

                        <Text style={styles.loginText}>Address: {TourismData.placeAddress}</Text>
                        <Text style={styles.CreateReview_successText}>Scanning successful</Text>

                        {isLoading ? <LoadingIcon /> : null}
                        <TouchableOpacity
                            style={styles.tourismPage_checkInBtnContainer}
                            onPress={() => OpenTourismPage()}>
                            <Text style={styles.tourismPage_checkInBtnText}>
                                OPEN PAGE
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.tourismPage_checkInBtnContainer}
                            onPress={() => setModalVisible(false)}>
                            <Text style={styles.tourismPage_checkInBtnText}>
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal >
        );
    }

    const LoadingIcon = () => {
        return (
            <ActivityIndicator size="large" color="#39A7FF"
                style={{
                    margin: 10
                }}
            />
        )
    }

    return (
        <>
            <QRTourismPageNotify />
            <View style={styles.container}>
                {/* <CustomBackButton /> */}
                <BackNavigationButton navigation={navigation} />
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={styles.QrCodeScanner}
                />

                <Text style={styles.modalBigText}>Scan QR code to check-in</Text>
                {scanned && <TouchableOpacity
                    style={[styles.tourismPage_checkInBtnContainer, styles.black_color]}
                    onPress={() => setScanned(false)}>
                    <Text style={styles.tourismPage_checkInBtnText}>
                        Re-scan
                    </Text>
                </TouchableOpacity>}
            </View >
        </>
    );
};


export default ScanQR;
