const { Web3 } = require('web3');
const DCToken_abi = require("../contracts/ERC20With4RMechanism.json")
const Tourism_abi = require("../contracts/Tourism.json")
const DCToken_address = require("../contracts/ERC20With4RMechanism-address.json")
const Tourism_address = require("../contracts/Tourism-address.json")
const axios = require("axios");
const GLOBAL = require("../Tabs/Custom/Globals")

const VBCProvider = "https://vibi.vbchain.vn/"
var web3 = new Web3(VBCProvider);
contract_DCToken = new web3.eth.Contract(DCToken_abi.abi, DCToken_address.Token)
contract_4R = new web3.eth.Contract(Tourism_abi.abi, Tourism_address.Token)

// import { LegacyTransaction } from '@ethereumjs/tx'
// import { Common, Hardfork } from '@ethereumjs/common'
// import { bytesToHex, hexToBytes } from '@ethereumjs/util'
// import AES from './aes'
const LegacyTransaction = require('@ethereumjs/tx')
const {Common, Hardfork} = require('@ethereumjs/common')
const { bytesToHex, hexToBytes } = require('@ethereumjs/util')
const customCommon = Common.custom({ chainId: 306, networkId: 306 }, { hardfork: Hardfork.Berlin })
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
    return rewardList
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
        return temp;
      }
      return null
    })
    const result = await Promise.all(promises)
    return result
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

const test = async () => {
  const owner = "0x76E046c0811edDA17E57dB5D2C088DB0F30DcC74";
  const address1 = "0x1a620c351c07763f430897AeaA2883E37cA0aaCD"
  const address2 = "0x6481bd19Ff98F34E53099F08B907d916cF22b210"
  const postID = "0xdc7a2cd94317c3b058fd07561342427e3c1dd6fe39e06f189397ab650ba4ec1f"
  // 0x4665d33e56519c29ba14eca5dd03b700e33585fb9dc96d63614be75cab4a6552
  // 0x6481bd19Ff98F34E53099F08B907d916cF22b210
  
  console.log("See reward lists of user: ",await getReviewByPostID('0x3ff3784b8a1d9bff8b59cc876f6cd7d92b0ddc844f952db3a1a3046bcd3e76e0'))
  // console.log("get destination reviews: ", await getDestinationReviews(owner, '65f2c7e1f60b126cb2487527'))
}

test()