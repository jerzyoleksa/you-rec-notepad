import React, { Component } from 'react';
import axios from 'axios';

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
        <div className="nav-button" onClick={() => toggleNote()} >
          { showNote ? 'Cancel' :  '+ Note' }
        </div> 
      </div>
    );
  }
}

export default Nav;