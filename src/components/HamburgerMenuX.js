import React, { useContext, useEffect, useuserData, useRef, useState } from "react"
import {accessByKey, deleteNote, fetchDataCall, getNote, updateNote, updateNoteParam, updateTitleDB} from './ApiAxios'
import Web3 from 'web3';
import ContentEditable from 'react-contenteditable'
import Cookies from 'js-cookie'
import { UserContext, NoteContext } from "./ProviderComponent";
import axios from 'axios'
import { decryptWithAES } from "./EncryptAES";

const HamburgerMenuX = ({ menu, setMenu }) => {
    const [context, setContext] = useContext(UserContext);
    const [noteContext, setNoteContext] = useContext(NoteContext);
    const [notes, setNotes] = useState([]);
    const [merge1, setMerge1] = useState(-1);
    const [merge2, setMerge2] = useState(-1);
    const [credo, setCredo] = useState("");
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
    

    const secure = async(note) => {
      (note.status == 7 ? note.status = 1 : note.status = 7); 
      updateNoteStatusInNotes(note.id, note.status); 
      let res = await updateNoteParam(note.id, 'status', note.status, context.sign); 
      console.log('toggled secured'+res);
    }
    
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


    



    const updateCredo = (e) => {

      setCredo(e.currentTarget.textContent);
      document.getElementById("inp2016").focus();
     
    }

    //-------- TRICKY !
    const accessByPassword = async () => {
      
      console.log('credo::'+credo);
      const callAccess = async () => {

        let result2 = await accessByKey(credo);  
        let address = result2.address;
        let uid = result2.newId;
        let sign = result2.sign.toString();

        setContext(currentContext => ({ ...currentContext, ...{"sign" : sign, "address" : address, "userId" : uid} })); 
        setMenu({ "current": true, "opener": false, "password" : false });
      };

      callAccess();

    }
    useEffect(() => {

    }, []);

    


    return (
        
      <div>
          <div className="nav-container">
        
            
            <div className="nav-list" onClick={() => menuTab('opener')} ><span className="menu-label">Notes</span><span className="menu-icon material-icons-outlined nav-span">apps</span></div>
            <div className="nav-list" onClick={() => export2()}><span className="menu-label">Export</span></div> 


            <div className="nav-list" onClick={() => toggleLightMode()}><span className="material-icons-outlined nav-span">wb_sunny</span></div> 
                    
            {/*<div className="nav-list" onClick={() => this.connectMetamask()}><span class="material-icons-outlined">account_circle</span></div> 
            */}
            {/*
            <div className="nav-list" onClick={() => this.connectMetamask()}><img src="img/mm.svg" width="24" height="24"/></div> 
            */}
            
            
            {context.address && context.address.length > 0 && <div className="nav-list" onClick={() => logout()}><span className="material-icons-outlined nav-span">logout</span></div>}

            {context.status && <div className="nav-list"><span className='savingTextStyle'>{context.status}</span></div>}

          </div>
            {/* <div className="nav-list">{String(this.state.isDark)}</div> */}
    
      </div>
                      

    )
}

export default HamburgerMenuX