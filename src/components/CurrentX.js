import React, { useContext, useEffect, useState, useRef } from "react"
import { getNote, updateNoteParam } from './ApiAxios'
import Web3 from 'web3';
import ContentEditable from 'react-contenteditable'
import Cookies from 'js-cookie'
import axios from 'axios'
// import { UserContext, note } from "./ProviderComponent";
import { decryptWithAES, encryptTextWithAES } from "./EncryptAES";
import * as indentation from 'indent-textarea';

const CurrentX = ({ menu, setMenu, setUser, setNote, user, note }) => {
  //const [context, setUser] = useContext(UserContext);
  //const [note, setNote] = useContext(note);
  const [secInput, setSecInput] = useState(false);
  const [key, setKey] = useState(null);
  const [isDecrypted, setIsDecrypted] = useState(false);
    //const [note, setNote] = useContext(AppContext);
    //const contentEditableRef = useRef();

    //tab ident in textarea, from https://www.npmjs.com/package/indent-textarea
    
    //indentation.watch(textarea);          
    //tab ident in textarea
    const handleKeyDownPressed = event => {
      //console.log(event.key);
  
      //ctrl-q to insert timestamp
      if ((event.key == 'q') && (event.ctrlKey)) {
        console.log('inserting timestamp JESLI menu == current ', event.key);
        insertTimestamp();
        event.preventDefault();
        event.stopPropagation();
        //TODO: set 
      } else {
        console.log('DONT');
      }
    }

    /**
     * insert timestamp at
     */
    const textareaRef = useRef(null);
    const insertTimestamp = () => {
      const textarea = textareaRef.current;
      if (!textarea) return;
  
      const { selectionStart, selectionEnd } = textarea;
      //let timestamp = '['+new Date().toLocaleString('pl-PL', { timeZoneName: 'short' })+']';
      //timestamp = timestamp.replace(' CEST','').replace(', ','|');
      let currentTimestamp = new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'long',
        timeStyle: 'short',
        timeZone: 'Europe/Warsaw',
      }).format(new Date());
      let timestamp = '['+currentTimestamp+']';

      const textBeforeCursor = textarea.value.substring(0, selectionStart);
      const textAfterCursor = textarea.value.substring(selectionEnd);
  
      const newText = textBeforeCursor + timestamp + textAfterCursor;
      textarea.value = newText;
  
      // Move the cursor to the end of the inserted timestamp
      textarea.selectionStart = textarea.selectionEnd = textBeforeCursor.length + timestamp.length;
    };

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
          // if (note.status === 1) {
            
          //   setNote(currentContext => ({ ...currentContext, ...{"status" : 7} }))
          //   console.log('encryption:' + encryptTextWithAES(note.content, key));
          // }

          //decryption
          if (note.status === 7) {
              var result = decryptWithAES(note.content, key);

              if (result.length === 0) {
                console.log('Wrong password gives empty result or malformed utf-8 data exception');
              
              } else {//Success decryption

                //TODO: PROBLEM - this line does not update textArea with decryption immediately, only after anoher keypress
                setNote(currentContext => ({ ...currentContext, ...{"content" : result} }));
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
      setNote(currentContext => ({ ...currentContext, ...{"key" : key} }))

      if (key.length !== 16) {
        console.log('password must contain exactly 16 characters');
        return;
      }

      if (note.decrypted) {
        console.log('Note already decrypted. Now you changing password for future updates');
        return;
      }

      var decrypted = note.content;
      
      try {
        decrypted = decryptWithAES(note.content, key);

        console.log('decrypted:'+decrypted);
        if (decrypted.length === 0) {
          console.log('not decrypted, message probably not encrypted yet. make sure you have set 16char key and update your note.');
          note.decrypted = true; //settting to true even if its not encrypted, to let it go through the condition in edit function
          return;
        }

        setNote(currentContext => ({ ...currentContext, ...{"content" : decrypted} })) //instead of updateContext  
        
        console.log('Message decrypted. Now when you change the input field key, you change the encryption password')
        setNote(currentContext => ({ ...currentContext, ...{"decrypted" : true} })) //instead of updateContext      
        
      } catch (error) {
        //Error: Malformed UTF-8 data - means wrong password
        // console.log(error.name);
        // console.log(error.message);
        if (error.message.startsWith('Malformed UTF-8 data')) {
          console.log('Password Incorrect');
        } else {
          console.log(error);
        }
        //setNote(currentContext => ({ ...currentContext, ...{"decrypted" : undefined} })) //instead of updateContext
      }
      
    }*/


    const handleTextAreaChange = (event) => {
       //check if content is encrypted, if encrypted then disable editting
      if (note && note.status === 7 && note.content.length > 0 && !isDecrypted) {
        console.log('Content needs to be Decrypted to be updated');
        return;
      }

      //!!!! DECRYPT CONTENT OF NOTE in note
      //this can be asynchronous, so cant rely on context being updated on time when updating note, better to use target value again below
      setNote(currentContext => ({ ...currentContext, ...{"content" : event.target.value} })) //instead of updateContext
      //!!!!      
      
      if (user.typingTimeout) {
        clearTimeout(user.typingTimeout);
      }
      
      user.typing = false;
      user.typingTimeout = setTimeout(() => {
        updateNote(event.target.value);  
      }, 1500);
  
  
    }

    // const getContentToDisplay = (note) => {
    //   if (note) {

    //     if (note.status === 7 && note.decrypted) return note.decrypted;

    //     return note.content;
    //   }
    //   return "";
    // }

    //newText is taken directly from textarea
    const updateNote = (newText) => {
    
      console.log('inside note update:'+note.status);
      //OK validation only for secured messages
      if (note.status === 7 && (!key || key.length != 16)) {
        console.log('Update Failed. Encryption key must have exactly 16 chars');
        return;
      }

      
      let noteToUpdate = {};

      //console.log('updating:'+noteToUpdate);
      //console.log('key from parent:'+this.props.authKee);
      //console.log('authKey::'+user.sign);
      noteToUpdate["id"] = note.id;
      noteToUpdate["userId"] = user.userId;
      noteToUpdate["title"] = note.title; //to be used in case its a first message and needs to be created
      noteToUpdate["sign"] = user.sign;
      noteToUpdate["secret"] = user.secret;
      noteToUpdate["address"] = user.address;
      noteToUpdate["name"] = "content"; 

   
      noteToUpdate["value"] = (note.status == 7 ? encryptTextWithAES(newText, key) : newText);
   
      
     
      if  (user.address) {
      
          setUser(currentContext => ({ ...currentContext, ...{"status" : "saving ..."} })) //instead of updateContext
          
          axios.put('https://syslang.io/rest/v1/notesSec', noteToUpdate)
          .then((res) => {
            setUser(currentContext => ({ ...currentContext, ...{"status" : ""} }))
            if (res.updatedId) setNote(currentContext => ({ ...currentContext, ...{"id" : res.updatedId} }))
            
            console.log('updatedId-->'+res.updatedId);
          })
          .catch((err) => {setUser(currentContext => ({ ...currentContext, ...{"status" : "failed :("} })); console.log("Error updating!!!",err)} );
          
      } else {
        console.log('Please Connect to keep your notes');
      }
    }

    const secure = async() => {
      setNote(currentContext => ({ ...currentContext, ...{"status" : 7} }));
      
      //need to set it again, cause the setNote is async
      note.status = 7;
      
      updateNote(note.content); 
      updateNoteParam(note.id, 'status', 7, user.sign); 
      
      toggleSecInput();
      setKey(null);
    }

    const unsecure = () => {
      console.log('unsecuring...');
      note.status = 1;
      updateNote(note.content);
      updateNoteParam(note.id, 'status', 1, user.sign); 
      toggleSecInput();
      setKey(null);
      setIsDecrypted(false);
    }
    
    const toggleSecInput = () => {
      setSecInput(!secInput);
    }
    
    const getSecIconName = () => {
      if (note && note.status === 7) return 'lock';
      if (note && note.status === 1) return 'no_encryption';
    }
    
    //separate useEffect just for key useState param - react sucks
    useEffect(() => {
      //console.log('useEffect::'+key);
      handle16KeyChange()
    }, [key]);
    //separate useEffect for key

    useEffect(() => {
      if (secInput) {
        //console.log('secInput:'+secInput);
        document.getElementById("secInputDiva").focus();
      }
    }, [secInput]);

    useEffect(() => {
      document.getElementById("txtar").focus();

      //textarea ident
      const textarea = document.querySelector('textarea');
      indentation.watch(textarea);
      //textarea  ident

      //console.log('CurrentX.useEffect()');
      
      // const fetchData = async () => {

      //   if (!note || !user.sign) return;
      //   let fullNoteObject = await getNote(note.id, user.sign); //TODO: sign lub secret!, a nie zawsze sign, bo secret masz gdy logujesz sie bez web3
      //   setNote(fullNoteObject);
      // }
      // fetchData();

    }, []);




    return (
        
      <div className="textarea-container" onKeyDown={handleKeyDownPressed}>
      {/*<div>id:{note ? note.id : ""}</div>*/}
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
        {/* <button onClick={insertTimestamp}>Insert Timestamp</button> */}
        <textarea  ref={textareaRef} id="txtar" value={note ? note.content : ""} onChange={handleTextAreaChange}  />
        

        <div className="absolute-pass">
         


          {/* UNSECURE */}
          {note && note.status === 7 && isDecrypted && secInput &&
            <div className="absolute-pass-ico-ok"  
               onClick={() => {unsecure()}}>
                  <span>Unsecure</span> </div> 
          }

          {/* SECURE */}
          {note && note.status === 1 && key && key.length === 16 && secInput &&
            <div className="absolute-pass-ico-ok"  
               onClick={() => {secure()}}>
                  <span>Secure</span> </div> 
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
                  <span className={note && note.status == 7 ?'material-icons-outlined nav-span' : 'material-icons-outlined nav-span'}>{getSecIconName()}</span></div> 

          {/* STATUS (TEST-ONLY) */}                
              
          {/* <div className="absolute-pass-ico">{note.status}, {key ? key.length : "0"}</div> */}

          


        </div>
        
      </div>

    )
}

export default CurrentX