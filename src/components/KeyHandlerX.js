import React, { useState, useEffect, useContext } from "react"
import { listenToMetamask, connectMetamaskSilently } from "./MetamaskX"
import Cookies from 'js-cookie'
import { fetchUserId, getNote, getNoteByIdx } from "./ApiAxios"
import { UserContext, NoteContext } from "./ProviderComponent";


const KeyHandlerX = ({children}) => {

  
  const [context, setContext] = useContext(UserContext);
  const [noteContext, setNoteContext] = useContext(NoteContext);

  const handleKeyDown = event => {
    if ((event.key >= 0 && event.key <= 9) && (event.ctrlKey)) {
      event.preventDefault();
      event.stopPropagation();
      openNoteByIndex(event.key);
    }
  };

  const openNoteByIndex = async(idx) => {
      let fullNoteObject = await getNoteByIdx(idx, context.sign);
      setNoteContext(fullNoteObject); // this line removes the userData !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //menuTab('current');
  }


  useEffect(() => {
    
  }, []);


  //does value have to match how we later useContext, say const[context, setContext] ?, then below will be wrong
  //moreover it seems that provider can populate only one Context, below it is UserContext
  return (
  //<div value={[noteContext, setNoteContext]}>
  <div tabIndex={0} onKeyDown={handleKeyDown} className="keyDownDiv">   
    {children}
  </div>
  )
}

export { KeyHandlerX };