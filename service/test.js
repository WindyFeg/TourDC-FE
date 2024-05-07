const { Web3 } = require('web3');
const DCToken_abi = require("../contracts/ERC20With4RMechanism.json")
const Tourism_abi = require("../contracts/Tourism.json")
const DCToken_address = require("../contracts/ERC20With4RMechanism-address.json")
const Tourism_address = require("../contracts/Tourism-address.json")
const Voucher_address = require("../contracts/Voucher-address.json")
const Voucher_abi = require("../contracts/Voucher.json")
const axios = require("axios");
const GLOBAL = require("../Tabs/Custom/Globals")
// const toObject = require("./helper")
const VBCProvider = "https://vibi.vbchain.vn/"
const infuraProvider = "https://sepolia.infura.io/v3/185ca6c54cdb438b977b428d45017f05"

var web3 = new Web3(infuraProvider);
contract_DCToken = new web3.eth.Contract(DCToken_abi.abi, DCToken_address.Token)
contract_4R = new web3.eth.Contract(Tourism_abi.abi, Tourism_address.Token)
contract_voucher = new web3.eth.Contract(Voucher_abi.abi, Voucher_address.Token)

// import { LegacyTransaction } from '@ethereumjs/tx'
// import { Common, Hardfork } from '@ethereumjs/common'
// import { bytesToHex, hexToBytes } from '@ethereumjs/util'
// import AES from './aes'
const {LegacyTransaction} = require('@ethereumjs/tx')
const {Chain, Common, Hardfork} = require('@ethereumjs/common')
const { bytesToHex, hexToBytes } = require('@ethereumjs/util')
// const customCommon = Common.custom({ chainId: 306, networkId: 306 }, { hardfork: Hardfork.Berlin })
const customCommon = new Common({ chain: Chain.Sepolia })
const getCommentsOfReviewPost = async (postID) => {
  try {
    const comments = await contract_4R.methods.getAllCommentOfReviewPost(postID).call()
    const promises = comments.map(async (ele) => {
      ele.userInfor = (await axios.post(`${GLOBAL.BASE_URL}/api/user/getCurrent`, { address: ele.author })).data.user
      ele.REP = Number(await contract_4R.methods.touristREP(ele.author).call())
      ele.VP = Number(await contract_4R.methods.touristVP(ele.author).call())
      ele.upvoteNum = Number(ele.upvoteNum)
      return ele
    })
    const result = await Promise.all(promises)
    return result;
  } catch (error) {
    console.error("Error in getTouristREP:", error);
    throw error;
  }
}

const getListOfReward = async(address) => {
  try {
    const arr = []
    const rewardList = await contract_4R.methods.seeRewardLists().call({from: address}) 
    console.log(rewardList)
    const promises = rewardList.map(async (ele) => {
      let temp = {}
      const touristRewardOnPostID = Number(await contract_4R.methods.touristRewardOnPostID(address, ele).call()) / 10**18;
      if (touristRewardOnPostID != 0) {
        temp.rewardPoint = touristRewardOnPostID
        temp.postID = ele;
        const reviewPost = await contract_4R.methods.reviewByID(ele).call()
        const author = reviewPost.author
        temp.createTime = Number(reviewPost.createTime)
        temp.author = reviewPost.author
        if (address == author) {
          temp.reason = 1;
        } else {
          temp.reason = 0;
        }
        arr.push(temp);
      }
    })
    const result = await Promise.all(promises)
    return arr
  } catch (error) {
    throw error
  }
}

async function divide(postID) {
  const sponsorPrivateKey = hexToBytes('0x' + 'e11f5c9977c82fe752f84caeb9ba0c50feabd0ce90088cb26e61ee0fce5950c2')
      const sponserAccount = web3.eth.accounts.privateKeyToAccount('0x' + 'e11f5c9977c82fe752f84caeb9ba0c50feabd0ce90088cb26e61ee0fce5950c2').address
      const sponserNonce = await web3.eth.getTransactionCount(sponserAccount, 'latest')
      const txObject = {
        nonce: web3.utils.toHex(sponserNonce),
        gasPrice: web3.utils.toHex(3000000),
        gasLimit: web3.utils.toHex(5000000), // Raise the gas limit to a much higher amount
        to: address,
        data: contract_4R.methods.divideRewardBy4R(postID).encodeABI(),
      }
      const tx = LegacyTransaction.fromTxData(txObject, { common: customCommon })
      const signedTx = tx.sign(sponsorPrivateKey)
      const serializedTx = signedTx.serialize()
      const raw = '0x' + Buffer.from(serializedTx).toString('hex')
      const txHash = web3.utils.sha3(serializedTx);
      console.log("divide hash:", txHash)
      const sendTx = await web3.eth.sendSignedTransaction(raw)
      return sendTx
}

const getTotalRewardOfReview = async(postID) => {
  try {
    return Number(await contract_4R.methods.reviewReward(postID).call())
  } catch (error) {
    console.log(error)
  }
}

