
import Web3 from "web3";
import GLOBAL from "../Tabs/Custom/Globals";

import contractABI from "../contracts/Tourism.json"
import contractAddress from "../contracts/Tourism-address.json"
import contractVoucherAddress from "../contracts/Voucher-address.json"
import { LegacyTransaction } from '@ethereumjs/tx'
import axios from "axios";
import { Common, Hardfork } from '@ethereumjs/common'
import { bytesToHex, hexToBytes } from '@ethereumjs/util'
import AES from './aes'
import { contract_voucher } from './web3config'
import { toObject } from './helper'

const VBCProvider = "https://vibi.vbchain.vn/"
var web3 = new Web3(VBCProvider);
const contract = new web3.eth.Contract(contractABI.abi, contractAddress.Token);

const customCommon = Common.custom({ chainId: 306, networkId: 306 }, { hardfork: Hardfork.Berlin })
export async function autoCheckIn(randomKey, address, placeID) {
  try {
    // call api to get private_key_encrypt
    // console.log(await web3.eth.getTransactionReceipt('0xd7abc07daf4096b9ab81c9468edd298a011b216d4ae78448137b93560936fece'))
    let startTime = performance.now()
    let response = await axios.post(`${GLOBAL.BASE_URL}/api/user/getPrivateEnc`, { address: address })
    let enc_private_key = response.data.data

    if (enc_private_key.success == false) {
      return enc_private_key
    }

    // decrypted private_key
    let privateKey = AES.decryptedPrivateKey(randomKey, enc_private_key).privateKey
    console.log('privateKey: ', privateKey)

    // signmessage
    const account = web3.eth.accounts.privateKeyToAccount(privateKey).address

    let nonce = await web3.eth.getTransactionCount(account, 'latest');
    let data = contract.methods.checkIn(placeID).encodeABI();

    const txObject = {
      nonce: web3.utils.toHex(nonce),
      from: account,
      gasLimit: web3.utils.toHex(5000000), // Raise the gas limit to a much higher amount
      to: contractAddress.Token,
      data: contract.methods.checkIn(placeID).encodeABI(),
      gasPrice: 3000000,
    }
    console.log('txObject:', txObject)
    const tx = LegacyTransaction.fromTxData(txObject, { common: customCommon })

    const privateKeyBytes = Buffer.from(privateKey.slice(2), 'hex')
    const signedTx = tx.sign(privateKeyBytes)

    const serializedTx = signedTx.serialize()
    const raw = '0x' + Buffer.from(serializedTx).toString('hex')
    const txHash = web3.utils.sha3(serializedTx);
    console.log("checkIn txHash: ", txHash)
    web3.eth.sendSignedTransaction(raw)
    .then((sendtransaction) => {
      const postID = sendtransaction.logs[0].topics[1]
      console.log('postID', postID)
      // call api to save post in db
      axios.post(`${GLOBAL.BASE_URL}/api/post/add`, {
        hash: txHash,
        placeID: placeID,
      })
    })
    let endTime = performance.now()
    console.log(`Call to CheckIn took ${endTime - startTime} milliseconds`)
    return {
      success: true,
      txHash: txHash,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: error.message
    }
  }
}


const faucet = async (address) => {
  // get account address
  try {
    // send to account Vibi
    // account using for sending VBC to new people
    const sponsorPrivateKey = hexToBytes('0x' + 'e11f5c9977c82fe752f84caeb9ba0c50feabd0ce90088cb26e61ee0fce5950c2')
    const sponserAccount = web3.eth.accounts.privateKeyToAccount('0x' + 'e11f5c9977c82fe752f84caeb9ba0c50feabd0ce90088cb26e61ee0fce5950c2').address
    const sponserNonce = await web3.eth.getTransactionCount(sponserAccount, 'latest')
    const txObject = {
      nonce: web3.utils.toHex(sponserNonce),
      gasPrice: web3.utils.toHex(3000000),
      gasLimit: web3.utils.toHex(5000000), // Raise the gas limit to a much higher amount
      to: address,
      value: '0xDE0B6B3A7640000',
      data: '0x0',
    }
    const tx = LegacyTransaction.fromTxData(txObject, { common: customCommon })
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
    let startTime = performance.now()
    const privateKeyBytes = Buffer.from(privateKey.slice(2), 'hex')
    const account = web3.eth.accounts.privateKeyToAccount(privateKey).address
    await faucet(account)
    let nonce = await web3.eth.getTransactionCount(account, 'latest');
    console.log('nonce', nonce)
    const txObject = {
      nonce: web3.utils.toHex(nonce),
      from: account,
      gasLimit: web3.utils.toHex(5000000), // Raise the gas limit to a much higher amount
      to: contractAddress.Token,
      data: contract.methods.register().encodeABI(),
      gasPrice: 3000000,
    }
    const tx = LegacyTransaction.fromTxData(txObject, { common: customCommon })
    const signedTx = tx.sign(privateKeyBytes)

    const serializedTx = signedTx.serialize()
    const raw = '0x' + Buffer.from(serializedTx).toString('hex')
    const txHash = web3.utils.sha3(serializedTx);
    console.log("txHashRegister: ", txHash)
    web3.eth.sendSignedTransaction(raw)
    let endTime = performance.now()
    console.log(`Call to Register took ${endTime - startTime} milliseconds`)
    return txHash
  } catch (error) {
    console.error("ERR: ", error)
  }
}


