import React, { useContext, useEffect, useuserData, useRef, useState } from "react"
import {accessByKey, deleteNote, getNote, updateNote, updateNoteParam, updateTitleDB} from './ApiAxios'
import Web3 from 'web3';
import ContentEditable from 'react-contenteditable'
import axios from 'axios'
import { decryptWithAES } from "./EncryptAES";
import Cookies from 'js-cookie'

const CredsX = ({ menu, setMenu, setUser, loginWithCookies }) => {
    //const [context, setContext] = useContext(UserContext);
    //const [noteContext, setNoteContext] = useContext(NoteContext);
    // const [notes, setNotes] = useState([]);
    // const [merge1, setMerge1] = useState(-1);
    // const [merge2, setMerge2] = useState(-1);
    const [credo, setCredo] = useState("");
    // const refs = useRef({});
    // refs.current = []; // or an {}

    // const addToRefs = el => {
    //   if (el && !refs.current.includes(el)) {
    //     refs.current.push(el);
    //   }
    //  };
 
    // const isSelected4Merge = (note) => {
    //   if (merge1 == note.id || merge2 == note.id) return true;
    //   return false;
    // }
    
    // const updateNoteStatusInNotes = (mid, mstatus) => {
      
    //   const newNotes = notes.map(obj => {
    //       if (obj.id === mid) {
    //         return {...obj, status: mstatus};
    //       }
    
    //       // 👇️ otherwise return object as is
    //       return obj;
    //     });
      
    //   setNotes(newNotes);
     
    //   return true;
    // }

    // const toggleEditingInNotes = (note, idx) => {
      
    //   const newNotes = notes.map(obj => {
    //       if (obj.id === note.id) {
    //         return {...obj, editing: (!note.editing ? true : false)};
    //       }
    
    //       // 👇️ otherwise return object as is
    //       return obj;
    //     });
      
    //   setNotes(newNotes);
      
    //   //set focus
    //   console.log("edititle"+note.id);

    //   //the setTimeout is a weird workaround but it must be !

    //   setTimeout(function() {
    //     refs.current[idx].focus();
    //   }, 0);
    //   selectDivText(refs.current[idx]);

    //   return true;
    // }

    // const selectDivText = (el) => {
    //   var range = document.createRange();
    //   range.selectNodeContents(el);
    //   var sel = window.getSelection();
    //   sel.removeAllRanges();
    //   sel.addRange(range);
    // }

    // const selectMerge = (note) => {

    //   if (note.id == merge1) {setMerge1(-1); return;} //deselect
    //   if (note.id == merge2) {setMerge2(-1); return;} //deselect

    //   if (merge1 == -1) {
    //     setMerge1(note.id);
    //   } else {
    //     setMerge2(note.id);
    //   }
    // }

    // const delNote = async(note) => {let res = await deleteNote(note); console.log(res); getNotes(res);}
    
    // const updateTitle = (e, note) => {
    //   updateTitleDB(e, note.id);
    //   if (noteContext.id === note.id) {
    //     console.log("Editing title of the selected note:"+e.currentTarget.textContent);
    //     note.title = e.currentTarget.textContent;
    //     setNoteContext(note);
    //     //setNoteContext(currentContext => ({ ...currentContext, ...{"title" : e.currentTarget.textContent} }));  
    //   }
    // }
    

    // const secure = async(note) => {
    //   (note.status == 7 ? note.status = 1 : note.status = 7); 
    //   updateNoteStatusInNotes(note.id, note.status); 
    //   let res = await updateNoteParam(note.id, 'status', note.status, context.sign); 
    //   console.log('toggled secured'+res);
    // }
    
    // const deleteNoteOLD = (note) => {
    //   //const newNotesState = this.state.notes.filter((note) => note.id !== id );
    //   axios.delete('https://frengly.com/rest/v1/notes/'+note.id)
    //   .then((res) => getNotes() )
    //   .catch((err) => console.log(err.response) );
    // }


    // const cancelMerge = () => {
    //     setMerge1(-1);
    //     setMerge2(-1);
    // }
  
    // const doMerge = () => {
    //   let data = {"id1" : merge1, "id2": merge2};
    //   axios.post('https://syslang.io/rest/v1/notesMerge', data)
    //   .then((res) => {getNotes(); setMerge1(-1); setMerge2(-1);} )
    //   .catch((err) => console.log(err.response) );
    // }
  
    // const createNew = () => {
    //   //const newNotesState = this.state.notes.filter((note) => note.id !== id );
    //   let noteToCreate = {"userId" : context.userId, "content": ""};
      
    //   axios.post('https://syslang.io/rest/v1/notes', noteToCreate) //dont put slash at the end of URL !!!!!!!!!!!
    //   .then((res) => getNotes() )
    //   .catch((err) => console.log(err.response) );
    // }


    


    
    const handleKeyup = (e) => {
      
      if (e.key === 'Enter') {
        e.preventDefault();
        //console.log('someone hit dat enter');
        accessByPassword();
      }
    }

    const updateCredo = (e) => {
      //console.log('inside updateCredo');
      setCredo(e.currentTarget.textContent);
      document.getElementById("inp2016").focus();
      //console.log(e.key);
    }

    //-------- TRICKY !
    const accessByPassword = async () => {
      
      Cookies.set('syslang-secret', credo);
      loginWithCookies();
      
      // const callAccess = async () => {

      //   let result2 = await accessByKey(credo); // tu jest problem bo pewnie result2 jeszcze nie przyszedl !!!!!!!!
        
      //   let address = result2.address;
      //   //console.log('result2:::'+result2.sign+" address::"+address); 
      //   let uid = result2.newId;
      //   if (result2.sign) {
 
      //     let sign = result2.sign.toString();

      //     setUser(currentContext => ({ ...currentContext, ...{"sign" : sign, "address" : address, "userId" : uid} })); 
      //     setMenu({ "current": true, "opener": false, "password" : false });
      //     Cookies.set('syslang-sign', sign);
      //   }
      // };

      // callAccess();

    }

    useEffect(() => {
      document.getElementById("inp2016").focus();
    }, []);

    


    return (
        
      <div>
        <div id="inp2016" onKeyDown={(event) => {handleKeyup(event);}} onInput={e => { updateCredo(e) }} suppressContentEditableWarning={true} contentEditable="true" className="pass-input"></div>
        <div id="auth-but" onClick={() => accessByPassword()}><span className="btn btn-framed">authenticate</span></div>
      </div>
                      

    )
}

export default CredsX