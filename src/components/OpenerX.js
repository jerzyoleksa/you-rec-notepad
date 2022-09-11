import React, { useContext, useEffect, useuserData, useRef } from "react"
import fetchDataCall from './ApiAxios'
import Web3 from 'web3';
import ContentEditable from 'react-contenteditable'
import Cookies from 'js-cookie'
import { AppContext } from "./AppContext";


const OpenerX = () => {
    const [userData, setUserData] = useContext(AppContext);
    //const contentEditableRef = useRef();

    const updateTitle = () => {
    }

    const export2 = () => {
    }

    const toggleLightMode = () => {
    }

    const handleChange = (event) => {
     
      setUserData({value: event.target.value});
      //props.updateNoteContent(event.target.value);
  
      if (userData.typingTimeout) {
        clearTimeout(userData.typingTimeout);
      }
      
      userData.typing = false;
      userData.typingTimeout = setTimeout(() => {
        updateNote();  
      }, 1500);
  
  
    }


    const updateNote = () => {
    
      this.props.updateSaviStatus("saving ..."); //in async methods must be setUserData, not just this.userData.status = ...
      let noteToUpdate = this.props.prop1;
      console.log('updating:'+noteToUpdate);
      console.log('key from parent:'+this.props.authKee);
      
      noteToUpdate["authKey"] = this.props.authKee;
  
      noteToUpdate["name"] = "content"; 
      noteToUpdate["value"] = noteToUpdate["content"];
  
      
      //1st to update standard content or other param
      axios.put('https://frengly.com/ai/notes', noteToUpdate)
      .then((res) => {
        this.props.updateSaviStatus("");
      })
      .catch((err) => console.log("Error updating!!!",err) );

    }

    useEffect(() => {
      //this.nameInput.focus();
      console.log('OpenerX');
      document.getElementById("txtar").focus();
    }, []);

    


    return (
          
      <div className="textarea-container">
        <div className="nav-container">
          <div className="nav-list opener-tbl" onClick={() => createNew()}><span className="btn btn-framed">Create new note</span></div>

          {userData.merge1>-1 && this.userData.merge2>-1 && <div className="nav-list opener-tbl" onClick={() => startMerge()}><span className="btn btn-framed">Merge</span></div> }
          {userData.merge1>-1 && this.userData.merge2>-1 && <div className="nav-list opener-tbl" onClick={() => cancelMerge()}><span className="btn btn-framed">Cancel merge</span></div> }
  
        </div>
        <div>
              { 
                  userData.notes.map((note) => <div className="nav-container" key={note.id+'parent'}>
                          <div className="nav-list-narrow"  onClick={() => deleteNote(note)}><span className="material-icons-outlined nav-span">delete</span></div> 
                          <div className="nav-list-narrow" onClick={() =>selectMerge(note)}><span className={isSelected4Merge(note) ? 'material-icons-outlined nav-span-blue' : 'material-icons-outlined nav-span'}>link</span></div> 
                          
                          <div className="nav-list opener-tbl"  onClick={() => selectNote(note)}>{note.title}.txt</div>
                      </div>
                      )
              }

        </div>
        <div>merge1::{userData.merge1}</div>
        <div>merge2::{userData.merge2}</div>
      </div>

    )
}

export default OpenerX