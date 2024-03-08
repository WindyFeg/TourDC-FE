// DC Token Contract
// 0x1A4091614adA249f08390E4836087A8cAC2f018A 

// TOURISM Contract
// 0xd3e7B4BF6FB03bdECbe5Db0b348285A22bF33Bf6

// admin: 0x76E046c0811edDA17E57dB5D2C088DB0F30DcC74

import Web3 from "web3";
import DCToken_abi from "./DCToken_ABI.json"
import Tourism_abi from "./Tourism_ABI.json"

// const { Web3 } = require('web3');
// const DCToken_abi = require("./DCToken_ABI.json")
// const Tourism_abi = require("./Tourism_ABI.json")

const VBCProvider = "https://agd-seed-1.vbchain.vn/"
const InfuraProvider = 'https://sepolia.infura.io/v3/c6b95d3b003e40cda8dcf76f7ba58be8'

// var web3Provider = Web3.providers.HttpProvider(InfuraProvider);
var web3 = new Web3(InfuraProvider);

contract_DCToken = new web3.eth.Contract(DCToken_abi, '0x1A4091614adA249f08390E4836087A8cAC2f018A')

contract_4R = new web3.eth.Contract(Tourism_abi, '0xd3e7B4BF6FB03bdECbe5Db0b348285A22bF33Bf6')

const getBalanceOf = async (user_address) => {
  return await contract_DCToken.methods.balanceOf(user_address).call()
}

const getTouristInfor = async (user_address) => {
  return await contract_4R.methods.touristIdentify(user_address).call()
}

const getTouristReviews = async (user_address) => {
  return await contract_4R.methods.getAllReviewsOfTourist(user_address).call()
}


const getDestinationReviews = async (place_id) => {
  return await contract_4R.methods.getAllReviewsOfDestinations(place_id).call()
}

const getDestinationRates = async (place_id) => {
  return await contract_4R.methods.getDestinationRates(place_id).call()
}

const getVotesOfReview = async (post_id) => {
  return await contract_4R.methods.getVoteOfReview(post_id).call()
}

const calculationTotalReward = async (post_id) => {
  return await contract_4R.methods.calculateTotalReward(post_id).call()
}

const rewardListOfTourist = async (user_address) => {
  return await contract_4R.methods.seeRewardLists().call({ from: user_address });
}

const touristRewardPointOnPostID = async (user_address, post_id) => {
  return await contract_4R.methods.touristRewardOnPostID(user_address, post_id).call()
}

const account1 = '0x1a620c351c07763f430897AeaA2883E37cA0aaCD'
const account2 = '0x2936E9fACfF3fb5DDc08d13DB19659ec093cdE69'
const account3 = '0x9E0E58F9052aDc53986eA9ca7cf8389b0EdE364f'


// accoutn tourist 1: 0x1a620c351c07763f430897AeaA2883E37cA0aaCD
// post ID: 0x26eecb00ddef76d58362552f4fd2e782ae49d1e064ccd5b06bd70dcd8039ec35

// account tourist 2: 0x2936E9fACfF3fb5DDc08d13DB19659ec093cdE69
// account Tourist 3: 0x9E0E58F9052aDc53986eA9ca7cf8389b0EdE364f
const test = async () => {
  // console.log(await getBalanceOf("0x76E046c0811edDA17E57dB5D2C088DB0F30DcC74"))
  // console.log("getTouristInfor function: ",await getTouristInfor(account1))
  // console.log("get all reviews of tourist: ", await getTouristReviews("0x1a620c351c07763f430897AeaA2883E37cA0aaCD"))
  // console.log("get all review of destination: ", await getDestinationReviews("1"))
  // console.log("get all rates of destination: ", await getDestinationRates("1"))
  // console.log("get all votes of review: ", await getVotesOfReview("0x26eecb00ddef76d58362552f4fd2e782ae49d1e064ccd5b06bd70dcd8039ec35"))
  // console.log("calculation Total reward: ", await calculationTotalReward("0x26eecb00ddef76d58362552f4fd2e782ae49d1e064ccd5b06bd70dcd8039ec35"))
  // console.log("Get Post ID can get Reward of an user: ", await rewardListOfTourist(account2))
  console.log("Get reward number of an post by user: ", await touristRewardPointOnPostID(account1, '0x26eecb00ddef76d58362552f4fd2e782ae49d1e064ccd5b06bd70dcd8039ec35'))
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