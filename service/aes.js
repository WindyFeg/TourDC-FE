const aesjs = require('aes-js');
// import aesjs from 'aes-js'

//! randomKey: 16 bytes, privateKey: 32 bytes (remove 0x in function)
function encryptedPrivateKey(randomKey, privateKey) {
  try {
    const key = Buffer.from(randomKey)
    const remove0x = privateKey.substring(2)
    const privateKeyBytes = aesjs.utils.hex.toBytes(remove0x)
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));

    var encryptedBytes = aesCtr.encrypt(privateKeyBytes);
    var bytestoHex = aesjs.utils.hex.fromBytes(encryptedBytes)
    console.log(bytestoHex)

    return {
      success: true,
      encryptedKey: bytestoHex
    }
  } catch (error) {
    console.error("Failed to encrypt:", error);
    return {
      success: false,
      error: error.message
    }
  }
}

//! randomKey: 16 bytes, encryptKey: 64 bytes (added 0x in function)
function decryptedPrivateKey(randomKey, encryptKey) {
  try {
    const key = Buffer.from(randomKey)
    const encryptKeyBytes = aesjs.utils.hex.toBytes(encryptKey)
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptKeyBytes);
    var decryptedText = aesjs.utils.hex.fromBytes(decryptedBytes);
    return {
      success: true,
      privateKey: `0x${decryptedText}`
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

console.log('encrypted key', encryptedPrivateKey('2dc232208048ff7f', '0xe11f5c9977c82fe752f84caeb9ba0c50feabd0ce90088cb26e61ee0fce5950c2'))

console.log('decrypted key: ', decryptedPrivateKey('2dc232208048ff7f', '29b05dee4c7d1818c44a99dd1e098f8bb01caceff6b53c29602288a3e9bd6191'))

// encryptedPrivateKey('EwkogWKcmHsLM0NC', '0x90e70167513506a0277548eaaa729b1ee283412996ae6be456b55637c5c6ac2e'),


  module.exports = {
    encryptedPrivateKey,
    decryptedPrivateKey
  }