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
import { useWaitForTransaction } from 'wagmi'

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
  }, [result])

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

  const CheckInStatusNotify = ({status}) => {
    return (
      <>
        <Text style={styles.tourismPage_checkInLocationText}>
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
                isLoadingcheckIn ?
                <LoadingIcon /> :
                  (isSuccesscheckIn ?
                <CheckInStatusNotify 
                status={'CheckIn Success you can closed this'}/> 
                :
                <CheckInStatusNotify
                status={'CheckIn Failed you can closed this'}/>) 
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
      <ActivityIndicator size="large" color="#39A7FF" /> :
      <CheckInBtn />
    }

    </>
  );
}