export async function autoCreatePost(randomKey, address, placeID, postID, title, rate, review) {
  try {
    let startTime = performance.now()
    let response = await axios.post(`${GLOBAL.BASE_URL}/api/user/getPrivateEnc`, { address: address })
    let enc_private_key = response.data.data
    // let enc_private_key = '29b05dee4c7d1818c44a99dd1e098f8bb01caceff6b53c29602288a3e9bd6191'
    if (enc_private_key.success == false) {
      return enc_private_key
    }

    // decrypted private_key
    let privateKey = AES.decryptedPrivateKey(randomKey, enc_private_key).privateKey
    console.log('privateKey:', privateKey)
    const account = web3.eth.accounts.privateKeyToAccount(privateKey).address

    let nonce = await web3.eth.getTransactionCount(account, 'latest');
    let data = contract.methods.checkIn(placeID).encodeABI();

    const txObject = {
      nonce: web3.utils.toHex(nonce),
      from: account,
      gasLimit: web3.utils.toHex(5000000), // Raise the gas limit to a much higher amount
      to: contractAddress.Token,
      data: contract.methods.reviews(placeID, postID, title, rate, review).encodeABI(),
      gasPrice: 3000000,
    }
    console.log('txObject:', txObject)
    const tx = LegacyTransaction.fromTxData(txObject, { common: customCommon })

    const privateKeyBytes = Buffer.from(privateKey.slice(2), 'hex')
    const signedTx = tx.sign(privateKeyBytes)

    const serializedTx = signedTx.serialize()
    const raw = '0x' + Buffer.from(serializedTx).toString('hex')
    const txHash = web3.utils.sha3(serializedTx);
    console.log('txHash: ', txHash)
    web3.eth.sendSignedTransaction(raw)
    .on('receipt', () => {
      console.log("update to DB")
      axios.post(`${GLOBAL.BASE_URL}/api/post/updateReview`, { postID: postID })
    });
    let endTime = performance.now()
    setTimeout(async() => {
      const sponsorPrivateKey = hexToBytes('0x' + 'e11f5c9977c82fe752f84caeb9ba0c50feabd0ce90088cb26e61ee0fce5950c2')
      const sponserAccount = web3.eth.accounts.privateKeyToAccount('0x' + 'e11f5c9977c82fe752f84caeb9ba0c50feabd0ce90088cb26e61ee0fce5950c2').address
      const sponserNonce = await web3.eth.getTransactionCount(sponserAccount, 'latest')
      const txObject = {
        nonce: web3.utils.toHex(sponserNonce),
        gasPrice: web3.utils.toHex(3000000),
        gasLimit: web3.utils.toHex(5000000), // Raise the gas limit to a much higher amount
        to: contractAddress.Token,
        data: contract.methods.divideRewardBy4R(postID).encodeABI(),
      }
      const tx = LegacyTransaction.fromTxData(txObject, { common: customCommon })
      const signedTx = tx.sign(sponsorPrivateKey)
      const serializedTx = signedTx.serialize()
      const raw = '0x' + Buffer.from(serializedTx).toString('hex')
      const txHash = web3.utils.sha3(serializedTx);
      console.log("divide hash:", txHash)
      await web3.eth.sendSignedTransaction(raw)
    }, 1*30000)
    console.log(`Call to Create Post took ${endTime - startTime} milliseconds`)
    return txHash
  } catch (error) {
    console.error("ERR: ", error)
  }
}

