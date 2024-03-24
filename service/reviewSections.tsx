import { Text, View, StyleSheet, Pressable } from "react-native";
import React from 'react'
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import Tourism_abi from "../contracts/Tourism.json"
import Tourism_address from "../contracts/Tourism-address.json"
import { getNetwork } from '@wagmi/core'

export default function ReviewSection() {
  // Reading the Contract
    const { chain, chains } = getNetwork()
    console.log("chain: ", chain)

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
    functionName: 'reviews',
    args: ['65f2c80ef60b126cb248752b', 'Romantic', '49', 'Beautifullll'], // [postID, title, rate, review]
    account: '0x76E046c0811edDA17E57dB5D2C088DB0F30DcC74', // current address
    chainId: 306,

  })
  const { data: reviewData,error: reviewError, isError: isErrorReview, isLoading: isLoadingReview , isSuccess: isSuccessReview, write: review } = useContractWrite(config)
  // reviews();
  console.log("isSuccess:", isSuccess)
  console.log("isLoading:", isLoadingReview)
  console.log("isError:", isError)

  console.log("error:", isErrorReview)
  console.log("data:", data)

  return (
    <View style={styles.marginVertical}>
      <View style={styles.marginVertical}>
        {isLoading && <Text>Loading</Text>}
        {isSuccess && <Text>Name: {data?.toString()}</Text>}
        {isError && <Text>Error reading contract</Text>}
      </View>

      <Pressable style={styles.button} onPress={() => review?.()}>
        <Text style={styles.centerText}>Post</Text>
      </Pressable>
      {isLoadingReview && <Text>Check Wallet</Text> }
      <Text style={{ textAlign: "center", marginVertical: 10 }}>
        Transaction:
      </Text>
      {isSuccessReview && (
        <Text style={{ textAlign: "center" }}>{JSON.stringify(reviewData)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
  },
  marginVertical: {
    marginVertical: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  centerText: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
  button: {
    backgroundColor: "#57B36A",
    padding: 10,
    width: 140,
    borderRadius: 32,
  },
});