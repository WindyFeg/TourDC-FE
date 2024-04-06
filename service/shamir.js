var secrets = require("secrets.js-grempe")
// import secrets from 'secrets.js-grempe'

async function shares_key_shamir() {
  var randomKey = secrets.random(64) // => key is a hex string
  console.log(randomKey)
  var shares = secrets.share(randomKey, 3, 2)
  console.log(shares)
  return shares
}
  
function shamir_combine(key_share_1, key_share_2) {
  try {
    let comb = secrets.combine([key_share_1, key_share_2])
    if (comb) {
      console.log(comb)
      return {
        success: true,
        randomKey: comb
      }
    }

  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}
shares_key_shamir()
module.exports = {
  shares_key_shamir,
  shamir_combine
}