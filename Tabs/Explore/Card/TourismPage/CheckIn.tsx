import React, { useEffect, useState } from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
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

export default function checkIn() {
  // Reading the Contract
    const { chain, chains } = getNetwork()
    console.log("chain: ", chain)
    const [modalVisible, setModalVisible] = useState(false);
    const { data,error, isError, isLoading, isSuccess } = useContractRead({
      address: Tourism_address.Token as `0x${string}`, 
      abi: Tourism_abi.abi,
      functionName: 'touristIdentify', // contract method
      args: ['0x76E046c0811edDA17E57dB5D2C088DB0F30DcC74'], // [postID, title, rate, review]
      // account: '0x76E046c0811edDA17E57dB5D2C088DB0F30DcC74', // current address
    })

  // Writing to the Contract
  const { config } = usePrepareContractWrite({
    address: Tourism_address.Token as `0x${string}`,
    abi: Tourism_abi.abi,
    functionName: 'checkIn',
    args: ['65f2c80ef60b126cb248752b'], // [placeID]
    account: '0x76E046c0811edDA17E57dB5D2C088DB0F30DcC74', // current address
    chainId: 306,

  })
  const { data: checkInData,error: checkInError, isError: isErrorcheckIn, isLoading: isLoadingcheckIn , isSuccess: isSuccesscheckIn, write: checkIn } = useContractWrite(config)
  console.log("isSuccess:", isSuccesscheckIn)
  console.log("isLoading:", isLoadingcheckIn)
  console.log("isError:", isErrorcheckIn)
  console.log("error:", checkInError)
  console.log("data:", checkInData)
  // useEffect(() => {
  //   axios({
  //       method: 'post',
  //       url: `${GLOBAL.BASE_URL}/api/post/add`,
  //       data: {
  //         "postID": reviewData
  //       }
  //   }).then((response) => {
  //       // setNumberDestinations(response.data.length);
  //       // setExploreTabData(response.data);
  //       // setIsLoading(false);
  //   }).catch((error) => {
  //       // console.error('Error:', error);
  //       // setIsLoading(false);
  //   });
  // }, [reviewData]);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>TourDC will check your current address</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>{
                checkIn?.()
                setModalVisible(!modalVisible)
              } 
              }>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});