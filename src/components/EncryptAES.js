import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from "crypto-js";


let key = 'FE7A45426AFF5D14E52897E134F5CC33'

const encodePass = (password) =>{
  const encodedWord = CryptoJS.enc.Utf8.parse(password); // encodedWord Array object
  const encoded = CryptoJS.enc.Base64.stringify(encodedWord); // string: 'NzUzMjI1NDE='
  return encoded;
};

const decryptWithAES = (ciphertext, myPass) => {
  //const passphrase = '123';
  var encryptedBase64Key = encodePass(myPass);
  var parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);

  const bytes = CryptoJS.AES.decrypt(ciphertext, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });

  
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}

const encryptTextWithAES = (plaintText, myPass) => {
    //var myPass="0123456789123456" //must have 16 chars
    var encryptedBase64Key = encodePass(myPass);
    console.log('encryptedBase64Key::'+encryptedBase64Key);
    var parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);
    console.log('parsedBase64Key::'+parsedBase64Key);
    var encryptedData = null;
    

    // this is Base64-encoded encrypted data
    encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });

    return encryptedData.toString();
    
}

export {encryptTextWithAES, encodePass, decryptWithAES}