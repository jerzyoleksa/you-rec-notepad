import React, { Component } from 'react';
import axios from 'axios';
import urlFor from '../helpers/urlFor';
import NoteCard from './NoteCard';


class Current extends Component {
  
  constructor() {
    super();
    this.state = {
      notesX: [],
      displayNote: {},
      value: 'Please write an essay about your favorite DOM element.'
    };

 

    this.handleChange = this.handleChange.bind(this);


  }


  getNotes = () => {
    axios.get(urlFor('notes'))
    .then((res) => {
    
      
      
      let list = res.data;
      let lastNote = list[list.length-1];
      console.log("lastNote::"+lastNote);
      this.setState({notesX: list, displayNote: lastNote, value: lastNote.content});
    
    })
    .catch((err) => console.log(err.response.data) );
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    console.log(this.state.value);
  }

  componentWillMount() {
    this.props.prop1();
    this.getNotes(); //this sets notesX in state
  }

  render() {
    
   

   


    return (

      <div class="note-textarea-container">
        {this.state.displayNote.title} {this.state.displayNote.content}<br></br>
        
        <textarea value={this.state.value} onChange={this.handleChange} />
   
      
      </div>

      
        
            
      
      
      

    


    );
  }
}

export default Current;