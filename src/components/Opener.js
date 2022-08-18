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
      merge1: -1,
      merge2: -1,
      value: this.props.prop1? this.props.prop1.content : '',
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

  isSelected4Merge = (note) => {
    if (this.state.merge1 == note.id || this.state.merge2 == note.id) return true;
    return false;
  } 

  deleteNote = (note) => {
    //const newNotesState = this.state.notes.filter((note) => note.id !== id );
    axios.delete('https://frengly.com/ai/notes/'+note.id)
    .then((res) => this.getNotes() )
    .catch((err) => console.log(err.response) );
  }

  selectMerge = (note) => {
    //const newNotesState = this.state.notes.filter((note) => note.id !== id );
    console.log(this.state.merge1);
    console.log(note.id);
    if (this.state.merge1 == -1) {
      this.setState({ merge1: note.id });

    } else {
      this.setState({ merge2: note.id });
    }
  }

  cancelMerge = () => {
      this.setState({ merge1: -1 });
      this.setState({ merge2: -1 });
  }

  doMerge = () => {
    let data = {"id1" : this.state.merge1, "id2": this.state.merge2};
    axios.post(urlFor('notesMerge'), data)
    .then((res) => {this.getNotes();this.state.merge1=-1;this.state.merge2=-1;} )
    .catch((err) => console.log(err.response) );
  }

  createNew = () => {
    //const newNotesState = this.state.notes.filter((note) => note.id !== id );
    let noteToCreate = {"userId" : 1, "content": ""};

    axios.post(urlFor('notes'), noteToCreate)
    .then((res) => this.getNotes() )
    .catch((err) => console.log(err.response) );
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
  
    const listItems = this.state.notesX.map((note) => 
                      <div className="nav-container" key={note.id+'parent'}>
                          <div className="nav-list-narrow"  onClick={() => this.deleteNote(note)}><span className="material-icons-outlined nav-span">delete</span></div> 
                          <div className="nav-list-narrow" onClick={() => this.selectMerge(note)}><span className={this.isSelected4Merge(note) ? 'material-icons-outlined nav-span-blue' : 'material-icons-outlined nav-span'}>link</span></div> 
                          
                          <div className="nav-list opener-tbl"  onClick={() => this.selectNote(note)}>{note.title}.txt</div>
                      </div>
                      );
    

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
     
        
        <div className="nav-container">
          
  
          
          <div className="nav-list opener-tbl" onClick={() => this.createNew()}><span className="btn btn-framed">Create new note</span></div>

          {this.state.merge1>-1 && this.state.merge2>-1 && <div className="nav-list opener-tbl" onClick={() => this.startMerge()}><span className="btn btn-framed">Merge</span></div> }
          {this.state.merge1>-1 && this.state.merge2>-1 && <div className="nav-list opener-tbl" onClick={() => this.cancelMerge()}><span className="btn btn-framed">Cancel merge</span></div> }
  
        </div>
        <div>{listItems}</div>
        <div>merge1::{this.state.merge1}</div>
        <div>merge2::{this.state.merge2}</div>
      </div>

    );
  }
}

export default Opener;