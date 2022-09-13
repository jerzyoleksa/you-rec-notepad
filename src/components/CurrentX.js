import React, { useContext, useEffect, useState, useRef } from "react"
import fetchDataCall from './ApiAxios'
import Web3 from 'web3';
import ContentEditable from 'react-contenteditable'
import Cookies from 'js-cookie'
import { UserContext, NoteContext } from "./ProviderComponent";


const CurrentX = () => {
    const [context] = useContext(UserContext);
    const note = useContext(NoteContext);
    //const [note, setNote] = useContext(AppContext);
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
    
      this.props.updateSaviStatus("saving ..."); //in async methods must be setState, not just this.state.status = ...
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
      //console.log("[CurrentX] useEffect:"+JSON.stringify(userData));
      document.getElementById("txtar").focus();
    }, []);




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
        <textarea id="txtar" value={note.content} onChange={handleChange}  />
        

        
      </div>

    )
}

export default CurrentX