import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import Cookies from 'js-cookie'
import { UserContext } from "./ProviderComponent";
import { registerEthAddress } from "./ApiAxios";



    const listenToMetamask = async() => {
      
        if(window.ethereum) {
          window.ethereum.on('chainChanged', () => {
            console.log("[WEB3] chainChanged ....");
            window.location.reload();
          })
          window.ethereum.on('accountsChanged', () => {
            console.log("[WEB3] accountsChanged ....");
            window.location.reload();
          })
      }};
    
    const handleSignMessage = ( publicAddress, nonce, web3 ) => {
        return new Promise((resolve, reject) =>
          web3.eth.personal.sign(
            web3.utils.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
            publicAddress,
            (err, signature) => {
              if (err) return reject(err);
              return resolve({ publicAddress, signature });
            }
          )
        );
      };
    const checkConnection = () => {
      ethereum.request({ method: 'eth_accounts' }).then(handleAccountsChanged).catch(console.error);
    }
    
    const  handleAccountsChanged = (accounts) => {
      console.log(accounts);
    }
    const  connectMetamaskSilently = async() => {
        if (window.ethereum) {
          
                try {
                   //let accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' }); //OPENS POPUP
                   let accounts1 = await window.ethereum.request({ method: 'eth_accounts' });

                   if (!accounts1) return;  
                  // console.log('----> connectMetamaskSilently'+accounts1[0]);
                   return accounts1;
                  
    
                    //get signature from cookies and check if the signature address is the one currently connected
    
                    //this.getNotes();
                  //this.props.authKee = signature;
    
                } catch (err) {
                        console.log('user did not add account...', err)
                }
    
        } else {
            console.log("No Ethereum interface injected into browser. Read-only access");
        }
      }
    
    
      const connectMetamask = async() => {
        
        // Check if Web3 has been injected by the browser (Mist/MetaMask)
        if (window.ethereum) {
          
                try {
                  const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
                  console.log('accounts::'+accounts1[0]);
    
                  let web3 = new Web3(window.ethereum);    
                  
                  var message = "Some string 2"
                  //var hash = web3.utils.sha3(message)
                  // web3.personal.sign(hash, account, function(error, signature) {
                  //     console.log('signature:'+signature);
                  // });
                  
                  let promise = handleSignMessage(accounts1[0], message, web3);
                  return promise;
                  //promise.then(function(result) {
                    
                    //return result;
                    // const fetch2 = async () => {
                    //   console.log(accounts1[0], result.signature);
                    //   let result2 = await registerEthAddress(accounts1[0], result.signature);
                      
                    //   console.log(result2);
                    // };
                    // fetch2()
                    // Cookies.set(accounts1[0], result.signature);
    
                  //}.bind(this), err => {
                   // console.log(err); // Error: "Promise rejected"
                 //});
    
                  //this.props.authKee = signature;
    
                } catch (err) {
                        console.log('user did not add account...', err)
                }
    
        } else {
            console.log("No Ethereum interface injected into browser. Read-only access");
        }
    
      }
    
  
  
export {listenToMetamask, connectMetamask, connectMetamaskSilently}