const getTouristReviews = async (user_address) => {
  try {
    let reviews = await contract_4R.methods.getAllReviewsOfTourist(user_address).call()
    const promises = reviews.map(async (review) => {
      // let isVoted = await contract_4R.methods.isVoted(address, review[1]).call()
      // let totalReward = await contract_4R.methods.reviewReward(review.postID).call()
      // console.log(isVoted)
      const hash = await axios.get(`${GLOBAL.BASE_URL}/api/post/getHash/${"0x42414b7734317e89b9b424f2be8553a16c3ce7062bb0149a5e6145a959b0a8d6"}`)
      review.totalReward = Number(await contract_4R.methods.reviewReward(review.postID).call())
      review.upvoteNum = Number(review.upvoteNum)
      review.rate = Number(review.rate)
      review.createTime = Number(review.createTime)
      review.hash = hash.data.data != null ? hash.data.data.trHash : null
      return review
    })
    const result = await Promise.all(promises)
    return result
  } catch (error) {
    console.error("Error in getTouristReviews:", error);
    throw error;
  }
}
const getDestinationReviews = async (address, place_id) => {
  try {
    const destinationReviews = await contract_4R.methods.getAllReviewsOfDestinations(place_id).call()

    const result = destinationReviews.map(async (review) => {
      // let isVoted = await contract_4R.methods.isVoted(address, review[1]).call()
      // let totalReward = await contract_4R.methods.reviewReward(review.postID).call()
      // console.log(isVoted)
      review.totalReward = Number(await contract_4R.methods.reviewReward(review.postID).call())
      review.isVoted = Number(await contract_4R.methods.isVoted(address, review[1]).call())
      review.upvoteNum = Number(review.upvoteNum)
      review.rate = Number(review.rate)
      review.createTime = Number(review.createTime)
      return review
    })

    const final = await Promise.all(result)
    return final
  } catch (error) {
    console.error("Error in getDestinationReviews:", error);
    throw error;
  }

}
const getBalanceOf = async (user_address) => {
  try {
    return Number(await contract_DCToken.methods.balanceOf(user_address).call())/10**18
  } catch (error) {
    console.error("Error in getBalanceOf:", error);
    throw error; // Re-throw the error if needed
  }
}
const getReviewByPostID = async (postID) => {
  try {
    const reward = Number(await contract_4R.methods.reviewReward(postID).call())
    const post = await contract_4R.methods.reviewByID(postID).call();
    post.reward = reward
    return post
  } catch (error) {
    console.error("Error in touristRewardPointOnPostID:", error);
    throw error; // Re-throw the error if needed
  }
}

const getAllVoucher = async() => {
  try {
    return toObject(await contract_voucher.methods.getAllVouchers().call())
  } catch (error) {
    console.error("Error in touristRewardPointOnPostID:", error);
    throw error; // Re-throw the error if needed
  }
}
const getUserVouchers = async(owner) => {
  try {
    const vouchers =  toObject(await contract_voucher.methods.getUserVouchers().call({from: owner}))
    let amount = {}
    
    vouchers.map((voucher) => {
      if (voucher.id in amount) {
        amount[voucher.id]++;
      } else amount[voucher.id] = 1;
    })
    let unique = new Map(vouchers.map(obj => [obj.id, obj]));

    let uniqueArray = Array.from(unique.values());
    uniqueArray.map((voucher) => {
      voucher.amount = amount[voucher.id]
    })
    return uniqueArray;
  } catch (error) {
    console.error("Error in touristRewardPointOnPostID:", error);
    throw error; // Re-throw the error if needed
  }
}

