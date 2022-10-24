import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from "crypto-js";

let key = 'secret#456!23key' //(16 Byte key for 128 Bit AES)

const decryptWithAES = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return bytes.toString(CryptoJS.enc.Utf8);
}

const encryptTextWithAES = (plaintText) => {
  const encryptedData = CryptoJS.AES.encrypt(plaintText, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encryptedData.toString();    
}


const aesEncrypt = (data) => {
  const key = '6fa979f20126cb08aa645a8f495f6d85'
  const iv = 'I8zyA4lVhMCaJ5Kg'
  
  const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(iv), // parse the IV 
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
  })
  
  // e.g. B6AeMHPHkEe7/KHsZ6TW/Q==
  return cipher.toString()
}


function getDecryptedCode() {
  var key = CryptoJS.enc.Hex.parse(
    "814591256d331af80bec0fa2bef1123e37e9f181f363af374787e24160275bce"
  );
  var iv = CryptoJS.enc.Hex.parse("825b1f7c5f5edd614e8a0a0fef3c9ecf");
  var ciphertext = CryptoJS.enc.Base64.parse("07KxrSbGIoPCIYh0I16maw==");
  var encryptedCP = CryptoJS.lib.CipherParams.create({
    ciphertext: ciphertext,
    formatter: CryptoJS.format.OpenSSL
  });
  var decryptedWA = CryptoJS.AES.decrypt(encryptedCP, key, {
    iv: iv
  });
  var decryptedUtf8 = decryptedWA.toString(CryptoJS.enc.Utf8);

  return decryptedUtf8;
}

export {encryptTextWithAES, decryptWithAES}