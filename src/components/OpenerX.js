import React, { useContext, useEffect, useuserData, useRef, useState } from "react"
import fetchDataCall from './ApiAxios'
import Web3 from 'web3';
import ContentEditable from 'react-contenteditable'
import Cookies from 'js-cookie'
import { UserContext, NoteContext } from "./ProviderComponent";
import axios from 'axios'

const OpenerX = ({ menu, setMenu }) => {
    const [context, setContext] = useContext(UserContext);
    const [noteContext, setNoteContext] = useContext(NoteContext);
    const [notes, setNotes] = useState([]);
    const [merge1, setMerge1] = useState(-1);
    const [merge2, setMerge2] = useState(-1);

    const isSelected4Merge = (note) => {
      if (merge1 == note.id || merge2 == note.id) return true;
      return false;
    } 

    const selectMerge = (note) => {

      if (note.id == merge1) {setMerge1(-1); return;} //deselect
      if (note.id == merge2) {setMerge2(-1); return;} //deselect

      if (merge1 == -1) {
        setMerge1(note.id);
      } else {
        setMerge2(note.id);
      }
    }

    const deleteNote = (note) => {
      //const newNotesState = this.state.notes.filter((note) => note.id !== id );
      axios.delete('https://frengly.com/ai/notes/'+note.id)
      .then((res) => getNotes() )
      .catch((err) => console.log(err.response) );
    }
  
    const cancelMerge = () => {
        setMerge1(-1);
        setMerge2(-1);
    }
  
    const doMerge = () => {
      let data = {"id1" : merge1, "id2": merge2};
      axios.post('https://frengly.com/ai/notesMerge', data)
      .then((res) => {getNotes(); setMerge1(-1); setMerge2(-1);} )
      .catch((err) => console.log(err.response) );
    }
  
    const createNew = () => {
      //const newNotesState = this.state.notes.filter((note) => note.id !== id );
      let noteToCreate = {"userId" : 1, "content": ""};
  
      axios.post('https://frengly.com/ai/notes', noteToCreate) //dont put slash at the end of URL !!!!!!!!!!!
      .then((res) => getNotes() )
      .catch((err) => console.log(err.response) );
    }

    //TRICKY !
    const selectNote = (note) => {
      setNoteContext(note);
      setMenu({ "current": true, "opener": false });
      //this.props.choseNote(note);
      //this.props.updateMeniu('current');
    }

    const getNotes = () => {
      const fetchData = async () => {
        let list = await fetchDataCall({});
        setNotes(list);
      };
  
      fetchData();
    }

    useEffect(() => {
      const fetchData = async () => {
        let list = await fetchDataCall({});
        setNotes(list);
      };
  
      fetchData();
      //document.getElementById("txtar").focus();
    }, []);

    


    return (
          
      <div className="textarea-container">
        <div className="nav-container">
          <div className="nav-list opener-tbl" onClick={() => createNew()}><span className="btn btn-framed">Create new note</span></div>

          {merge1>-1 && merge2>-1 && <div className="nav-list opener-tbl" onClick={() => doMerge()}><span className="btn btn-framed">Merge</span></div> }
          {merge1>-1 && merge2>-1 && <div className="nav-list opener-tbl" onClick={() => cancelMerge()}><span className="btn btn-framed">Cancel merge</span></div> }
  
        </div>
        <div>
              { 
                  notes.map((note) => <div className="nav-container" key={note.id+'parent'}>
                          <div className="nav-list-narrow"  onClick={() => deleteNote(note)}><span className="material-icons-outlined nav-span">delete</span></div> 
                          <div className="nav-list-narrow" onClick={() =>selectMerge(note)}><span className={isSelected4Merge(note) ? 'material-icons-outlined nav-span-blue' : 'material-icons-outlined nav-span'}>link</span></div> 
                          
                          <div className="nav-list opener-tbl"  onClick={() => selectNote(note)}>{note.title}.txt</div>
                      </div>
                      )
              }

        </div>
        <div>merge1::{merge1}</div>
        <div>merge2::{merge2}</div>
      </div>

    )
}

export default OpenerX