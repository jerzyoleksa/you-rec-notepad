import CryptoJS from "crypto-js";

let key = 'secret#456!23key' //(16 Byte key for 128 Bit AES)

const decryptWithAES = (ciphertext, thekey) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(thekey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return bytes.toString(CryptoJS.enc.Utf8);
}

const encryptTextWithAES = (plaintText, thekey) => {
  const encryptedData = CryptoJS.AES.encrypt(plaintText, CryptoJS.enc.Utf8.parse(thekey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encryptedData.toString();    
}

export {encryptTextWithAES, decryptWithAES}