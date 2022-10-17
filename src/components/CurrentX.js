import React, { useContext, useEffect, useState, useRef } from "react"
import fetchDataCall from './ApiAxios'
import Web3 from 'web3';
import ContentEditable from 'react-contenteditable'
import Cookies from 'js-cookie'
import axios from 'axios'
import { UserContext, NoteContext } from "./ProviderComponent";
import { decryptWithAES, encryptTextWithAES } from "./EncryptAES";


const CurrentX = () => {
  const [context, setContext] = useContext(UserContext);
  const [noteContext, setNoteContext] = useContext(NoteContext);
    //const [note, setNote] = useContext(AppContext);
    //const contentEditableRef = useRef();

    const handleChange = (event) => {
     
      //!!!!
      //this can be asynchronous, so cant rely on context being updated on time when updating note, better to use target value later
      setNoteContext(currentContext => ({ ...currentContext, ...{"content" : event.target.value} })) //instead of updateContext
      //!!!!      
      
      if (context.typingTimeout) {
        clearTimeout(context.typingTimeout);
      }
      
      context.typing = false;
      context.typingTimeout = setTimeout(() => {
        updateNote(event.target.value);  
      }, 1500);
  
  
    }

    const processContent = (ecryptedText) => {
      if (noteContext.status === 7) {
        console.log('77777777777777777777777777777'+ecryptedText);
        var decrypted = ecryptedText;
        try {
            decrypted = decryptWithAES(ecryptedText, '0123456789123456');       
        } catch (error) {
          console.log(error);
        }
        return decrypted;
      }
      return ecryptedText;
      
    }

    const updateNote = (newText) => {
    
      //this.props.updateSaviStatus("saving ..."); //in async methods must be setState, not just this.state.status = ...
      setContext(currentContext => ({ ...currentContext, ...{"status" : "saving ..."} })) //instead of updateContext
      
      let noteToUpdate = {};

      //console.log('updating:'+noteToUpdate);
      //console.log('key from parent:'+this.props.authKee);
      //console.log('authKey::'+context.sign);
      noteToUpdate["id"] = noteContext.id;
      noteToUpdate["userId"] = context.userId;
      noteToUpdate["title"] = noteContext.title; //to be used in case its a first message and needs to be created
      noteToUpdate["authKey"] = context.sign;
      noteToUpdate["address"] = context.address;
      noteToUpdate["name"] = "content"; 
      noteToUpdate["value"] = (noteContext.status == 7 ? encryptTextWithAES(newText, '0123456789123456') : newText);
      //noteToUpdate["value"] = newText;
  
      (noteContext.status == 7) ? console.log('noteContext.status:'+noteContext.status) : console.log('not 7');
      
      //1st to update standard content or other param
      axios.put('https://urec.app/ai/notes', noteToUpdate)
      .then((res) => {
        setContext(currentContext => ({ ...currentContext, ...{"status" : ""} }))
        if (res.updatedId) setNoteContext(currentContext => ({ ...currentContext, ...{"id" : res.updatedId} }))
        
        console.log('updatedId-->'+res.updatedId);
      })
      .catch((err) => {setContext(currentContext => ({ ...currentContext, ...{"status" : "failed :("} })); console.log("Error updating!!!",err)} );

    }

    useEffect(() => {
      //this.nameInput.focus();
      //console.log("[CurrentX] useEffect:"+JSON.stringify(userData));
      document.getElementById("txtar").focus();
    }, [context.opener, context.current]);




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
        <textarea id="txtar" value={noteContext ? noteContext.content : ""} onChange={handleChange}  />
        

        
      </div>

    )
}

export default CurrentX