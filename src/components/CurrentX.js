import React, { useContext, useEffect, useState, useRef } from "react"
import fetchDataCall, { getNote } from './ApiAxios'
import Web3 from 'web3';
import ContentEditable from 'react-contenteditable'
import Cookies from 'js-cookie'
import axios from 'axios'
import { UserContext, NoteContext } from "./ProviderComponent";
import { decryptWithAES, encryptTextWithAES } from "./EncryptAES";
import * as indentation from 'indent-textarea';

const CurrentX = () => {
  const [context, setContext] = useContext(UserContext);
  const [noteContext, setNoteContext] = useContext(NoteContext);
    //const [note, setNote] = useContext(AppContext);
    //const contentEditableRef = useRef();

    //tab ident in textarea, from https://www.npmjs.com/package/indent-textarea
    
    //indentation.watch(textarea);          
    //tab ident in textarea
    const decryptSecured = (e) => {
      
      let key = e.currentTarget.textContent;
      setNoteContext(currentContext => ({ ...currentContext, ...{"key" : key} }))

      if (key.length !== 16) {
        console.log('password must contain exactly 16 characters');
        return;
      }

      if (noteContext.decrypted) {
        console.log('Note already decrypted. Now you changing password for future updates');
        return;
      }

      var decrypted = noteContext.content;
      
      try {
        decrypted = decryptWithAES(noteContext.content, key);
        setNoteContext(currentContext => ({ ...currentContext, ...{"content" : decrypted} })) //instead of updateContext  
        
        console.log('Message decrypted. Now when you change the input field key, you change the encryption password')
        setNoteContext(currentContext => ({ ...currentContext, ...{"decrypted" : true} })) //instead of updateContext      
        
      } catch (error) {
        //Error: Malformed UTF-8 data - means wrong password
        // console.log(error.name);
        // console.log(error.message);
        if (error.message.startsWith('Malformed UTF-8 data')) {
          console.log('Password Incorrect');
        } else {
          console.log(error);
        }
        //setNoteContext(currentContext => ({ ...currentContext, ...{"decrypted" : undefined} })) //instead of updateContext
      }
      
    }


    const handleChange = (event) => {
      if (noteContext.status === 7 && noteContext.content.length > 0 && !noteContext.decrypted) {
        console.log('Content needs to be unencrypted to be updated');
        return;
      }
      //!!!!
      //this can be asynchronous, so cant rely on context being updated on time when updating note, better to use target value later
      setNoteContext(currentContext => ({ ...currentContext, ...{"content" : event.target.value} })) //instead of updateContext
      //setNoteContext(currentContext => ({ ...currentContext, ...{"decrypted" : event.target.value} })) //instead of updateContext
      //!!!!      
      
      if (context.typingTimeout) {
        clearTimeout(context.typingTimeout);
      }
      
      context.typing = false;
      context.typingTimeout = setTimeout(() => {
        updateNote(event.target.value);  
      }, 1500);
  
  
    }
    const getContentToDisplay = (noteContext) => {
      if (noteContext) {

        if (noteContext.status === 7 && noteContext.decrypted) return noteContext.decrypted;

        return noteContext.content;
      }
      return "";
    }

    //newText is taken directly from textarea
    const updateNote = (newText) => {
    
      if (noteContext.status === 7 && noteContext.key.length != 16) {
        console.log('Update Failed. Encryption key must have exactly 16 chars');
        return;
      }
      //TODO
      // if (noteContext && noteContext.decrypted){

      // }

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

      console.log(newText);
      console.log(noteContext.key);
      noteToUpdate["value"] = (noteContext.status == 7 ? encryptTextWithAES(newText, noteContext.key) : newText);
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
      document.getElementById("txtar").focus();

      //textarea ident
      const textarea = document.querySelector('textarea');
      indentation.watch(textarea);
      //textarea  ident

      console.log('CurrentX.useEffect()');
      
      const fetchData = async () => {

        if (!noteContext || !context.sign) return;
        let fullNoteObject = await getNote(noteContext.id, context.sign);
        setNoteContext(fullNoteObject);
      }
      fetchData();

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
        {noteContext.status === 7 && <div className="absolute-pass"
             suppressContentEditableWarning={true} 
             contentEditable="true"
             onInput={e => { decryptSecured(e)}}></div>}

        
      </div>

    )
}

export default CurrentX