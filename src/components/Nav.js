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
    this.getNotes(); //this sets notesX in state
  }

  selectNote = (note) => {
    this.props.choseNote(note);
  }

  handleSignMessage = ( publicAddress, nonce, web3 ) => {
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

  useSignature = (obj, obj2) => {
    console.log(obj);
  }

  menuTab = async(option) => {
    console.log('menuTab:'+option);
    this.props.updateMeniu(option);
  }

  toggleLightMode = () => {
    console.log('changing lights');
    //document.body.classList.add('light-mode-dark');
    //document.querySelector('.nav-container').classList.add('light-mode-dark');
    //document.querySelector('.App').classList.add('light-mode-dark');

    if (document.body.style.color == 'white') {
      document.body.style.backgroundColor = "#ecf0f1";
      document.body.style.color = "black";
    }
    else {
      document.body.style.backgroundColor = "rgb(51,51,51)";
      document.body.style.color = "white";
    }
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
                this.setState({key: result.signature});
                this.setState({address: accounts1[0]});
                this.props.updateKee(result.signature);
                
                
                this.getNotes();

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
    axios.post('https://frengly.com/ai/notesSec', {'authKey': this.state.key})
    .then((res) => {
      let list = res.data;
      let lastNote = list[list.length-1];
      console.log("lastNote::"+lastNote);
      this.setState({notesX: list});

      //jerzy 1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! REFACTOR !!!!!!!!!!!!!!!!!!!!!!!!!!
      if (list.length > 0) this.selectNote(list[2]);
    
    })
    .catch((err) => console.log("Error!!!",err) );
  }


  render() {
    const { toggleNote, showNote } = this.props;
    //const listItems = this.state.notesX.map((note) => <div key={note.id} onClick={() => this.selectNote(note)} className="circleo">{note.id}</div>);
    
    return (
      <div className="nav-container">
        <div className="nav-list" onClick={() => {this.menuTab('current');toggleNote()}} ><span class="material-icons-outlined">create</span></div> 
        {this.state.key.length > 0 && <div className="nav-list" onClick={() => this.menuTab('opener')} ><span class="material-icons-outlined">folder</span></div>}
       
        
        
        <div className="nav-list" onClick={() => this.toggleLightMode()}><span class="material-icons-outlined">wb_sunny</span></div> 
        <div className="nav-list" onClick={() => this.connectMetamask()}><span class="material-icons-outlined">account_circle</span></div> 
        
        {this.state.address && <div className="nav-list"><span className="btn btn-primary">{this.state.address}</span></div>}
        
        {/*<div className="nav-list">{listItems}</div>*/}
      </div>
    );
  }
}

export default Nav;