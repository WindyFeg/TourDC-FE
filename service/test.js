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

const getCommentsOfReviewPost = async (postID) => {
  try {
    const comments = await contract_4R.methods.getAllCommentOfReviewPost(postID).call()
    const promises = comments.map(async (ele) => {
      ele.userInfor = (await axios.post(`${GLOBAL.BASE_URL}/api/user/getCurrent`, {address: ele.author })).data.user
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

const test = async () => {
  const owner = "0x76E046c0811edDA17E57dB5D2C088DB0F30DcC74";
  const address1 = "0x1a620c351c07763f430897AeaA2883E37cA0aaCD"
  const address2 = "0x9E0E58F9052aDc53986eA9ca7cf8389b0EdE364f"
  const postID = "0x93ff9780601a717502fe88a3f2de9dfc95c179af1d02e48d382a19d60afdfde8"
   console.log("getCommentsOfReviewPost", await getCommentsOfReviewPost(postID))
}

test()