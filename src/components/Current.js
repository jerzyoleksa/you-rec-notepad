import React, { Component } from 'react';
import axios from 'axios';
import urlFor from '../helpers/urlFor';
import NoteCard from './NoteCard';


class Current extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      value: this.props.prop1.content,
      typing: false,
      typingTimeout: 0
    };
    this.handleChange = this.handleChange.bind(this);
    
  }


  updateNote = () => {
    
    this.setState({ status: "saving ..." }); //in async methods must be setState, not just this.state.status = ...
    let noteToUpdate = this.props.prop1;
    console.log('updating:'+noteToUpdate);
    console.log('key from parent:'+this.props.authKee);
    
    noteToUpdate["authKey"] = this.props.authKee;
    axios.put('https://frengly.com/ai/notes', noteToUpdate)
    .then((res) => {
      this.setState({ status: "" });
    })
    .catch((err) => console.log("Error updating!!!",err) );
  }

  //TODO: call parent method to update prent state of selectedNote
  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.updateNoteContent(event.target.value);

    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    
    this.state.typing = false;
    this.state.typingTimeout = setTimeout(() => {
      this.updateNote();  
    }, 1500);


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
  
      <div className="note-textarea-container">
        <span>{this.state.status}</span>
        <textarea value={this.state.value} onChange={this.handleChange} ref={(input) => { this.nameInput = input; }} />
      
      </div>

    );
  }
}

export default Current;