export async function autoUpvote(randomKey, address, postID) {
  try {
    // let enc_private_key = await axios.post(`${GLOBAL.BASE_URL}/api/user/getPrivateEnc`, {address: address})
    let startTime = performance.now()
    let response = await axios.post(`${GLOBAL.BASE_URL}/api/user/getPrivateEnc`, { address: address })
    let enc_private_key = response.data.data
    console.log('enc_private_key:', enc_private_key )
    if (enc_private_key.success == false) {
      return enc_private_key
    }

    // decrypted private_key
    let privateKey = AES.decryptedPrivateKey(randomKey, enc_private_key).privateKey
    const account = web3.eth.accounts.privateKeyToAccount(privateKey).address

    let nonce = await web3.eth.getTransactionCount(account, 'latest');
    const txObject = {
      nonce: web3.utils.toHex(nonce),
      from: account,
      gasLimit: web3.utils.toHex(5000000), // Raise the gas limit to a much higher amount
      to: contractAddress.Token,
      data: await contract.methods.upvote(postID).encodeABI(),
      gasPrice: 3000000,
    }
    console.log('txObject:', txObject)
    const tx = LegacyTransaction.fromTxData(txObject, { common: customCommon })

    const privateKeyBytes = Buffer.from(privateKey.slice(2), 'hex')
    const signedTx = tx.sign(privateKeyBytes)

    const serializedTx = signedTx.serialize()
    const raw = '0x' + Buffer.from(serializedTx).toString('hex')
    const txHash = web3.utils.sha3(serializedTx);
    console.log('txHash: ', txHash)
    const sendTransction = await web3.eth.sendSignedTransaction(raw)
    let endTime = performance.now()
    console.log(`Call to Upvote Post took ${endTime - startTime} milliseconds`)

    return txHash

  } catch (error) {
    console.error("ERR: ", error.message)
  }
}

export async function autoComment(randomKey, address, postID, content) {
  try {
    // let enc_private_key = await axios.post(`${GLOBAL.BASE_URL}/api/user/getPrivateEnc`, {address: address})
    let response = await axios.post(`${GLOBAL.BASE_URL}/api/user/getPrivateEnc`, { address: address })
    let enc_private_key = response.data.data
    console.log('enc_private_key:', enc_private_key )
    if (enc_private_key.success == false) {
      return enc_private_key
    }

    // decrypted private_key
    let privateKey = AES.decryptedPrivateKey(randomKey, enc_private_key).privateKey
    const account = web3.eth.accounts.privateKeyToAccount(privateKey).address

    let nonce = await web3.eth.getTransactionCount(account, 'latest');
    const txObject = {
      nonce: web3.utils.toHex(nonce),
      from: account,
      gasLimit: web3.utils.toHex(5000000), // Raise the gas limit to a much higher amount
      to: contractAddress.Token,
      data: await contract.methods.comment(postID, content).encodeABI(),
      gasPrice: 3000000,
    }
    console.log('txObject:', txObject)
    const tx = LegacyTransaction.fromTxData(txObject, { common: customCommon })

    const privateKeyBytes = Buffer.from(privateKey.slice(2), 'hex')
    const signedTx = tx.sign(privateKeyBytes)

    const serializedTx = signedTx.serialize()
    const raw = '0x' + Buffer.from(serializedTx).toString('hex')
    const txHash = web3.utils.sha3(serializedTx);
    console.log('txHash: ', txHash)
    const sendTransction = await web3.eth.sendSignedTransaction(raw)
    return txHash

  } catch (error) {
    console.error("ERR: ", error.message)
  }
}



export async function autoGetReward(randomKey, address, postID) {
  try {
    // let enc_private_key = await axios.post(`${GLOBAL.BASE_URL}/api/user/getPrivateEnc`, {address: address})
    let response = await axios.post(`${GLOBAL.BASE_URL}/api/user/getPrivateEnc`, { address: address })
    let enc_private_key = response.data.data
    console.log('enc_private_key:', enc_private_key )
    if (enc_private_key.success == false) {
      return enc_private_key
    }

    // decrypted private_key
    let privateKey = AES.decryptedPrivateKey(randomKey, enc_private_key).privateKey
    const account = web3.eth.accounts.privateKeyToAccount(privateKey).address

    let nonce = await web3.eth.getTransactionCount(account, 'latest');
    const txObject = {
      nonce: web3.utils.toHex(nonce),
      from: account,
      gasLimit: web3.utils.toHex(5000000), // Raise the gas limit to a much higher amount
      to: contractAddress.Token,
      data: await contract.methods.getRewardPoint(postID).encodeABI(),
      gasPrice: 3000000,
    }
    console.log('txObject:', txObject)
    const tx = LegacyTransaction.fromTxData(txObject, { common: customCommon })

    const privateKeyBytes = Buffer.from(privateKey.slice(2), 'hex')
    const signedTx = tx.sign(privateKeyBytes)

    const serializedTx = signedTx.serialize()
    const raw = '0x' + Buffer.from(serializedTx).toString('hex')
    const txHash = web3.utils.sha3(serializedTx);
    console.log('txHash: ', txHash)
    const sendTransction = web3.eth.sendSignedTransaction(raw)
    .on("receipt", async(receipt) => {
      
      let reason;
      console.log("receipt: ", receipt)
      console.log("Author address: ", receipt.from)
      if ((receipt.from) != address.toLowerCase()) {
        reason = "Upvote Reward"
      } else reason = "Author Reward"
      try {
        await axios.post(`${GLOBAL.BASE_URL}/api/transaction/add`, {hash: receipt.transactionHash, reason: reason})
      } catch (error) {
        console.error(error)
      }
    })
    .on('error', console.error)
    return txHash
  } catch (error) {
    console.error("ERR: ", error.message)
  }
}

