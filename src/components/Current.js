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


    //use https not http! to avoid problems with redirect/cors
    axios.get('https://frengly.com/ai/notes')
    .then((res) => {
    
     
      
      let list = res.data;
      let lastNote = list[list.length-1];
      console.log("lastNote::"+lastNote);
      this.setState({notesX: list, displayNote: lastNote, value: lastNote[2]});
    
    })
    .catch((err) => console.log("Error!!!",err) );
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    console.log(this.state.value);
  }

  componentWillMount() {
    //this.props.prop1();
    this.getNotes(); //this sets notesX in state
  }

  componentDidMount(){
    this.nameInput.focus();
  }
  render() {
    
   

   


    return (

      <div class="note-textarea-container">
        {/* {this.state.displayNote.title} {this.state.displayNote.content}<br></br> */}
        
        <textarea value={this.props.prop1.content} onChange={this.handleChange} ref={(input) => { this.nameInput = input; }} />
   
      
      </div>

      
        
            
      
      
      

    


    );
  }
}

export default Current;