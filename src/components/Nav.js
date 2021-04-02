import React, { Component } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Web3 from 'web3';


class Nav extends Component {
  constructor() {
    super();
    this.state = {
      notesX: []
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

  connectMetamask = async() => {
    console.log('connecting metamask1');
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