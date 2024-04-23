import { contract_voucher } from './web3config'
import  {toObject} from './helper'

export const getAllVoucher = async() => {
  try {
    const vouchers = toObject(await contract_voucher.methods.getAllVouchers().call())
    const result = []
    vouchers.map((voucher) => {
        let temp = {}
        temp.id = voucher.id;
        temp.amount = voucher.amount;
        temp.price = voucher.price; 
        temp.expiry = voucher.expiry;
        temp.discount = voucher.discount;
        temp.content = voucher.content;
        result.push(temp)
    })
    return result
  } catch (error) {
    console.error("Error in touristRewardPointOnPostID:", error);
    throw error; // Re-throw the error if needed
  }
}

export const getUserVouchers = async(owner) => {
  try {
    
    const vouchers =  toObject(await contract_voucher.methods.getUserVouchers().call({from: owner}))
    let amount = {}
    
    vouchers.map((voucher) => {
      if (voucher.id in amount) {
        amount[voucher.id]++;
      } else amount[voucher.id] = 1;
    })
    let unique = new Map(vouchers.map(obj => [obj.id, obj]));

    let uniqueArray = Array.from(unique.values());
    uniqueArray.map((voucher) => {
      voucher.amount = amount[voucher.id]
    })
    return uniqueArray;
  } catch (error) {
    console.error("Error in touristRewardPointOnPostID:", error);
    throw error; // Re-throw the error if needed
  }
}
