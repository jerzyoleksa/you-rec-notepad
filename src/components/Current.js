import React, { Component } from 'react';
import axios from 'axios';
import urlFor from '../helpers/urlFor';
import NoteCard from './NoteCard';
import ContentEditable from 'react-contenteditable'


class Current extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      value: this.props.prop1.content,
      typing: false,
      typingTimeout: 0,
      html: "<b>Hello <i>World</i></b>"
    };
    this.handleChange = this.handleChange.bind(this);
    
    //for content editable
    this.contentEditable = React.createRef();
    
  }


  updateNote = () => {
    
    this.props.updateSaviStatus("saving ..."); //in async methods must be setState, not just this.state.status = ...
    let noteToUpdate = this.props.prop1;
    console.log('updating:'+noteToUpdate);
    console.log('key from parent:'+this.props.authKee);
    
    noteToUpdate["authKey"] = this.props.authKee;

    noteToUpdate["name"] = "content"; 
    noteToUpdate["value"] = noteToUpdate["content"];

    axios.put('https://frengly.com/ai/notes', noteToUpdate)
    .then((res) => {
      this.props.updateSaviStatus("");
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

  handleChange2 = evt => {
    console.log('handleChange2');
    this.setState({html: evt.target.value});
  };

  handleLineFocus = evt => {
    console.log('focus');
  };

  //update state of Current based on prop1 that holds selectedNote in parent
  componentWillReceiveProps(nextProps) {
    // This will erase any local state updates!
    // Do not do this.
    try {
    this.setState({ value: nextProps.prop1.content });
    }catch(ex){console.log(ex);}
  }

  componentDidMount(){
    this.nameInput.focus();
  }


  render() {
  
  

    return (
  
      <div className="textarea-container">

      {/*<ContentEditable
              innerRef={this.contentEditable}
              html={this.state.html} // innerHTML of the editable div
              disabled={false}       // use true to disable editing
              onChange={this.handleChange2} // handle innerHTML change
              onMouseDown={e => this.handleLineFocus(e)}
              onKeyUp={e => this.handleLineFocus(e)}
              tagName='article' // Use a custom HTML tag (uses a div by default)
              className='contentEditablo'
            />*/}

        {/*<span>{this.state.status}</span>*/}
        <textarea className="ta1" value={this.state.value} onChange={this.handleChange} ref={(input) => { this.nameInput = input; }} />
        

        
      </div>

    );
  }
}

export default Current;