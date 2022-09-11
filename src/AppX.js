import React, { Component, useContext } from 'react';
import './App.css';
import Nav from './components/Nav';
import List from './components/List';
import Note from './components/Note';
import Current from './components/Current';
import Opener from './components/Opener';
import axios from 'axios';
import urlFor from './helpers/urlFor';
import Flash from './components/Flash';
import { AppContext, AppProvider } from "./components/AppContext";
import Child1 from './components/Child1';
import Child2 from './components/Child2';
import NavX from './components/NavX';
import CurrentX from './components/CurrentX';
import OpenerX from './components/OpenerX';
import Metamask from './components/Metamask';

class App extends Component {



  constructor() {
    super();
    this.state = {
      showNote: false,

      error: '',
      
      authKey: '',
      current: true,
      opener: false,
      savingStatus: ''
    };
  }

  // toggleNote = () => {
  //   this.setState({
  //     showNote: ! this.state.showNote,
  //     note: {}
  //   })
  // }

  //method that lets you update state from child to parent, its passed to Nav as parameter
  //updateKey = (key) => {console.log('updating key in parent!..');this.setState({ authKey: key });}
 
  //delNote = (note) => {console.log('updating note in parent!..');this.setState({ selectedNote: note });}
  //updateNoteTxt = (text) => {console.log('updating note content!..'+text); this.state.selectedNote.content = text;}
  //updateSavStatus = (text) => {console.log('updating savingStatys!..'+text); this.setState({ savingStatus: text });}
  
  updateMenu = (text) => { 
    
    if (text == 'opener') this.setState({ current: false, opener: true }); 
    if (text == 'current') this.setState({ current: true, opener: false }); 
  
  }
  // getNote = (id) => {
  //   axios.get(urlFor(`notes/${id}`))
  //   .then((res) => this.setState({note: res.data, showNote: true }) )
  //   .catch((err) => console.log(err.response.data) );
  // }

  resetError = () => {
    this.setState({ error: '' });
  }

  render() {
    const { showNote, notesX, note, newTag, error, current, opener, savingStatus } = this.state;
   
    return (
      <AppProvider>
      <div className="rootDiv">
        
        <NavX />
        {error && <Flash error={error} resetError={this.resetError} />}
        {current && <CurrentX/> }  
        {opener && <OpenerX/>}
        {/* <Child1 />
        <Child2 /> */}
        <Metamask />
      </div>
      </AppProvider>
    );
  }
}

export default App;
