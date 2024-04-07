import sss from 'shamirs-secret-sharing'

function bufferToHex(buffer) {
  return buffer.toString('hex');
}

function hexToBuffer(hexString) {
  return Buffer.from(hexString, 'hex').toString('utf8');
}

function generateRandomBase64Secret(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

async function shares_key_shamir() {
  const randomKey = generateRandomBase64Secret(16)
  console.log("Random Key: " + randomKey)
  const shares = sss.split(randomKey, { shares: 3, threshold: 2 })
  return shares
}

function shamir_combine(key_share_1, key_share_2) {
  try {
    let comb = sss.combine([
      key_share_1,
      key_share_2
    ])
    if (comb) {
      console.log(Buffer.from(comb, 'hex').toString('utf8'))
      return {
        success: true,
        key: Buffer.from(comb, 'hex').toString('utf8')
      }
    }

  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }

}

module.exports = {
  shares_key_shamir,
  shamir_combine
}