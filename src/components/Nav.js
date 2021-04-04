import React, { Component } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Web3 from 'web3';


class Nav extends Component {
  constructor() {
    super();
    this.state = {
      notesX: [],
      key: ''
    };

  }
  
  componentWillMount() {
    //let noteFromProps = this.props.chosenNote;
    //this.selectNote(noteFromProps);
    this.getNotes(); //this sets notesX in state
  }

  selectNote = (note) => {
    this.props.choseNote(note);
  }

  handleSignMessage = ( publicAddress, nonce, web3 ) => {
    return new Promise((resolve, reject) =>
      web3.personal.sign(
        web3.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
        publicAddress,
        (err, signature) => {
          if (err) return reject(err);
          return resolve({ publicAddress, signature });
        }
      )
    );
  };

  useSignature = (obj, obj2) => {
    console.log(obj);
  }

  connectMetamask = async() => {
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

              console.log(accounts1);

              let web3 = new Web3(window.ethereum);    
              
              var message = "Some string 2"
              var hash = web3.sha3(message)
              var account = web3.eth.accounts[0]
              
              web3.personal.sign(hash, account, function(error, signature) {
                  console.log('signature:'+signature);
                  //this.props.authKee = signature;
             
              });
              
              let promise = this.handleSignMessage(account, '123123', web3);
              
              promise.then(function(result) {
                console.log(result.signature); // "Promise resolved successfully"
                this.setState({key: result.signature});
                this.props.updateKee(result.signature);
              }.bind(this), err => {
                console.log(err); // Error: "Promise rejected"
             });

              //this.props.authKee = signature;

            } catch (err) {
                    console.log('user did not add account...', err)
            }

    } else {
        alert("No Ethereum interface injected into browser. Read-only access");
    }







  }

  getNotes = () => {


    //use https not http! to avoid problems with redirect/cors
    axios.get('https://frengly.com/ai/notes')
    .then((res) => {
      let list = res.data;
      let lastNote = list[list.length-1];
      console.log("lastNote::"+lastNote);
      this.setState({notesX: list});
    
    })
    .catch((err) => console.log("Error!!!",err) );
  }


  render() {
    const { toggleNote, showNote } = this.props;
    const listItems = this.state.notesX.map((note) => <div key={note.id} onClick={() => this.selectNote(note)} className="nav-button">{note.id}</div>);
    
    return (
      <div className="nav-container">
        <div className="nav-logo">Notes</div>
        <div className="nav-list">{listItems}</div>
        <div className="nav-button" onClick={() => this.connectMetamask()} >
          Metamask
        </div> 
        <div className="nav-button" onClick={() => toggleNote()} >
          { showNote ? 'Cancel' :  '+ Note' }
        </div> 
      </div>
    );
  }
}

export default Nav;