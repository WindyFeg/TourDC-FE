import {web3} from './web3config'

async function createAccount() {
  const new_account =  web3.eth.accounts.create()
  console.log(new_account)
  return {
    walletAddress: new_account.address, 
    privateKey: new_account.privateKey
  }
}

// createAccount()
module.exports = createAccount