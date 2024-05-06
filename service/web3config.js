
import Web3 from "web3";
import DCToken_abi from "../contracts/ERC20With4RMechanism.json"
import DCToken_address from "../contracts/ERC20With4RMechanism-address.json"
import Tourism_abi from "../contracts/Tourism.json"
import Tourism_address from "../contracts/Tourism-address.json"
import Voucher_address from "../contracts/Voucher-address.json"
import Voucher_abi from "../contracts/Voucher.json"
// const { Web3 } = require('web3');
// const DCToken_abi = require("../contracts/ERC20With4RMechanism.json")
// const Tourism_abi = require("../contracts/Tourism.json")
// const DCToken_address = require("../contracts/ERC20With4RMechanism-address.json")
// const Tourism_address = require("../contracts/Tourism-address.json")

const VBCProvider = "https://vibi.vbchain.vn/"
const infuraProvider = "https://sepolia.infura.io/v3/c6b95d3b003e40cda8dcf76f7ba58be8"

var web3 = new Web3(infuraProvider);
contract_DCToken = new web3.eth.Contract(DCToken_abi.abi, DCToken_address.Token)
contract_4R = new web3.eth.Contract(Tourism_abi.abi, Tourism_address.Token)
contract_voucher = new web3.eth.Contract(Voucher_abi.abi, Voucher_address.Token)
module.exports = {
  web3,
  contract_DCToken,
  contract_4R,
  contract_voucher
}