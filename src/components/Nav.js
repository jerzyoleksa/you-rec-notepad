import React, { Component } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import ContentEditable from 'react-contenteditable'
import Cookies from 'js-cookie'
import SessionData from './SesionData'

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      notesX: [],
      key: '',
      isDark : false
    };

  }
  
  componentWillMount() {
    this.listenToMetamask();
    this.connectMetamaskSilently();
    this.getNotes(); //this sets notesX in state
    SessionData.setName("Some Guy");
    //console.log(SessionData.getName());
  }

  shortenString = (str) => {
    return str.substring(0, 4)+'...'+str.substring((str.length-4), str.length);
  }

  selectNote = (note) => {
    this.props.choseNote(note);
  }

  listenToMetamask = () => {
    if(window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      })
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      })
  }};

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
  
  updateTitle2 = function(event){
    let noteToUpdate = this.props.prop1;
    console.log("inside updateTitle:"+event.target.value);
    noteToUpdate["title"] = event.target.value;
    noteToUpdate["value"] = event.target.value;
    noteToUpdate["authKey"] = this.props.authKee;
    noteToUpdate["name"] = "title"; 
    

    axios.put('https://frengly.com/rest/v1/notes', noteToUpdate)
    .then((res) => {
    })
    .catch((err) => console.log("Error updating!!!",err) );
  }.bind(this);




  updateTitle = event => {
    let noteToUpdate = this.props.prop1;
    console.log("inside updateTitle:"+event.target.value);
    noteToUpdate["title"] = event.target.value;
    noteToUpdate["value"] = event.target.value;
    noteToUpdate["authKey"] = this.props.authKee;
    noteToUpdate["name"] = "title"; 
    

    axios.put('https://frengly.com/rest/v1/notes', noteToUpdate)
    .then((res) => {
    })
    .catch((err) => console.log("Error updating!!!",err) );
  }

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

    

    if (this.state.isDark) {
      document.body.style.backgroundColor = "#ecf0f1";
      document.body.style.color = "black";
      
    }
    else {
      document.body.style.backgroundColor = "rgb(51,51,51)";
      document.body.style.color = "white";
      
    }

   
    this.setState({isDark: !this.state.isDark})
  }

  export = async() => {
    console.log('exporting shiit...');

    
    
    /*
    axios.get('https://frengly.com/rest/v1/export?id=2', {responseType: 'blob'})
    .then((res) => {
      
    })
    .catch((err) => console.log("Error!!!",err) );
    */
    //{'authKey': this.state.key}
    axios.post('https://frengly.com/rest/v1/export', {'authKey': this.state.key})
    /*axios({
      url: 'https://frengly.com/rest/v1/export?id=2', //your url
      method: 'GET',
      responseType: 'blob', // important
    })*/
    .then((response) => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', 'package.zip'); //or any other extension
       document.body.appendChild(link);
       link.click();
    });

  }

  /*
  axios({
    url: 'http://api.dev/file-download', //your url
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
     const url = window.URL.createObjectURL(new Blob([response.data]));
     const link = document.createElement('a');
     link.href = url;
     link.setAttribute('download', 'file.pdf'); //or any other extension
     document.body.appendChild(link);
     link.click();
  });*/


  connectMetamaskSilently = async() => {
    if (window.ethereum) {
      
            try {
              const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });

              console.log('[SILENT] accounts::'+accounts1[0]);

                let web3 = new Web3(window.ethereum);    
              
                var storedSign = Cookies.get(accounts1[0]);

                if (storedSign) {
                  console.log('Signature from cookie:'+storedSign);
                  this.setState({key: storedSign});
                  this.props.updateKee(storedSign);
                }

                this.setState({address: accounts1[0]});

                //get signature from cookies and check if the signature address is the one currently connected

                this.getNotes();


              //this.props.authKee = signature;

            } catch (err) {
                    console.log('user did not add account...', err)
            }

    } else {
        console.log("No Ethereum interface injected into browser. Read-only access");
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
                Cookies.set(accounts1[0], result.signature);
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
        console.log("No Ethereum interface injected into browser. Read-only access");
    }


    




  }



  getNotes = () => {

    
    var aes256 = require('aes256');

    var key = 'my passphrase';
    var plaintext = 'my plaintext message';
    var buffer = Buffer.from(plaintext);

    var encryptedPlainText = aes256.encrypt(key, plaintext);
    var decryptedPlainText = aes256.decrypt(key, encryptedPlainText);
    console.log(encryptedPlainText);
    // plaintext === decryptedPlainText





    //use https not http! to avoid problems with redirect/cors
    axios.post('https://frengly.com/rest/v1/notesSec', {'authKey': this.state.key})
    .then((res) => {
      let list = res.data;
      this.setState({notesX: list});
      //SessionData.setNotes(list);

      //const found = list.find(element => element.status == 1);
      //last because getNotes on server side is ordered asc by viewed time, which means we chose recently opened note
      let lastNote = list[list.length-1];
      if (list.length > 0) this.selectNote(lastNote);
      //if (list.length > 0) SessionData.setNote(lastNote);
    })
    .catch((err) => console.log("Error!!!",err) );
  }


  render() {
    const { toggleNote, showNote } = this.props;
    //const listItems = this.state.notesX.map((note) => <div key={note.id} onClick={() => this.selectNote(note)} className="circleo">{note.id}</div>);
    
    return (
      <div className="nav-bar">
      <div className="nav-container">
        <div className="nav-row">
        {this.props.prop1 && this.props.prop1.title && <div className="nav-list" onClick={() => {this.menuTab('current');toggleNote()}} >
           <ContentEditable
              innerRef={this.contentEditable}
              html={this.props.prop1.title+'.txt'} // innerHTML of the editable div
              disabled={false}       // use true to disable editing
              onChange={this.updateTitle}
              tagName='article' // Use a custom HTML tag (uses a div by default)
              className={this.state.isDark ? 'btn tn-grayishb' : 'btn btn-grayish'}
            />
        </div>}  
        {/*<div className="nav-list" onClick={() => {this.menuTab('current');toggleNote()}} ><span class="material-icons-outlined md-36 nav-span">add</span></div> 
        */}
        {this.state.key.length > 0 && <div className="nav-list" onClick={() => this.menuTab('opener')} ><span className="menu-label">Noteda</span></div>}
       
        
        
        <div className="nav-list" onClick={() => this.export()}><span className="menu-label">Export</span></div> 
        <div className="nav-list" onClick={() => this.toggleLightMode()}><span className="material-icons-outlined nav-span">wb_sunny</span></div> 
                
        {/*<div className="nav-list" onClick={() => this.connectMetamask()}><span class="material-icons-outlined">account_circle</span></div> 
        */}
        {/*
        <div className="nav-list" onClick={() => this.connectMetamask()}><img src="img/mm.svg" width="24" height="24"/></div> 
        */}
        
        {<div className="nav-list" onClick={() => this.connectMetamask()}><span className={this.state.isDark ? 'btn btn-grayish' : 'btn'}>{/*<span className='circle'></span>*/}{this.state.address ? this.shortenString(this.state.address): 'Connect'}</span></div>}
        


        {this.props.saviStatus && <div className="nav-list"><span className='savingTextStyle'>{this.props.saviStatus}</span></div>}
      </div>
        {/* <div className="nav-list">{String(this.state.isDark)}</div> */}
      </div>
      </div>
    );
  }
}

export default Nav;