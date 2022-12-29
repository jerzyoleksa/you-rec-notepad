import React, { useContext, useEffect, useuserData, useRef, useState } from "react"
import {deleteNote, fetchDataCall, getNote, updateNote, updateNoteParam, updateTitleDB} from './ApiAxios'
import Web3 from 'web3';
import ContentEditable from 'react-contenteditable'
import Cookies from 'js-cookie'
import { UserContext, NoteContext } from "./ProviderComponent";
import axios from 'axios'
import { decryptWithAES } from "./EncryptAES";

const OpenerX = ({ menu, setMenu }) => {
    const [context, setContext] = useContext(UserContext);
    const [noteContext, setNoteContext] = useContext(NoteContext);
    const [notes, setNotes] = useState([]);
    const [merge1, setMerge1] = useState(-1);
    const [merge2, setMerge2] = useState(-1);
    const refs = useRef({});
    refs.current = []; // or an {}

    const addToRefs = el => {
      if (el && !refs.current.includes(el)) {
        refs.current.push(el);
      }
     };
 
    const isSelected4Merge = (note) => {
      if (merge1 == note.id || merge2 == note.id) return true;
      return false;
    }
    
    const updateNoteStatusInNotes = (mid, mstatus) => {
      
      const newNotes = notes.map(obj => {
          if (obj.id === mid) {
            return {...obj, status: mstatus};
          }
    
          // 👇️ otherwise return object as is
          return obj;
        });
      
      setNotes(newNotes);
     
      return true;
    }

    const toggleEditingInNotes = (note, idx) => {
      
      const newNotes = notes.map(obj => {
          if (obj.id === note.id) {
            return {...obj, editing: (!note.editing ? true : false)};
          }
    
          // 👇️ otherwise return object as is
          return obj;
        });
      
      setNotes(newNotes);
      
      //set focus
      console.log("edititle"+note.id);

      //the setTimeout is a weird workaround but it must be !

      setTimeout(function() {
        refs.current[idx].focus();
      }, 0);
      selectDivText(refs.current[idx]);

      return true;
    }

    const selectDivText = (el) => {
      var range = document.createRange();
      range.selectNodeContents(el);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
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

    const delNote = async(note) => {let res = await deleteNote(note); console.log(res); getNotes(res);}
    
    const updateTitle = (e, note) => {
      updateTitleDB(e, note.id);
      if (noteContext.id === note.id) {
        console.log("Editing title of the selected note:"+e.currentTarget.textContent);
        note.title = e.currentTarget.textContent;
        setNoteContext(note);
        //setNoteContext(currentContext => ({ ...currentContext, ...{"title" : e.currentTarget.textContent} }));  
      }
    }
    

    // const secure = async(note) => {
    //   (note.status == 7 ? note.status = 1 : note.status = 7); 
    //   updateNoteStatusInNotes(note.id, note.status); 
    //   let res = await updateNoteParam(note.id, 'status', note.status, context.sign); 
    //   console.log('toggled secured'+res);
    // }
    
    // const deleteNoteOLD = (note) => {
    //   //const newNotesState = this.state.notes.filter((note) => note.id !== id );
    //   axios.delete('https://frengly.com/ai/notes/'+note.id)
    //   .then((res) => getNotes() )
    //   .catch((err) => console.log(err.response) );
    // }


    const cancelMerge = () => {
        setMerge1(-1);
        setMerge2(-1);
    }
  
    const doMerge = () => {
      let data = {"id1" : merge1, "id2": merge2};
      axios.post('https://urec.app/ai/notesMerge', data)
      .then((res) => {getNotes(); setMerge1(-1); setMerge2(-1);} )
      .catch((err) => console.log(err.response) );
    }
  
    const createNew = () => {
      //const newNotesState = this.state.notes.filter((note) => note.id !== id );
      let noteToCreate = {"userId" : context.userId, "content": ""};
      
      axios.post('https://urec.app/ai/notes', noteToCreate) //dont put slash at the end of URL !!!!!!!!!!!
      .then((res) => getNotes() )
      .catch((err) => console.log(err.response) );
    }


    

    //-------- TRICKY !
    const selectNote = (note) => {
      setNoteContext(note);
      
      
      
      //to LOAD content, ultimately we dont want to get contents with getNotesSec
      //NIU
      // const fetchData = async () => {  
      //    let res = await getNote(noteContext.id, context.sign);
      //    setNoteContext(currentContext => ({ ...currentContext, ...{"content" : processContent(res.data.content) }})); //instead of updateContext
            
      //    console.log(res.data);
      //  }
      // fetchData();
      //NIU




      setMenu({ "current": true, "opener": false });

      //new Date().toISOString() returns ISO-8601 YYYY-MM-DDTHH:mm:ss.sssZ)
      var tm = new Date().toISOString().substring(0, 19).replace("T"," ");
      axios.put('https://urec.app/ai/notes', { "id": note.id, "name": "viewed", "value" :  tm})
      .catch((err) => console.log("Error updating!!!",err) );

    }

    const getNotes = (param) => {
      const fetchData = async () => {
        let list = await fetchDataCall(context.sign);
        console.log('getNotes');
        setNotes(list);
      };
  
      fetchData();
    }

    useEffect(() => {
      getNotes();
    }, []);

    //context listener de fact
    useEffect(() => {
      console.log('module OpenerX noticed the change in context:'+context.userId);
      if (context.userId === null) setNotes([]);
    }, [context]);

    


    return (
          
      <div className="textarea-container">
        <div className="nav-container">
          <div className="nav-list opener-tbl" onClick={() => createNew()}><span className={context.isDark ? "btn btn-framed light-mode-dark" : "btn btn-framed"}>+ Create new note</span></div>

          {merge1>-1 && merge2>-1 && <div className="nav-list opener-tbl" onClick={() => doMerge()}><span className="btn btn-framed">Merge</span></div> }
          {merge1>-1 && merge2>-1 && <div className="nav-list opener-tbl" onClick={() => cancelMerge()}><span className="btn btn-framed">Cancel merge</span></div> }
  
        </div>
        <div>
              { Array.isArray(notes) &&
                  notes.map((note, idx) => <div className="nav-container" key={note.id+'parent'}>
                          
                          
                          <div className="nav-list-narrow"  onClick={() => {toggleEditingInNotes(note,idx)}}><span className="material-icons-outlined nav-span">edit</span></div>                       
                          <div className="nav-list-narrow"  onClick={() => {delNote(note)}}><span className="material-icons-outlined nav-span">delete</span></div> 
                          <div className="nav-list-narrow" onClick={() =>selectMerge(note)}><span className={isSelected4Merge(note) ? 'material-icons-outlined nav-span-blue' : 'material-icons-outlined nav-span'}>link</span></div> 
                          
                          <div className={!note.editing ? "nav-list opener-tbl" : "nav-list opener-tbl hidden"}  onClick={() => selectNote(note)}><span className={context.isDark ? 'label-white' : 'label-black'}>{note.title}.txt</span></div>
                          {/* W momencie generowania jest niewidoczny !!!! */}
                          <div className={note.editing ? "nav-list opener-tbl edit-parent-div" : "nav-list opener-tbl edit-parent-div hidden"}><div ref={el => addToRefs(el)} className={context.isDark ? 'label-white edit-child-div' : 'label-black edit-child-div'} suppressContentEditableWarning={true} contentEditable="true" onInput={e => { updateTitle(e, note)} }></div><div className={context.isDark ? 'label-white edit-child-div' : 'label-black edit-child-div'}>.txt</div></div>
                          {note.status === 7 && <div className="nav-list-narrow"><span className="material-icons-outlined nav-span info">shield</span></div> }
                      </div>
                      )
              }

        </div>
        {/* <div>merge1::{merge1}</div>
        <div>merge2::{merge2}</div> */}
      </div>

    )
}

export default OpenerX