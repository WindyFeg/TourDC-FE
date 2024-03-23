
import Web3 from "web3";
import DCToken_abi from "../contracts/ERC20With4RMechanism.json"
import DCToken_address from "../contracts/ERC20With4RMechanism-address.json"
import Tourism_abi from "../contracts/Tourism.json"
import Tourism_address from "../contracts/Tourism-address.json"

// const { Web3 } = require('web3');
// const DCToken_abi = require("../contracts/ERC20With4RMechanism.json")
// const Tourism_abi = require("../contracts/Tourism.json")
// const DCToken_address = require("../contracts/ERC20With4RMechanism-address.json")
// const Tourism_address = require("../contracts/Tourism-address.json")


const VBCProvider = "https://vibi.vbchain.vn/"
// const InfuraProvider = 'https://sepolia.infura.io/v3/c6b95d3b003e40cda8dcf76f7ba58be8'

// const localHost = "http://127.0.0.1:8545/"
// var web3Provider = Web3.providers.HttpProvider(InfuraProvider);
var web3 = new Web3(VBCProvider);
contract_DCToken = new web3.eth.Contract(DCToken_abi.abi, DCToken_address.Token)
contract_4R = new web3.eth.Contract(Tourism_abi.abi, Tourism_address.Token)

const getBalanceOf = async (user_address) => {
  try {
    return await contract_DCToken.methods.balanceOf(user_address).call()
  } catch (error) {
    console.error("Error in getBalanceOf:", error);
    throw error; // Re-throw the error if needed
  }

}

const getTouristInfor = async (user_address) => {
  try {
    return await contract_4R.methods.touristIdentify(user_address).call()
  } catch (error) {
    console.error("Error in getTouristInfor:", error);
    throw error; // Re-throw the error if needed
  }
}

const getTouristReviews = async (user_address) => {
  try {
    return await contract_4R.methods.getAllReviewsOfTourist(user_address).call()
  } catch (error) {
    console.error("Error in getTouristReviews:", error);
    throw error;
  }
}


const getDestinationReviews = async (place_id) => {
  try {
    return await contract_4R.methods.getAllReviewsOfDestinations(place_id).call()
  } catch (error) {
    console.error("Error in getDestinationReviews:", error);
    throw error;
  }

}

const getDestinationRates = async (place_id) => {
  try {
    return await contract_4R.methods.getDestinationRates(place_id).call()
  } catch (error) {
    console.error("Error in getDestinationRates:", error);
    throw error; // Re-throw the error if needed
  }

}

const getVotesOfReview = async (post_id) => {
  try {
    return await contract_4R.methods.getVoteOfReview(post_id).call()
  } catch (error) {
    console.error("Error in getVotesOfReview:", error);
    throw error; // Re-throw the error if needed
  }

}

const calculationTotalReward = async (post_id) => {
  try {
    return await contract_4R.methods.calculateTotalReward(post_id).call()
  } catch (error) {
    console.error("Error in calculationTotalReward:", error);
    throw error; // Re-throw the error if needed
  }

}

const rewardListOfTourist = async (user_address) => {
  try {
    return await contract_4R.methods.seeRewardLists().call({ from: user_address });
  } catch (error) {
    console.error("Error in rewardListOfTourist:", error);
    throw error; // Re-throw the error if needed
  }

}

const touristRewardPointOnPostID = async (user_address, post_id) => {
  try {
    return await contract_4R.methods.touristRewardOnPostID(user_address, post_id).call();
  } catch (error) {
    console.error("Error in touristRewardPointOnPostID:", error);
    throw error; // Re-throw the error if needed
  }
}

const getReviewByPostID = async (postID) => {
  try {
    return await contract_4R.methods.reviewByID(postID).call();
  } catch (error) {
    console.error("Error in touristRewardPointOnPostID:", error);
    throw error; // Re-throw the error if needed
  }
}

const getRewardListsPostID = async (userAddress) => {
  try {
    return await contract_4R.methods.seeRewardLists().call({ from: userAddress });
  } catch (error) {
    console.error("Error in touristRewardPointOnPostID:", error);
    throw error; // Re-throw the error if needed
  }
}

const getRewardPoinFromPostID = async (postID, user_address) => {
  try {
    return await contract_4R.methods.touristRewardOnPostID(user_address, postID).call();
  } catch (error) {
    console.error("Error in touristRewardPointOnPostID:", error);
    throw error; // Re-throw the error if needed
  }
}

const account1 = '0x1a620c351c07763f430897AeaA2883E37cA0aaCD'
const account2 = '0x2936E9fACfF3fb5DDc08d13DB19659ec093cdE69'
const account3 = '0x9E0E58F9052aDc53986eA9ca7cf8389b0EdE364f'


// accoutn tourist 1: 0x1a620c351c07763f430897AeaA2883E37cA0aaCD
// post ID: 0x26eecb00ddef76d58362552f4fd2e782ae49d1e064ccd5b06bd70dcd8039ec35
// account tourist 2: 0x2936E9fACfF3fb5DDc08d13DB19659ec093cdE69
// account Tourist 3: 0x9E0E58F9052aDc53986eA9ca7cf8389b0EdE364f
const test = async () => {
  const owner = "0x76E046c0811edDA17E57dB5D2C088DB0F30DcC74";
  const address1 = "0x1a620c351c07763f430897AeaA2883E37cA0aaCD"
  const address2 = "0x9E0E58F9052aDc53986eA9ca7cf8389b0EdE364f"
  const postID = "0x5a28a54a254168fde809b36b87260f51a07c299f232380cc09e5d6c271c2b77c"

  console.log(await getBalanceOf(owner))
  console.log("getTouristInfor function: ", await getTouristInfor(owner))
  console.log("get all reviews of tourist: ", await getTouristReviews(owner))
  console.log("get all review of destination: ", await getDestinationReviews("65d6ec325ecf27cb3d803d87"))
  console.log("get review By Post ID: ", await getReviewByPostID(postID))
  console.log("see postID list can get reward of account: ", await getRewardListsPostID(owner))
  console.log("see reward of one postID of acc1: ", await getRewardPoinFromPostID(postID, owner))
  console.log("see reward of one postID of acc2: ", await getRewardPoinFromPostID(postID, address1))
  console.log("see reward of one postID of acc3: ", await getRewardPoinFromPostID(postID, address2))


  // console.log("get all rates of destination: ", await getDestinationRates("1"))
  // console.log("get all votes of review: ", await getVotesOfReview("0x26eecb00ddef76d58362552f4fd2e782ae49d1e064ccd5b06bd70dcd8039ec35"))
  // console.log("calculation Total reward: ", await calculationTotalReward("0x26eecb00ddef76d58362552f4fd2e782ae49d1e064ccd5b06bd70dcd8039ec35"))
  // console.log("Get Post ID can get Reward of an user: ", await rewardListOfTourist(account2))
  // console.log("Get reward number of an post by user: ", await touristRewardPointOnPostID(account1, '0x26eecb00ddef76d58362552f4fd2e782ae49d1e064ccd5b06bd70dcd8039ec35'))
}

test()

module.exports = {
  getBalanceOf,
  getTouristInfor,
  getTouristReviews,
  getDestinationReviews,
  getDestinationRates,
  getVotesOfReview,
  calculationTotalReward,
  rewardListOfTourist,
  touristRewardPointOnPostID
}

// export default getBalanceOf;