
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
var web3 = new Web3(VBCProvider);
contract_DCToken = new web3.eth.Contract(DCToken_abi.abi, DCToken_address.Token)
contract_4R = new web3.eth.Contract(Tourism_abi.abi, Tourism_address.Token)

module.exports = {
  web3,
  contract_DCToken,
  contract_4R
}