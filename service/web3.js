import { contract_DCToken, contract_4R } from './web3config'

export const getBalanceOf = async (user_address) => {
  try {
    return await contract_DCToken.methods.balanceOf(user_address).call()
  } catch (error) {
    console.error("Error in getBalanceOf:", error);
    throw error; // Re-throw the error if needed
  }

}

export const getTouristInfor = async (user_address) => {
  try {
    return await contract_4R.methods.touristIdentify(user_address).call()
  } catch (error) {
    console.error("Error in getTouristInfor:", error);
    throw error; // Re-throw the error if needed
  }
}

export const getTouristReviews = async (user_address) => {
  try {
    return await contract_4R.methods.getAllReviewsOfTourist(user_address).call()
  } catch (error) {
    console.error("Error in getTouristReviews:", error);
    throw error;
  }
}


export const getDestinationReviews = async (address, place_id) => {
  try {
    const destinationReviews = await contract_4R.methods.getAllReviewsOfDestinations(place_id).call()

    const result = destinationReviews.map(async (review) => {
      let isVoted = await contract_4R.methods.isVoted(address, review[1]).call()
      // console.log(isVoted)
      review.isVoted = isVoted
      return review
    })

    const final = await Promise.all(result)
    console.log((final[0]))
    return final
  } catch (error) {
    console.error("Error in getDestinationReviews:", error);
    throw error;
  }

}

export const getDestinationRates = async (place_id) => {
  try {
    return await contract_4R.methods.getDestinationRates(place_id).call()
  } catch (error) {
    console.error("Error in getDestinationRates:", error);
    throw error; // Re-throw the error if needed
  }

}

export const getVotesOfReview = async (post_id) => {
  try {
    return await contract_4R.methods.getVoteOfReview(post_id).call()
  } catch (error) {
    console.error("Error in getVotesOfReview:", error);
    throw error; // Re-throw the error if needed
  }

}

export const calculationTotalReward = async (post_id) => {
  try {
    return await contract_4R.methods.calculateTotalReward(post_id).call()
  } catch (error) {
    console.error("Error in calculationTotalReward:", error);
    throw error; // Re-throw the error if needed
  }

}

export const rewardListOfTourist = async (user_address) => {
  try {
    return await contract_4R.methods.seeRewardLists().call({ from: user_address });
  } catch (error) {
    console.error("Error in rewardListOfTourist:", error);
    throw error; // Re-throw the error if needed
  }

}

export const touristRewardPointOnPostID = async (user_address, post_id) => {
  try {
    return await contract_4R.methods.touristRewardOnPostID(user_address, post_id).call();
  } catch (error) {
    console.error("Error in touristRewardPointOnPostID:", error);
    throw error; // Re-throw the error if needed
  }
}

export const getReviewByPostID = async (postID) => {
  try {
    return await contract_4R.methods.reviewByID(postID).call();
  } catch (error) {
    console.error("Error in touristRewardPointOnPostID:", error);
    throw error; // Re-throw the error if needed
  }
}

export const getRewardListsPostID = async (userAddress) => {
  try {
    return await contract_4R.methods.seeRewardLists().call({ from: userAddress });
  } catch (error) {
    console.error("Error in touristRewardPointOnPostID:", error);
    throw error; // Re-throw the error if needed
  }
}

export const getRewardPoinFromPostID = async (postID, user_address) => {
  try {
    return await contract_4R.methods.touristRewardOnPostID(user_address, postID).call();
  } catch (error) {
    console.error("Error in touristRewardPointOnPostID:", error);
    throw error; // Re-throw the error if needed
  }
}

export const getTouristVP = async (address) => {
  try {
    const userVP =  await contract_4R.methods.touristVP(address).call()
    return Number(userVP);
  } catch (error) {
    console.error("Error in getTouristVP:", error);
    throw error;
  }
}

export const getTouristREP = async (address) => {
  try {
    const userREP =  await contract_4R.methods.touristREP(address).call()
    return Number(userREP);
  } catch (error) {
    console.error("Error in getTouristREP:", error);
    throw error;
  }
}

const test = async () => {
  const owner = "0x76E046c0811edDA17E57dB5D2C088DB0F30DcC74";
  const address1 = "0x1a620c351c07763f430897AeaA2883E37cA0aaCD"
  const address2 = "0x9E0E58F9052aDc53986eA9ca7cf8389b0EdE364f"
  const postID = "0x5a28a54a254168fde809b36b87260f51a07c299f232380cc09e5d6c271c2b77c"

  // console.log(await getBalanceOf(owner))
  // console.log("getTouristInfor function: ", await getTouristInfor(owner))
  // console.log("get all reviews of tourist: ", await getTouristReviews(owner))
  // console.log("get all review of destination: ", await getDestinationReviews("0x76E046c0811edDA17E57dB5D2C088DB0F30DcC74","65f2c7e1f60b126cb2487527"))
  // console.log("get review By Post ID: ", await getReviewByPostID(postID))
  // console.log("see postID list can get reward of account: ", await getRewardListsPostID(owner))
  // console.log("see reward of one postID of acc1: ", await getRewardPoinFromPostID(postID, owner))
  // console.log("see reward of one postID of acc2: ", await getRewardPoinFromPostID(postID, address1))
  // console.log("see reward of one postID of acc3: ", await getRewardPoinFromPostID(postID, address2))


  // console.log("get all rates of destination: ", await getDestinationRates("1"))
  // console.log("get all votes of review: ", await getVotesOfReview("0x26eecb00ddef76d58362552f4fd2e782ae49d1e064ccd5b06bd70dcd8039ec35"))
  // console.log("calculation Total reward: ", await calculationTotalReward("0x26eecb00ddef76d58362552f4fd2e782ae49d1e064ccd5b06bd70dcd8039ec35"))
  // console.log("Get Post ID can get Reward of an user: ", await rewardListOfTourist(account2))
  // console.log("Get reward number of an post by user: ", await touristRewardPointOnPostID(account1, '0x26eecb00ddef76d58362552f4fd2e782ae49d1e064ccd5b06bd70dcd8039ec35'))
  // console.log("Get tourist REP: ", await getTouristREP(owner))
  // console.log("Get tourist VP: ", await getTouristVP(owner))
}
// test()

// module.exports = {
//   getBalanceOf,
//   getTouristInfor,
//   getTouristReviews,
//   getDestinationReviews,
//   getDestinationRates,
//   getVotesOfReview,
//   calculationTotalReward,
//   rewardListOfTourist,
//   touristRewardPointOnPostID,
// }

// export default getBalanceOf;