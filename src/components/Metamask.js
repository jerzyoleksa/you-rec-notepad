import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import Cookies from 'js-cookie'
import { UserContext } from "./ProviderComponent";




  const Metamask = () => {
    const [context, setContext] = useContext(UserContext);
    //const [address, setAddress] = useContext(AppContext);

    const listenToMetamask = () => {
        if(window.ethereum) {
          window.ethereum.on('chainChanged', () => {
            window.location.reload();
          })
          window.ethereum.on('accountsChanged', () => {
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
    
    
    const  connectMetamaskSilently = async() => {
        if (window.ethereum) {
          
                try {
                  let accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    
                  console.log('----> connectMetamaskSilently'+accounts1[0]);
                  //setContext({"address" : accounts1[0]});
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
        console.log('connecting metamask1:'+this.props);
        // async () => {
        //   console.log('connecting metamask2');
        //   if (window.ethereum) {
        //     try {
        //       await window.ethereum.request({ method: 'eth_requestAccounts' });
              
        //       let web3 = new Web3(window.ethereum)
              
        //       const accounts =  await web3.eth.getAccounts()
            
    
        //     } catch (err) {
        //       console.log('user did not add account...', err)
        //     }
        //   }
        // }
    
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
                  
                  let promise = this.handleSignMessage(accounts1[0], message, web3);
                  
                  promise.then(function(result) {
                    console.log(result.signature); // "Promise resolved successfully"
                    //setState({key: result.signature});
                    Cookies.set(accounts1[0], result.signature);
                    //setState({address: accounts1[0]});
                    //this.props.updateKee(result.signature);
                    
                    
                    //this.getNotes();
                    //this.api.getNotes(this.state.key);
    
    
                  }.bind(this), err => {
                    console.log(err); // Error: "Promise rejected"
                 });
    
                  //this.props.authKee = signature;
    
                } catch (err) {
                        console.log('user did not add account...', err)
                }
    
        } else {
            console.log("No Ethereum interface injected into browser. Read-only access");
        }
    
      }

      useEffect(() => {
        //console.log("[METAMASK] useEffect 1"+JSON.stringify(userData));
        const fetchData = async () => {
            
            // let promise = await connectMetamaskSilently({});
            
            // promise.then(function(accounts1) {
                
            //     setState({address: accounts1[0], key: Cookies.get(accounts1[0]) });

            //   }.bind(this), err => {
            //     console.log(err); // Error: "Promise rejected"
            //  });
            let accounts1 = await connectMetamaskSilently({});
            //console.log('1.'+accounts1[0])
            //console.log('2.'+Cookies.get(accounts1[0]));
           
            let sigKey = Cookies.get(accounts1[0]);
            //console.log('3.'+sigKey);
            //console.log("[METAMASK] useEffect 2"+JSON.stringify(userData));
            console.log("??? "+context.name);
            //context.updateAddress(accounts1[0]);
            setContext({"address" : accounts1[0]})
            //console.log("[METAMASK] useEffect 3"+JSON.stringify(userData));

            
           
            //setData(response.data);
          };
      
          fetchData();

      }, []);

      return null
  }
export default Metamask