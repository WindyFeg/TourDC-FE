import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import Tourism_abi from "../../../../contracts/Tourism.json"
import Tourism_address from "../../../../contracts/Tourism-address.json"
import { getNetwork } from '@wagmi/core'
import axios from 'axios';
import GLOBAL from '../../../Custom/Globals';
import styles from '../../../../styles';
import { useWaitForTransaction } from 'wagmi'
import * as Clipboard from 'expo-clipboard';
import * as WebBrowser from 'expo-web-browser';
import {
  autoCheckIn,
}
  from '../../../../service/signmessage.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface CheckInProps {
  placeId: string;
  placeName: string;
  location: string;
  userAddress: string;
  isWalletRegister: boolean;
}

export default function CheckIn(
  { placeId,
    placeName,
    location,
    userAddress,
    isWalletRegister }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { chain, chains } = getNetwork()
  const [isGPSValid, setIsGPSValid] = useState(0);
  const [checkInHash, setCheckInHash] = useState('');
  // const [result, setResult] = useState();
  // Writing to the Contract
  const { config } = usePrepareContractWrite({
    address: Tourism_address.Token as `0x${string}`,
    abi: Tourism_abi.abi,
    functionName: 'checkIn',
    args: [placeId], // [placeID]
    account: '0x76E046c0811edDA17E57dB5D2C088DB0F30DcC74', // current address
    chainId: 306,

  })
  const { data: checkInData,
    error: checkInError,
    isError: isErrorcheckIn,
    isLoading: isLoadingcheckIn,
    isSuccess: isSuccesscheckIn,
    write: checkIn } = useContractWrite(config)

  const ViewTransaction = async () => {
    if (checkInData == null) {
      return;
    }
    const url = `https://blockchain.agridential.vn/vibi/tx/${checkInData.hash}`
    await WebBrowser.openBrowserAsync(url);
  }

  const copyToClipboard = async () => {
    if (checkInData == null) {
      return;
    }
    await Clipboard.setStringAsync(checkInData?.hash);
  };

  useEffect(() => {
    console.log("_______CheckIn.tsx_______")
    // debug current time
    console.log("Current time:", new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
    console.log("placeId:", placeId)
    console.log("userAddress:", userAddress)
    console.log("isSuccess:", isSuccesscheckIn)
    console.log("isLoading:", isLoadingcheckIn)
    console.log("isError:", isErrorcheckIn)
    console.log("error:", checkInError)
    console.log("data:", checkInData)
    console.log("__________________________")

  }, [checkInData, checkInError, isErrorcheckIn, isLoadingcheckIn, isSuccesscheckIn]);

  useEffect(() => {
    if (isLoadingcheckIn == true) {
      setModalVisible(true);
    }
  }
    , [isLoadingcheckIn]);

  //* Call BE to store checkIn data 

  const result = useWaitForTransaction({
    hash: checkInData?.hash,
  })
  useEffect(() => {
    axios({
      method: 'post',
      url: `${GLOBAL.BASE_URL}/api/post/add`,
      data: {
        "placeId": placeId,
        "hash": checkInData?.hash,
      }
    }).then((response) => {
      console.log("response from BE:", response.data)

    }).catch((error) => {
      console.error('Error:', error);
    });
  }, [result]);

  //* Call BE to Check GPS 
  const CheckGPS = () => {
    axios({
      method: 'post',
      url: `${GLOBAL.BASE_URL}/api/destination/checkGPS`,
      data: {
        "longitude": location.coords.longitude,
        "latitude": location.coords.latitude,
        "placeID": placeId
      }
    }).then((response) => {
      console.log("GPS Status:", response.data)
      let status = response.data.success;

      //* if GPS is valid, check-in user to blockchain
      if (isWalletRegister) {
        checkInUsingWallet(status)
      }
      else {
        checkInUsingTourDC(status)
      }

    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  //! check-in user to blockchain using TourDC
  function checkInUsingTourDC(status) {
    if (status == true) {
      checkInOnBlockchain();
      setIsGPSValid(1);
    }
    else {
      setIsGPSValid(-1);
      setModalVisible(true);
    }
  }

  //! check-in user to blockchain using Wallet
  function checkInUsingWallet(status) {
    if (status == true) {
      if (checkIn) {
        checkIn();
        setIsGPSValid(1);
      }
    }
    else {
      setIsGPSValid(-1);
      setModalVisible(true);
    }
  }

  //! check-in user to blockchain using TourDC
  async function checkInOnBlockchain() {
    let randomKey = await AsyncStorage.getItem('SessionRK');
    setCheckInHash(await autoCheckIn(randomKey, userAddress, placeId) as string);
  }

  const CheckInBtn = ({ text, func }) => {
    return (
      <TouchableOpacity
        style={styles.tourismPage_checkInBtnContainer}
        onPress={func}>
        <Text style={styles.tourismPage_checkInBtnText}>
          {text}
        </Text>
      </TouchableOpacity>
    )
  }

  const CheckInStatusNotify = ({ status, statusStyle }) => {
    return (
      <>
        <Text style={statusStyle}>
          {status}
        </Text>
        <TouchableOpacity
          style={styles.tourismPage_checkInBtnContainer}
          onPress={() => setModalVisible(false)}>
          <Text style={styles.tourismPage_checkInBtnText}>
            Close
          </Text>
        </TouchableOpacity>
      </>
    )
  }

  const CheckInNotify = () => {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>

        <View style={styles.centeredView}>
          <View style={styles.tourismPage_checkInNotify}>
            <Text style={styles.tourismPage_checkInLocationText}>
              TourDC will check your current address to perform CheckIn in destination
            </Text>

            {/* Transaction Hash */}
            <Text style={styles.modalText}>
              Your Transaction Hash (Touch to copy):
            </Text>
            <View style={styles.modalCopyTextContainer}>
              <TouchableOpacity onPress={copyToClipboard}>
                <Text style={styles.modalText}>
                  {checkInData?.hash}
                  {checkInData?.hash && (
                    <Image
                      source={require('../../../../assets/icons/clipboard.png')}
                      style={styles.tourismPage_clipboardIcon}
                    />
                  )}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Checking GPS Status */}
            {
              isGPSValid == -1 ?
                <Text style={
                  [
                    styles.tourismPage_checkInLocationText,
                    styles.tourismPage_checkInLocationTextError
                  ]}>
                  You are not in the destination
                </Text> : null
            }

            {/* Check In Transaction Status */}
            {
              isLoadingcheckIn ?
                <LoadingIcon /> :
                (isSuccesscheckIn ?
                  <CheckInStatusNotify
                    status={'Check-In Success you can closed this'}
                    statusStyle={[
                      styles.tourismPage_checkInLocationText,
                      styles.tourismPage_checkInLocationTextSuccess
                    ]}
                  />
                  :
                  <CheckInStatusNotify
                    status={'Check-In Failed you can closed this'}
                    statusStyle={[
                      styles.tourismPage_checkInLocationText,
                      styles.tourismPage_checkInLocationTextError
                    ]}
                  />)
            }

            {/* View Transaction Button */}
            {
              isSuccesscheckIn ?
                <CheckInBtn
                  text={'View Transaction'}
                  func={() => ViewTransaction()}
                />
                : null
            }


          </View>
        </View>
      </Modal>
    )
  }

  const LoadingIcon = () => {
    return (
      <ActivityIndicator size="large" color="#39A7FF" />
    )
  }

  return (
    <>
      {/* Popup Notify */}
      <CheckInNotify />
      {
        isLoadingcheckIn ?
          <LoadingIcon /> :
          <CheckInBtn
            text={'Check-In'}
            func={() => CheckGPS()}
          />
      }

    </>
  );
}