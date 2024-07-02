import React, { useState, useEffect, useContext } from "react"
import { listenToMetamask, connectMetamaskSilently } from "./MetamaskX"
import Cookies from 'js-cookie'
import { fetchUserId, getNote, getNoteByIdx } from "./ApiAxios"
import { UserContext, NoteContext } from "./ProviderComponent";

const KeyHandlerX = ({children, setMenu, menu}) => {

  //to be able to call child component (CurX) function from here
  

  const [context, setContext] = useContext(UserContext);
  const [noteContext, setNoteContext] = useContext(NoteContext);

  //gdziekolwiek na ekranie nacisnieszcz klawisz, uruchomi sie ta funkcja
  const handleKeyDown = event => {
    //console.log(event.key);

    //ctrl-q to insert timestamp
    // if (menu.current && (event.key == 'q') && (event.ctrlKey)) {
    //   console.log('inserting timestamp JESLI menu == current ', event.key);
    //   childCurXRef.current.insertTimestamp();
    //   event.preventDefault();
    //   event.stopPropagation();
    //   //TODO: set 
    // }

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
      setMenu({ "current": true, "opener": false, "password" : false });
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