import React, { Component } from 'react';
import axios from 'axios';
import urlFor from '../helpers/urlFor';
import NoteCard from './NoteCard';


class Current extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.prop1.content
    };
    this.handleChange = this.handleChange.bind(this);
  }

 

  getNotes = () => {
    //use https not http! to avoid problems with redirect/cors
    axios.get('https://frengly.com/ai/notes')
    .then((res) => {
    
      let list = res.data;
      let lastNote = list[list.length-1];
      this.setState({value: lastNote[2]});
    
    })
    .catch((err) => console.log("Error!!!",err) );
  }

  //TODO: call parent method to update prent state of selectedNote
  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.updateNoteContent(event.target.value);
  }

  //update state of Current based on prop1 that holds selectedNote in parent
  componentWillReceiveProps(nextProps) {
    // This will erase any local state updates!
    // Do not do this.
    this.setState({ value: nextProps.prop1.content });
  }

  componentDidMount(){
    this.nameInput.focus();
  }


  render() {
  
    return (
  
      <div class="note-textarea-container">
        <div>parent selectedNote:{this.props.prop1.content}</div>
        {/* {this.state.displayNote.title} {this.state.displayNote.content}<br></br> */}
        
        <textarea value={this.state.value} onChange={this.handleChange} ref={(input) => { this.nameInput = input; }} />
      
      </div>

    );
  }
}

export default Current;