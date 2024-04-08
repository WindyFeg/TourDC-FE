const { Web3 } = require('web3');
const axios = require('axios')
const BASE_URL = 'http://192.168.99.243:5500'
const Tx = require('ethereumjs-tx').Transaction;
const  { Address, bytesToHex, hexToBytes } = require ('@ethereumjs/util')
const contractAddress = require('../contracts/Tourism-address.json')
const contractABI = require('../contracts/Tourism.json')
const AES = require('./aes')
var Common = require('ethereumjs-common').default

const VBCProvider = "https://vibi.vbchain.vn/"
var web3 = new Web3(VBCProvider);
const contract = new web3.eth.Contract(contractABI.abi, contractAddress.Token);

// randomKey in Sesssion + private_key_encrypt => decrypted to get privateKey
const customCommon = Common.forCustomChain(
  'mainnet',
  {
      name: 'vibichain',
      networkId: 306,
      chainId: 306,
  },
  'istanbul'
);

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
    // const common = Common.custom({ chainId: 0x132 , hardfork: Hardfork.Paris})
    
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


async function autoRegister(randomKey, enc_private_key, firstName, lastName, phoneNumber) {
  let privateKey = AES.decryptedPrivateKey(randomKey, enc_private_key).privateKey

  // get account address 
  const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey).address
  console.log('account: ', account)

  let nonce = await web3.eth.getTransactionCount(account,'latest');
  // send to account Vibi
  // account using for sending VBC to new people
  // privateKey: e11f5c9977c82fe752f84caeb9ba0c50feabd0ce90088cb26e61ee0fce5950c2
  const sponsorPrivateKey = Buffer.from('e11f5c9977c82fe752f84caeb9ba0c50feabd0ce90088cb26e61ee0fce5950c2', 'hex')
  const sponserAccount = web3.eth.accounts.privateKeyToAccount('0x' + 'e11f5c9977c82fe752f84caeb9ba0c50feabd0ce90088cb26e61ee0fce5950c2').address
  console.log('sponsorPrivateKey: ', sponsorPrivateKey)
  console.log('sponserAccount: ', sponserAccount)
  const sponserNonce = await web3.eth.getTransactionCount(sponserAccount,'latest')
  console.log('sponserNonce: ', sponserNonce)
  //31500000000000
  const txObject = {
    nonce: web3.utils.toHex(sponserNonce),
    from: sponserAccount,
    gasLimit: web3.utils.toHex(3000000), // Raise the gas limit to a much higher amount
    to: account,
    value: 0xDE0B6B3A7640000,
    // data: 0x0,
    gasPrice: web3.utils.toHex(100000),
    chainId: 0x132
  }

  console.log(txObject)
  const tx = new Tx(txObject,{ common: customCommon })
  tx.sign(sponsorPrivateKey)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')	
  const txHash = web3.utils.sha3(serializedTx);

  console.log("sending txHash", txHash)
  web3.eth.sendSignedTransaction( raw )
  .on('receipt', console.log);

  const privateKeyBytes = Buffer.from(privateKey, 'hex')
  



}



// 5ab1aeb4c79730ff9d8e31a42244892799df085e412bee158efadfcb9b69279b
// AES.encryptedPrivateKey('815f70f49c9ef19a', '5ab1aeb4c79730ff9d8e31a42244892799df085e412bee158efadfcb9b69279b')
// 6394220569eee5be8551852cd282e02d8eda53778365a55c05b4352660191c27
autoRegister('815f70f49c9ef19a', '6394220569eee5be8551852cd282e02d8eda53778365a55c05b4352660191c27', 'David', 'John', '0918812313')

