import React, { useEffect, useState } from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Touchable, TouchableOpacity, ActivityIndicator} from 'react-native';
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

interface CheckInProps {
  placeId: string;
  placeName: string;
  location: string;
  userAddress: string;
}

export default function CheckIn(
  { placeId, 
    placeName, 
    location, 
    userAddress }) 
{
  const [modalVisible, setModalVisible] = useState(false);
  const { chain, chains } = getNetwork()

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
    isLoading: isLoadingcheckIn , 
    isSuccess: isSuccesscheckIn, 
    write: checkIn } = useContractWrite(config)

    
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
  }, [checkInData]);

  const CheckInBtn = () => {
   return (
      <TouchableOpacity
        style={styles.tourismPage_checkInBtnContainer}
        onPress={() => checkIn?.()}>
        <Text style={styles.tourismPage_checkInBtnText}>
          Check-In
        </Text>
      </TouchableOpacity>
   )
  }

  const CheckInNotify = () => {
    return (
    <Modal
        animationType="slide"
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

              <Text style={styles.tourismPage_checkInLocationText}>
              Your Transaction Hash: {checkInData?.hash}
              </Text>

              {
                isSuccesscheckIn ? 
                <View style={styles.centeredView}>
                  <LoadingIcon />
                </View> :
                <View>
                  <Text style={styles.tourismPage_checkInLocationText}>
                    CheckIn Success you can closed this
                  </Text>
                  <Pressable
                    style={styles.tourismPage_checkInBtnContainer}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.tourismPage_checkInBtnText}>
                      Close
                    </Text>
                  </Pressable>
              </View>
              }
          </View>
        </View>
      </Modal>
    )
  }

  const LoadingIcon = () => {
    return (
      <ActivityIndicator size="large" color="#828282" />
    )
  }

  return (
<>
    <CheckInNotify />
    {
      isLoadingcheckIn ?
      <ActivityIndicator size="large" color="#0000ff" /> :
      <CheckInBtn />
    }

    </>
  );
}