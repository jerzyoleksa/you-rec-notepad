import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import List from './components/List';
import Note from './components/Note';
import Current from './components/Current';
import Opener from './components/Opener';
import axios from 'axios';
import urlFor from './helpers/urlFor';
import Flash from './components/Flash';



class App extends Component {
  constructor() {
    super();
    this.state = {
      showNote: false,
      notesX: [],
      note: {},
      newTag: false,
      error: '',
      selectedNote : {"content" : "Hello from Mars", "id" : -1},
      authKey: '',
      current: true,
      opener: false
    };
  }

  toggleNote = () => {
    this.setState({
      showNote: ! this.state.showNote,
      note: {}
    })
  }

  //method that lets you update state from child to parent, its passed to Nav as parameter
  updateKey = (key) => {console.log('updating key in parent!..');this.setState({ authKey: key });}
  updateNote = (note) => {console.log('updating note in parent!..');this.setState({ selectedNote: note });}
  updateNoteTxt = (text) => {console.log('updating note content!..'+text); this.state.selectedNote.content = text;}
  updateMenu = (text) => { 
    
    if (text == 'opener') this.setState({ current: false, opener: true }); 
    if (text == 'current') this.setState({ current: true, opener: false }); 
  
  }

  drukara = () => {
    console.log('printing paper...');
  }

  getNotes = () => {
    axios.get(urlFor('notes'))
    .then((res) => this.setState({notesX: res.data}) )
    .catch((err) => console.log(err.response.data) );
  }

  getNote = (id) => {
    axios.get(urlFor(`notes/${id}`))
    .then((res) => this.setState({note: res.data, showNote: true }) )
    .catch((err) => console.log(err.response.data) );
  }

  performSubmissionRequest = (data, id) => {
    if (id) {
      return axios.patch(urlFor(`notes/${id}`), data);
    } else {
      return axios.post(urlFor('notes'), data);
    }
  }

  submitNote = (data, id) => {
    this.performSubmissionRequest(data, id)
    .then((res) => this.setState({ showNote: false }) )
    .catch((err) => {
      const { errors } = err.response.data;
      if (errors.content) {
        this.setState({ error: "Missing Note Content!" });
      } else if (errors.title) {
        this.setState({ error: "Missing Note Title!" });
      }
    });
  }

  deleteNote = (id) => {
    const newNotesState = this.state.notes.filter((note) => note.id !== id );
    axios.delete(urlFor(`notes/${id}`) )
    .then((res) => this.setState({ notes: newNotesState }) )
    .catch((err) => console.log(err.response.data) );
  }

  showTagForm = () => {
    this.setState({ newTag: true });
  }

  closeTagForm = () => {
    this.setState({ newTag: false });
  }
  
  submitTag = (data, noteId) => {
    axios.post(urlFor(`notes/${noteId}/tags`), data)
    .then((res) => this.getNote(noteId) )
    .catch((err) => {
      const { errors } = err.response.data;
      if (errors.name) {
        this.setState({ error: "Missing Tag Name!" })
      } else if (errors.title) {

      }
    });
  }

  deleteTag = (noteId, id) => {
    axios.delete(urlFor(`/tags/${id}`))
    .then((res) => this.getNote(noteId) )
    .catch((err) => console.log(err.response.body))
  }

  resetError = () => {
    this.setState({ error: '' });
  }

  render() {
    const { showNote, notesX, note, newTag, error, current, opener } = this.state;

    return (
      <div className="App">
        
        <Nav updateMeniu={this.updateMenu} toggleNote={this.toggleNote} showNote={showNote} choseNote={this.updateNote} updateKee={this.updateKey} prop1={this.state.selectedNote}/>
        {error && <Flash error={error} resetError={this.resetError} />}
        {current && <Current updateNoteContent={this.updateNoteTxt} prop1={this.state.selectedNote} name="Jurek" theChosenNote={this.selectedNote} authKee={this.state.authKey}/>}  
        {opener && <Opener updateMeniu={this.updateMenu} updateNoteContent={this.updateNoteTxt} prop1={this.state.selectedNote} name="Jurek" theChosenNote={this.selectedNote} authKee={this.state.authKey} choseNote={this.updateNote}/>}
      
      </div>
    );
  }
}

export default App;