async function autoExchangeVoucher(voucherID) {
  try {
    // decrypted private_key
    let privateKey = "0xe11f5c9977c82fe752f84caeb9ba0c50feabd0ce90088cb26e61ee0fce5950c2"
    const account = web3.eth.accounts.privateKeyToAccount(privateKey).address

    let nonce = await web3.eth.getTransactionCount(account, 'latest');
    const txObject = {
      nonce: web3.utils.toHex(nonce),
      from: account,
      gasLimit: web3.utils.toHex(5000000), // Raise the gas limit to a much higher amount
      to: Voucher_address.Token,
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
    const sendTransaction = web3.eth.sendSignedTransaction(raw)
    .on("receipt", async(receipt) => {
      let reason = "Exchange Voucher"
      try {
        console.log("Save into Back End...")
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

const faucet = async (address) => {
  // get account address
  try {
    // send to account Vibi
    // account using for sending VBC to new people
    const sponsorPrivateKey = hexToBytes('0x' + 'e11f5c9977c82fe752f84caeb9ba0c50feabd0ce90088cb26e61ee0fce5950c2')
    const sponserAccount = web3.eth.accounts.privateKeyToAccount('0x' + 'e11f5c9977c82fe752f84caeb9ba0c50feabd0ce90088cb26e61ee0fce5950c2').address
    const sponserNonce = await web3.eth.getTransactionCount(sponserAccount, 'latest')

    const maxPriorityFeePerGas = await web3.eth.getMaxPriorityFeePerGas()
    console.log("maxPriorityFeePerGas: ", maxPriorityFeePerGas)

    const estimateGas = await web3.eth.estimateGas({
      to: address,
    })
    console.log("Estimate Gas: ", estimateGas)
    const maxFeePerGas = await web3.eth.getBlock("pending")
    const txObject = {
      nonce: web3.utils.toHex(sponserNonce),
      gasPrice: BigInt(Math.floor(Number(maxFeePerGas.baseFeePerGas)*(1.1))),
      gasLimit: web3.utils.toHex(3000000), // Raise the gas limit to a much higher amount
      to: address,
      value: '0x16345785D8A0000',
      maxPriorityFeePerGas: maxPriorityFeePerGas,
      maxFeePerGas: BigInt(Math.floor(Number(maxFeePerGas.baseFeePerGas)*(1.1)))
    }
    console.log("txObject: ", txObject)
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

async function autoRegister(privateKey) {
  try {
    let startTime = performance.now()
    const privateKeyBytes = Buffer.from(privateKey.slice(2), 'hex')
    const account = web3.eth.accounts.privateKeyToAccount(privateKey).address
    // await faucet(account)
    let nonce = await web3.eth.getTransactionCount(account, 'latest');
    console.log('nonce', nonce)
    const txObject = {
      nonce: web3.utils.toHex(nonce),
      from: account,
      gasLimit: web3.utils.toHex(300000), // Raise the gas limit to a much higher amount
      to:  Tourism_address.Token,
      data: contract_4R.methods.register().encodeABI(),
      gasPrice: 200000000000,
    }
    const tx = LegacyTransaction.fromTxData(txObject, { common: customCommon })
    const signedTx = tx.sign(privateKeyBytes)

    const serializedTx = signedTx.serialize()
    const raw = '0x' + Buffer.from(serializedTx).toString('hex')
    const txHash = web3.utils.sha3(serializedTx);
    console.log("txHashRegister: ", txHash)
    await web3.eth.sendSignedTransaction(raw)
    let endTime = performance.now()
    console.log(`Call to Register took ${endTime - startTime} milliseconds`)
    return txHash
  } catch (error) {
    console.error("ERR: ", error)
  }
}

async function autoCheckIn(privateKey, address, placeID) {
  try {

    // signmessage
    const account = web3.eth.accounts.privateKeyToAccount(privateKey).address

    let nonce = await web3.eth.getTransactionCount(account, 'latest');
    let data = contract_4R.methods.checkIn(placeID).encodeABI();

    const txObject = {
      nonce: web3.utils.toHex(Number(nonce)),
      from: account,
      gasLimit: web3.utils.toHex(3000000), // Raise the gas limit to a much higher amount
      to: Tourism_address.Token,
      data: contract_4R.methods.checkIn(placeID).encodeABI(),
      // maxFeePerGas: 32527070143,
      gasPrice: 50000000000 
    }
    console.log('txObject:', txObject)
    const tx = LegacyTransaction.fromTxData(txObject, { common: customCommon })

    const privateKeyBytes = Buffer.from(privateKey.slice(2), 'hex')
    const signedTx = tx.sign(privateKeyBytes)

    const serializedTx = signedTx.serialize()
    const raw = '0x' + Buffer.from(serializedTx).toString('hex')
    const txHash = web3.utils.sha3(serializedTx);
    console.log("checkIn txHash: ", txHash)
    await web3.eth.sendSignedTransaction(raw)
    .on('receipt', (sendtransaction) => {
      const postID = sendtransaction.logs[0].topics[1]
      console.log('postID', postID)
      console.log('save postID to db')
      // call api to save post in db
      // axios.post(`${GLOBAL.BASE_URL}/api/post/add`, {
      //   hash: txHash,
      //   placeID: placeID,
      // })
    })
    .on('error', console.error)
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

const test = async () => {
  const owner = "0x76E046c0811edDA17E57dB5D2C088DB0F30DcC74";
  const address1 = "0x1a620c351c07763f430897AeaA2883E37cA0aaCD"
  const address2 = "0x6481bd19Ff98F34E53099F08B907d916cF22b210"
  const postID = "0xdc7a2cd94317c3b058fd07561342427e3c1dd6fe39e06f189397ab650ba4ec1f"
  // 0x4665d33e56519c29ba14eca5dd03b700e33585fb9dc96d63614be75cab4a6552
  // 0x6481bd19Ff98F34E53099F08B907d916cF22b210
  
  // console.log("See voucher lists of user: ",await getUserVouchers(owner))
  // await autoExchangeVoucher(1)
  // await faucet(address1)
  // await autoRegister('0x68e69f75a55589f3fc4a47246921cfde47f2d7490320fb4defdd344453c5ea43', "Duy", "Cong", "0918844446")
  // console.log("get destination reviews: ", await getDestinationReviews(owner, '65f2c7e1f60b126cb2487527'))
  // await autoCheckIn('0xe11f5c9977c82fe752f84caeb9ba0c50feabd0ce90088cb26e61ee0fce5950c2', '0x76E046c0811edDA17E57dB5D2C088DB0F30DcC74' ,'65f2c7e1f60b126cb2487527')
  await getDestinationReviews()
}

test()