import React, { Component } from 'react';
import axios from 'axios';
import urlFor from '../helpers/urlFor';
import NoteCard from './NoteCard';
import ContentEditable from 'react-contenteditable'


class Opener extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      notesX: [],
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

  componentWillMount() {
    console.log('OPENER - component will mount !!!! ');
    //let noteFromProps = this.props.chosenNote;
    //this.selectNote(noteFromProps);
    this.getNotes(); //this sets notesX in state
  }

  getNotes = () => {
    //use https not http! to avoid problems with redirect/cors
    axios.post('https://frengly.com/ai/notesSec', {'authKey': this.props.authKee})
    .then((res) => {
      let list = res.data;
      let lastNote = list[list.length-1];
      console.log("lastNote::"+lastNote);
      this.setState({notesX: list});
    
    })
    .catch((err) => console.log("Error!!!",err) );
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

  selectNote = (note) => {
    this.props.choseNote(note);
    this.props.updateMeniu('current');
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
    this.setState({ value: nextProps.prop1.content });
  }

  componentDidMount(){
 
  }


  render() {
  
    const listItems = this.state.notesX.map((note) => <div key={note.id} onClick={() => this.selectNote(note)}>\__ {note.id}.txt</div>);
    

    return (
     
      <div className="note-textarea-container">

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
     
        <div className="nav-list">{listItems}</div>
        

        
      </div>

    );
  }
}

export default Opener;