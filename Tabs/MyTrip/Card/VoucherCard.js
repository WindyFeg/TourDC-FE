import React, { useState, useEffect } from 'react';
import { Button, View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import ReviewPost from '../../Explore/Card/Review/ReviewPost.js';
import styles from '../../../styles.js';
import SvgComponent from '../../../assets/SvgComponent.js';
import axios from 'axios';
import TourDCToken from '../../../assets/logo/DCToken.png';
import GLOBAL from '../../Custom/Globals.js';
import * as web3 from '../../../service/web3.js';
import VoucherImage from '../../../assets/voucher/voucher.jpg';
import QRCode from 'react-native-qrcode-svg';
/* 
! Tourism Page
$ Contains information of a destination, hotel, restaurant, or activity
*/
const PostCard = (props) => {

    const {
        navigation,
        voucherAmount,
        voucherContent,
        voucherId,
        voucherDiscount,
        voucherExpireDate,
        voucherPrice
    } = props;
    const [modalVisible, setModalVisible] = useState(false);


    async function showVoucherLogic() {
        console.log('Show voucher logic');
        setModalVisible(true);
    }

    const UseVoucher = () => {
    }

    function convertDateTimeString(dateTimeString) {
        const dateObject = new Date(dateTimeString * 1000);
        if (isNaN(dateObject.getTime())) {
            return null; // Return null for invalid strings
        }
        const time = dateObject.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        const date = dateObject.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

        return `${date}`;
    }


    const VoucherQR = () => {
        return (<Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>

            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalBigText}>
                        Check-In at {voucherContent}
                    </Text>
                    <Text style={styles.modalText}>
                        This voucher will have discount at {voucherDiscount}%
                        {'\n'}
                        Cost: {voucherPrice} DCT
                        {'\n'}
                        Expire at: {convertDateTimeString(String(voucherExpireDate))}
                        {'\n'}
                        You have {voucherAmount} left
                        {'\n'}
                        Show this QR code to the staff to use the voucher
                    </Text>
                    <View style={styles.modalQRCodeContainer}>
                        <QRCode
                            value={voucherId}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.tourismPage_checkInBtnContainer}
                        onPress={() => setModalVisible(false)}>
                        <Text style={styles.tourismPage_checkInBtnText}>
                            Close
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>)
    }

    const VoucherContent = () => {
        return <View>
            {/* Title */}
            <Text style={styles.voucherCardBigText}>
                {voucherContent.length > 30 ? voucherContent.substring(0, 30) + '...' : voucherContent}
                <SvgComponent name="VoucherSmall" />
            </Text>
            <Text style={styles.tripCardText}>
                Discount {voucherDiscount}%,
                Cost: {voucherPrice}
                <Image
                    source={TourDCToken}
                    style={{ width: 15, height: 15 }}
                />
            </Text>
            {/* Date */}
            <Text style={styles.tripCardText}>
                Expire at: {convertDateTimeString(String(voucherExpireDate))}, {voucherAmount} left
            </Text>
            <TouchableOpacity
                onPress={showVoucherLogic}
                style={styles.Review_BlackBtn}
            >
                <Text style={styles.Review_BlackBtn_Text}>Use voucher</Text>
            </TouchableOpacity>
        </View>
    }

    return (<>
        <VoucherQR />
        <View style={styles.VoucherCard_Container}>
            <TouchableOpacity
                onPress={ReviewPost}
                style={{ flexDirection: 'row', alignItems: 'center', width: "60%" }}>
                {/* Image */}
                <Image
                    // source={{ uri: `${GLOBAL.BASE_URL}/api/post/getImg/${imageName}` }}
                    source={VoucherImage}
                    style={styles.VoucherCard_Image}
                />

                {/* Content */}
                <VoucherContent />
            </TouchableOpacity>
        </View>
    </>
    );
};


export default PostCard;
