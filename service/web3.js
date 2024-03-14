// DC Token Contract
// 0x1A4091614adA249f08390E4836087A8cAC2f018A 

// TOURISM Contract
// 0xd3e7B4BF6FB03bdECbe5Db0b348285A22bF33Bf6

// admin: 0x76E046c0811edDA17E57dB5D2C088DB0F30DcC74
// import 'react-native-get-random-values';
// import Web3 from "web3";
// import DCToken_abi from "./DCToken_ABI.json"
// import Tourism_abi from "./Tourism_ABI.json"

const { Web3 } = require('web3');
const DCToken_abi = require("../contracts/ERC20With4RMechanism.json")
const Tourism_abi = require("../contracts/Tourism.json")
const DCToken_address = require("../contracts/ERC20With4RMechanism-address.json")
const Tourism_address = require("../contracts/Tourism-address.json")


const VBCProvider = "https://agd-seed-1.vbchain.vn/"
const InfuraProvider = 'https://sepolia.infura.io/v3/c6b95d3b003e40cda8dcf76f7ba58be8'

const localHost = "http://127.0.0.1:8545/"
// var web3Provider = Web3.providers.HttpProvider(InfuraProvider);
var web3 = new Web3(localHost);
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
    throw error; // Re-throw the error if needed
  }
}


const getDestinationReviews = async (place_id) => {
  try {
    return await contract_4R.methods.getAllReviewsOfDestinations(place_id).call()
  } catch (error) {
    console.error("Error in getDestinationReviews:", error);
    throw error; // Re-throw the error if needed
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
  try{
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
    return await contract_4R.methods.seeRewardLists().call({from: userAddress});
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
  console.log(await getBalanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"))
  console.log("getTouristInfor function: ",await getTouristInfor("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"))
  console.log("get all reviews of tourist: ", await getTouristReviews("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"))
  console.log("get all review of destination: ", await getDestinationReviews("65d6ec325ecf27cb3d803d87"))
  console.log("get review By Post ID: ", await getReviewByPostID("0x8a8fa558cfc4192cb2010346a807b80881e0e81cf94547ec50d93cfce17a3c78"))
  console.log("see postID list can get reward of account: ", await getRewardListsPostID("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"))
  console.log("see reward of one postID of acc1: ", await getRewardPoinFromPostID("0x8a8fa558cfc4192cb2010346a807b80881e0e81cf94547ec50d93cfce17a3c78", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"))
  console.log("see reward of one postID of acc2: ", await getRewardPoinFromPostID("0x8a8fa558cfc4192cb2010346a807b80881e0e81cf94547ec50d93cfce17a3c78", "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"))
  console.log("see reward of one postID of acc3: ", await getRewardPoinFromPostID("0x8a8fa558cfc4192cb2010346a807b80881e0e81cf94547ec50d93cfce17a3c78", "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"))
  
  
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