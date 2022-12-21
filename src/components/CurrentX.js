import React, { useContext, useEffect, useState, useRef } from "react"
import fetchDataCall, { getNote, updateNoteParam } from './ApiAxios'
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
  const [secInput, setSecInput] = useState(false);
  const [key, setKey] = useState(null);
  const [isDecrypted, setIsDecrypted] = useState(false);
    //const [note, setNote] = useContext(AppContext);
    //const contentEditableRef = useRef();

    //tab ident in textarea, from https://www.npmjs.com/package/indent-textarea
    
    //indentation.watch(textarea);          
    //tab ident in textarea





    /**
     * 
     * this method
     * 2. decrypts note content
     * 3. validates 16-char pass
     *  
     */
    const handle16KeyChange = () => {

      //decrypt if key has 16 char
      if (key && key.length === 16) {  
        try {
          
          //encryption
          //Do i need to encrypt during editing - NO
          //Encrypt only when saving the edit !
          //Here just for [TEST]
          // if (noteContext.status === 1) {
            
          //   setNoteContext(currentContext => ({ ...currentContext, ...{"status" : 7} }))
          //   console.log('encryption:' + encryptTextWithAES(noteContext.content, key));
          // }

          //decryption
          if (noteContext.status === 7) {
              var result = decryptWithAES(noteContext.content, key);

              if (result.length === 0) {
                console.log('Wrong password gives empty result or malformed utf-8 data exception');
              
              } else {//Success decryption

                //TODO: PROBLEM - this line does not update textArea with decryption immediately, only after anoher keypress
                setNoteContext(currentContext => ({ ...currentContext, ...{"content" : result} }));
                setIsDecrypted(true);
                //WORKAROUND
                //console.log(result);
               // document.getElementById('txtar').value = result;
              }
          }
          //decryption

         


        } catch (error) {
          //Wrong 16 key password gives empty result OR an error malformed utf-8 data
          console.log(error.name +' '+ error.message);
        }
      }
      //decrypt

    }
   
    /*
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

        console.log('decrypted:'+decrypted);
        if (decrypted.length === 0) {
          console.log('not decrypted, message probably not encrypted yet. make sure you have set 16char key and update your note.');
          noteContext.decrypted = true; //settting to true even if its not encrypted, to let it go through the condition in edit function
          return;
        }

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
      
    }*/


    const handleTextAreaChange = (event) => {
      
      //check if content is encrypted, if encrypted then disable editting
      if (noteContext.status === 7 && noteContext.content.length > 0 && !isDecrypted) {
        console.log('Content needs to be unencrypted to be updated');
        return;
      }

      //!!!! DECRYPT CONTENT OF NOTE in noteContext
      //this can be asynchronous, so cant rely on context being updated on time when updating note, better to use target value again below
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

    // const getContentToDisplay = (noteContext) => {
    //   if (noteContext) {

    //     if (noteContext.status === 7 && noteContext.decrypted) return noteContext.decrypted;

    //     return noteContext.content;
    //   }
    //   return "";
    // }

    //newText is taken directly from textarea
    const updateNote = (newText) => {
    
      console.log('inside note update:'+noteContext.status);
      //OK validation only for secured messages
      if (noteContext.status === 7 && (!key || key.length != 16)) {
        console.log('Update Failed. Encryption key must have exactly 16 chars');
        return;
      }

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

   
      noteToUpdate["value"] = (noteContext.status == 7 ? encryptTextWithAES(newText, key) : newText);
   
      
      //1st to update standard content or other param
      axios.put('https://urec.app/ai/notes', noteToUpdate)
      .then((res) => {
        setContext(currentContext => ({ ...currentContext, ...{"status" : ""} }))
        if (res.updatedId) setNoteContext(currentContext => ({ ...currentContext, ...{"id" : res.updatedId} }))
        
        console.log('updatedId-->'+res.updatedId);
      })
      .catch((err) => {setContext(currentContext => ({ ...currentContext, ...{"status" : "failed :("} })); console.log("Error updating!!!",err)} );

    }

    const secure = async() => {
      setNoteContext(currentContext => ({ ...currentContext, ...{"status" : 7} }));
      
      //need to set it again, cause the setNoteContext is async
      noteContext.status = 7;
      
      updateNote(noteContext.content); 
      updateNoteParam(noteContext.id, 'status', 7, context.sign); 
      
      toggleSecInput();
      setKey(null);
    }

    const unsecure = () => {
      console.log('unsecuring...');
      noteContext.status = 1;
      updateNote(noteContext.content);
      updateNoteParam(noteContext.id, 'status', 1, context.sign); 
      toggleSecInput();
      setKey(null);
    }
    
    const toggleSecInput = () => {
      setSecInput(!secInput);
    }
    
    const getSecIconName = () => {
      if (noteContext.status === 7) return 'lock';
      if (noteContext.status === 1) return 'no_encryption';
    }
    
    //separate useEffect just for key useState param - react sucks
    useEffect(() => {
      console.log('useEffect::'+key);
      handle16KeyChange()
    }, [key]);
    //separate useEffect for key

    useEffect(() => {
      if (secInput) {
        console.log('secInput:'+secInput);
        document.getElementById("secInputDiva").focus();
      }
    }, [secInput]);

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
        
        <textarea id="txtar" value={noteContext ? noteContext.content : ""} onChange={handleTextAreaChange}  />
         
        <div className="absolute-pass">
         


          {/* UNSECURE */}
          {noteContext.status === 7 && isDecrypted && secInput &&
            <div className="absolute-pass-ico-ok"  
               onClick={() => {unsecure()}}>
                  <span>Unsecure</span> </div> 
          }

          {/* OK */}
          {noteContext.status === 1 && key && key.length === 16 && secInput &&
            <div className="absolute-pass-ico-ok"  
               onClick={() => {secure()}}>
                  <span>OK</span> </div> 
          }


          {/* INPUT */}                
          {secInput && 
          <div id="secInputDiva" className={key && key.length === 16 ? 'absolute-pass-inp absolute-pass-inp-ok' : 'absolute-pass-inp'}
          suppressContentEditableWarning={true} 
          contentEditable={!isDecrypted}
          onInput={e => { setKey(e.currentTarget.textContent)}}></div>}

          {/* LOCK */}
          <div className="absolute-pass-ico"  
               onClick={() => {toggleSecInput()}}>
                  <span className={noteContext.status == 7 ?'material-icons-outlined nav-span' : 'material-icons-outlined nav-span'}>{getSecIconName()}</span></div> 

          {/* STATUS (TEST-ONLY) */}                
              
          {/* <div className="absolute-pass-ico">{noteContext.status}, {key ? key.length : "0"}</div> */}

          


        </div>
        
      </div>

    )
}

export default CurrentX