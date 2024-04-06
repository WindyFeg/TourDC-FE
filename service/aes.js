// const aesjs = require('aes-js');
import aesjs from 'aes-js'

function encryptedPrivateKey(randomKey, privateKey) {
  const key = Buffer.from(randomKey)
  console.log(key)
  const privateKeyBytes = aesjs.utils.hex.toBytes(privateKey)
  console.log(privateKeyBytes)
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var encryptedBytes = aesCtr.encrypt(privateKeyBytes);
  console.log(encryptedBytes)
  var bytestoHex = aesjs.utils.hex.fromBytes(encryptedBytes)
  console.log(bytestoHex)
}

function decryptedPrivateKey(randomKey, encryptKey) {
  try {
    const key = Buffer.from(randomKey)
    const encryptKeyBytes = aesjs.utils.hex.toBytes(encryptKey)
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptKeyBytes);
    var decryptedText = aesjs.utils.hex.fromBytes(decryptedBytes);
    decryptedText
    return {
      success: true,
      privateKey: decryptedText
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

encryptedPrivateKey('2dc232208048ff7f','e11f5c9977c82fe752f84caeb9ba0c50feabd0ce90088cb26e61ee0fce5950c2')

decryptedPrivateKey('2dc232208048ff7f', '29b05dee4c7d1818c44a99dd1e098f8bb01caceff6b53c29602288a3e9bd6191')

module.exports = {
  encryptedPrivateKey,
  decryptedPrivateKey
}