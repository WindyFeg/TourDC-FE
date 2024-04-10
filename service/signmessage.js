
import Web3 from "web3";
import GLOBAL from "../Globals"

import contractABI from "../contracts/Tourism.json"
import contractAddress from "../contracts/Tourism-address.json"
import { LegacyTransaction } from '@ethereumjs/tx'
import { axios } from "axios";
import {Common, Hardfork} from '@ethereumjs/common'
import { bytesToHex, hexToBytes } from '@ethereumjs/util' 
import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
// const { Web3 } = require('web3');
// const axios = require('axios')
// const contractAddress = require('../contracts/Tourism-address.json')
// const contractABI = require('../contracts/Tourism.json')
// const {Transaction ,LegacyTransaction, FeeMarketEIP1559Transaction} = require('@ethereumjs/tx')
// const {Common, Hardfork} = require('@ethereumjs/common')
// const {hexToBytes, bytesToHex} = require('@ethereumjs/util')

// const Tx = Transaction;
// const BASE_URL = GLOBAL.BASE_URL
const VBCProvider = "https://vibi.vbchain.vn/"
var web3 = new Web3(VBCProvider);
const contract = new web3.eth.Contract(contractABI.abi, contractAddress.Token);

// randomKey in Sesssion + private_key_encrypt => decrypted to get privateKey
// const customCommon = Common.forCustomChain(
//   'mainnet',
//   {
//       name: 'vibichain',
//       networkId: 306,
//       chainId: 306,
//   },
//   'istanbul'
// );
//

const customCommon = Common.custom({ chainId: 306 , networkId: 306}, {hardfork: Hardfork.Berlin})
async function autoCheckIn(randomKey, username, placeID) {
  try {
    // call api to get private_key_encrypt
    // console.log(await web3.eth.getTransactionReceipt('0xd7abc07daf4096b9ab81c9468edd298a011b216d4ae78448137b93560936fece'))
    // let enc_private_key = await axios.post(`${BASE_URL}/api/user/getPrivateEnc`, {username: username})
    let enc_private_key = '29b05dee4c7d1818c44a99dd1e098f8bb01caceff6b53c29602288a3e9bd6191'
    if(enc_private_key.success == false) {
      return enc_private_key
    }

    // decrypted private_key
    let privateKey = AES.decryptedPrivateKey(randomKey, enc_private_key).privateKey
    console.log('privateKey: ', privateKey)

    // signmessage
    const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey).address
    console.log('account: ', account)
  
    let nonce = await web3.eth.getTransactionCount(account,'latest');
    console.log('nonce: ', nonce)
    let data = contract.methods.checkIn(placeID).encodeABI();
    console.log("data", data)
    let estimateGas = await contract.methods.checkIn(placeID).estimateGas({
      from: account,
    });
    console.log("estimateGas", estimateGas)
    
    const txObject = {
      nonce: web3.utils.toHex(nonce),
      from: account,
      gasLimit: web3.utils.toHex(estimateGas), // Raise the gas limit to a much higher amount
      // gasPrice: web3.eth.getGasPrice(),
      // gasPrice: '0x09184e72a000',
      // gasLimit: '0x2710',
      // gasPrice: 1000000000,
      to: contractAddress.Token,
      data: contract.methods.checkIn(placeID).encodeABI(),
      gasPrice: 1000000000,
      chainId: 0x132
    }
    
    const tx = new Tx(txObject,{ common: customCommon })
    console.log("newtxObj", tx)
    
    const privateKeyBytes = Buffer.from(privateKey, 'hex')
    console.log(privateKeyBytes)
    tx.sign(privateKeyBytes)

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')	
    const txHash = web3.utils.sha3(serializedTx);

    console.log("txHash", txHash)
    web3.eth.sendSignedTransaction( raw )
    .on('receipt', console.log);
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: error.message
    }
  }
}


export const faucet = async(address) => {
  // get account address
  try {
    // send to account Vibi
    // account using for sending VBC to new people
    // privateKey: e11f5c9977c82fe752f84caeb9ba0c50feabd0ce90088cb26e61ee0fce5950c2
    const sponsorPrivateKey = hexToBytes('0x' + 'e11f5c9977c82fe752f84caeb9ba0c50feabd0ce90088cb26e61ee0fce5950c2')
    const sponserAccount = web3.eth.accounts.privateKeyToAccount('0x' + 'e11f5c9977c82fe752f84caeb9ba0c50feabd0ce90088cb26e61ee0fce5950c2').address
    const sponserNonce = await web3.eth.getTransactionCount(sponserAccount,'latest')
    const txObject = {
      nonce: web3.utils.toHex(sponserNonce),
      gasPrice: web3.utils.toHex(3000000),
      gasLimit: web3.utils.toHex(5000000), // Raise the gas limit to a much higher amount
      to: address,
      value: '0xDE0B6B3A7640000',
      data: '0x0',
    }
    const tx =  LegacyTransaction.fromTxData(txObject,{ common: customCommon })
    const signedTx = tx.sign(sponsorPrivateKey)
    const serializedTx = signedTx.serialize()
    const raw = '0x' + Buffer.from(serializedTx).toString('hex')
    const txHash = web3.utils.sha3(serializedTx);
    console.log("faucet txHash:", txHash)
    const pTx = await web3.eth.sendSignedTransaction(
      raw,
      function (error, receipt) {
        if (!error) {
          console.log("receipt ==> ", receipt);
        } else {
          console.log("error ==> ", error);
        }
      }
    );
    return String(txHash)
  } catch (error) {
    console.error(error)
  }
}

export async function autoRegister(privateKey, firstName, lastName, phoneNumber) {
  try {
    const privateKeyBytes = Buffer.from(privateKey.slice(2), 'hex')
    const account = web3.eth.accounts.privateKeyToAccount(privateKey).address
    await faucet(account)
    let nonce = await web3.eth.getTransactionCount(account,'latest');
    console.log('nonce', nonce)
    const txObject = {
      nonce: web3.utils.toHex(nonce),
      from: account,
      gasLimit: web3.utils.toHex(5000000), // Raise the gas limit to a much higher amount
      to: contractAddress.Token,
      data: contract.methods.register(firstName, lastName, phoneNumber).encodeABI(),
      gasPrice: 3000000,
    }
    const tx = LegacyTransaction.fromTxData(txObject,{ common: customCommon })
    const signedTx = tx.sign(privateKeyBytes)

    const serializedTx = signedTx.serialize()
    const raw = '0x' + Buffer.from(serializedTx).toString('hex')
    const txHash = web3.utils.sha3(serializedTx);
    console.log("txHashRegister: ", txHash)
    const sendTransction = await web3.eth.sendSignedTransaction( raw )
    return txHash
  } catch (error) {
    console.error("ERR: ", error)
  }
}

// async function main() {
//   await autoRegister('043f55c66a491d0c74bf1484d01876d28ea7ef02ca105af557944c3e3bfb7aa3', 'David', 'John', '0918812313')
//   console.log("main")
// }
// main()
// faucet('0x8e9A096546C4dD39861fb7D9897b7Ce211BA4129')


// auto create post --> create post(...) --> 
// bấm dô bài post
// destination Reviews 
// --> Bấm dô bài review khác để upvote
// --> Comments 
// --> Reward History
// --> TourDC Token? 
// --> Voucher ... Exchange 