export async function autoExchangeVoucher(randomKey, address, voucherID) {
  try {
    // let enc_private_key = await axios.post(`${GLOBAL.BASE_URL}/api/user/getPrivateEnc`, {address: address})
    let response = await axios.post(`${GLOBAL.BASE_URL}/api/user/getPrivateEnc`, { address: address })
    let enc_private_key = response.data.data
    console.log('enc_private_key:', enc_private_key )
    if (enc_private_key.success == false) {
      return enc_private_key
    }

    // decrypted private_key
    let privateKey = AES.decryptedPrivateKey(randomKey, enc_private_key).privateKey
    const account = web3.eth.accounts.privateKeyToAccount(privateKey).address

    let nonce = await web3.eth.getTransactionCount(account, 'latest');
    const txObject = {
      nonce: web3.utils.toHex(nonce),
      from: account,
      gasLimit: web3.utils.toHex(5000000), // Raise the gas limit to a much higher amount
      to: contractVoucherAddress.Token,
      data: await contract_voucher.methods.exchangeVoucher(voucherID).encodeABI(),
      gasPrice: 3000000,
    }
    console.log('txObject:', txObject)
    const tx = LegacyTransaction.fromTxData(txObject, { common: customCommon })

    const privateKeyBytes = Buffer.from(privateKey.slice(2), 'hex')
    const signedTx = tx.sign(privateKeyBytes)

    const serializedTx = signedTx.serialize()
    const raw = '0x' + Buffer.from(serializedTx).toString('hex')
    const txHash = web3.utils.sha3(serializedTx);
    console.log('txHash: ', txHash)
    const sendTransction = web3.eth.sendSignedTransaction(raw)
    .on("receipt", async(receipt) => {
      let reason = "Exchange Voucher"
      try {
        await axios.post(`${GLOBAL.BASE_URL}/api/transaction/add`, {hash: receipt.transactionHash, reason: reason})
      } catch (error) {
        console.error(error)
      }
    })
    .on('error', console.error)
    return txHash
  } catch (error) {
    console.error("ERR: ", error.message)
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


// 0x12341234123412 randomkey

// share1: 80151bba053547fa7e66db299c4330525ca8e273956ec6e0903c6c8951f2b2c7f3bce7f44e7500b4ed44b0b33607f9920ddb5f4c532c02bdb564334c0112655846eef845819ce097a2a28f98ab8c0c064cab815838912c6cf2c870eecadd5ea3dc3e39939fa74018567c242aabe84ed4e6068e4a4c39f81040bc3c1e702cda298ab
// share2: 802a26b5da6a8fe53d1da792f95660a4a89014e72acc5dc1206918d373e5658fe7681fe88d3a0169cb5961666c0fe2f40a777f597649d56abac86689d224caa15dcc315b0328112f45450ef096d9d9dc8896d2a1b0f24918358131cc547b7c97a98db7972bae85e179b99d24932159b9c95d08355c8234308439bc9d35787d12d1b
// share3: 803f3d0fdf5fc81f437b7cbb651550f6f438f694bfa29b21b055745a2217d74814d4f81cc34f01dd261dd1d55a081b6607ac20152565d7d70fac55c5d336aff91b22c91e82b4f1b8e7e781683d55d5dac43d53f988636574c74941229ea6223475a38d24b719c6b92cf5ba2e3bd9142d2c6b855f13abcf60c7b583a34644a0bb580

// enc_private_key: AB9E13C8D3B09F120DD13BA473B953D487F7028A518B696E0D4662082BD5373D018F8C316A2FB0CE04951BFB36899B386781562D95885A1CEC2684A7A00C2D683A282A62370B29B7DA5FF708BFF7002A

// private key: e11f5c9977c82fe752f84caeb9ba0c50feabd0ce90088cb2  6e61ee0fce5950c2


// checkIn('0x12341234123412','address', '65f2c7e1f60b126cb2487527')
//  0x977bf9b413168b9ba6b89beb028b5885f8fec5082da4810709ecd320f3a2e6b0