import { web3 } from './web3config'

export async function createAccount() {
  const new_account = web3.eth.accounts.create()
  console.log(new_account)
  return {
    walletAddress: new_account.address,
    privateKey: new_account.privateKey
  }
}

export async function HelloWorld() {
  console.log('Hello World')
}

export default createAccount

// createAccount()
// module.exports = createAccount