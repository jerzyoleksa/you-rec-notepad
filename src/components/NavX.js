import React, { useContext, useEffect, useState, useRef } from "react"
import {exporto, fetchDataCall, getNote} from './ApiAxios'
import Web3 from 'web3';
import ContentEditable from 'react-contenteditable'
import Cookies from 'js-cookie'
import { UserContext, NoteContext } from "./ProviderComponent";
//import connectMetamask from "./Metamask";
import { connectMetamask } from "./MetamaskX";
import { registerEthAddress } from "./ApiAxios";
import { decryptWithAES } from "./EncryptAES";

const NavX = ({ menu, setMenu }) => {

    const [context, setContext] = useContext(UserContext);
    const [noteContext, setNoteContext] = useContext(NoteContext);
    const [hamburger, setHamburger] = useState(false);
    const [notes, setNotes] = useState([]); /* keeps notes in locally in NavX component, [!] separate to notes kept in Opener */
    //const [note, setNote] = useContext(UserContext);
    //const [dummy, setDummy] = useContext(UserContext);

    //const contentEditableRef = useRef();

    // const updateTitle = () => {
    // }
   
    const export2 = async () => {
      setContext(currentContext => ({ ...currentContext, ...{"status" : "exporting..."} }));
      let resp = await exporto();
      setContext(currentContext => ({ ...currentContext, ...{"status" : "exported :)"} }));

      setTimeout(function () {
        setContext(currentContext => ({ ...currentContext, ...{"status" : ""} }));
      }, 1000)
    }

    const setCssBodyByMode = (isDark) => {
    

      //if (context.isDark) returns true even is isDark is false !!!!!!!!!!!!!!!!!!!!!!!!!
      if (isDark === true) {
        console.log('setting background to rgb(51,51,51)');
        document.body.style.backgroundColor = "rgb(51,51,51)";
        document.body.style.color = "white";
        
      } else {
        console.log('setting background to white');
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
      }

    }

    const toggleLightMode = async () => {
      
      let oldValue = (context.isDark === undefined || context.isDark === false) ? false : true;
      let newValue = !context.isDark;
      console.log('oldValue:'+oldValue);
      console.log('newValue:'+newValue);
      console.log('toggleLightMode BEFORE:'+oldValue);
      console.log('toggleLightMode AFTER:'+newValue);

      //SWITCH isDark flag in context
      setContext(currentContext => ({ ...currentContext, ...{"isDark" : newValue} }));  
      
      setCssBodyByMode(newValue);

      Cookies.set("isDark", newValue); 
        
       
    }
    
    const clickHamburger = () => {
      setHamburger(!hamburger);
    }

    const closeHamburger = () => {
      setHamburger(false);
    }

    const shuffleNote = async() => {
      //console.log('shuffling');
      let nId = notes[Math.floor(Math.random()*notes.length)].id;
      //console.log('nId:'+nId);
      let fullNoteObject = await getNote(nId, context.sign);
      setNoteContext(fullNoteObject); // this line removes the userData !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      menuTab('current')
    }

    const nextNote = async() => {
      //console.log('shuffling');
      let currIdx = notes.findIndex(x => x.id === noteContext.id);
      var nextIdx = currIdx + 1;
      if (nextIdx > notes.length - 1) nextIdx = 0;
      console.log("nextIdx:"+nextIdx);
      let nextId = notes[nextIdx].id;
      console.log("nextId:"+nextId);
     
      //console.log('nId:'+nId);
      let fullNoteObject = await getNote(nextId, context.sign);
      setNoteContext(fullNoteObject); // this line removes the userData !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      menuTab('current')
    }

    const logout = () => {
 
      //TODO: removing cookie below, still lets you autologin on the browser refresh
      Cookies.remove(context.address);

      setContext(currentContext => ({ ...currentContext, ...{  "address": null, "sign": null, "userId" : null} })); 
     
      setNoteContext(null);

      //when logout - always move to 'current' tab
      menuTab('current')
      
      //In Cookies we keep a cookie with a name=address and value=sign !
      
    }
    const menuTab = async(text) => {
      closeHamburger();
      console.log("menuTab...")
      if (text == 'opener') setMenu({ "current": false, "opener": true });
      if (text == 'current') setMenu({ "current": true, "opener": false });
    }

    const shortenString = (str) => {
      //return str;
      return str.substring(0, 4)+'...'+str.substring((str.length-4), str.length);
    }

   

    const clickConnect = async() => {

      /* just in case someone clicks connect while hamburger menu is open */
      closeHamburger();

      //if there is no metamask installed, then open a page where user can input the string
      if (!window.ethereum) {
        console.log('NO METAMASK !');
        setMenu({ "current": false, "opener": false, "password" : true });
      }


      //metamask function
      const meta = async () => {

        let result = await connectMetamask();

        if (!result) {console.log('No Metamask detected...'); return;}
        
        Cookies.set(result.publicAddress, result.signature);
        console.log(result);

        let result2 = await registerEthAddress(result.publicAddress, result.signature);  
        console.log('result2 below:');
        console.log(result2);
        let uid = result2.newId;
        setContext(currentContext => ({ ...currentContext, ...{"address" : result.publicAddress, "sign" : result.signature, "userId" : uid} })) //instead of updateContext
        
      };

      //call metamask
      meta();

    }


    



    useEffect(() => {
      
    
      // return () => {
      //   document.removeEventListener('keyup', handlekeydownEvent)
      // }

      setCssBodyByMode(context.isDark === true);
      //setDummy({"dummy": "lets see !" });
      //console.log("[NAVX] useEffect:"+JSON.stringify(userData));
      console.log("NavX -> useEffect "+context.sign);
      
      if (!context.sign) return;

      const fetchData = async () => {
        let list = await fetchDataCall(context.sign);
        console.log('now will be setting notes in useState:'+list);

        setNotes(list);

        if (list && list.length > 0) { 
          let lastNote = list[list.length-1];

          let fullNoteObject = await getNote(lastNote.id, context.sign);
         
          setNoteContext(fullNoteObject); // this line removes the userData !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //setUserData(state => ({ ...state, "note": lastNote }));
        } 
      

      };
  
      fetchData();



      // Add Key Listener to captur CTRL + <0..9> events
      // function handlekeydownEvent(event) {
      //   const { key, keyCode } = event;
      //   if ((window.event.keyCode >= 48 && window.event.keyCode <= 57) && (window.event.ctrlKey)) {
      //     event.preventDefault();
      //     event.stopPropagation();
        
      //     let no = keyCode - 48;
         
      //     console.log('ctrl+' + no);
      //     console.log('notes in listener:-' + notesRef);
      //     openNoteByIndex(no);
      //   }
        
      // }
      

      //keept it for knowing
      
      //window.addEventListener('keydown', handlekeydownEvent)
      // end of listener


    }, [context.sign]); //rerender NavX every time user is changed (sign param is changed)




    return (
          
      <div className={(context.isDark ? 'nav-bar-dark' : 'nav-bar-light')}>
      <div className="nav-container">
        <div className="nav-row">
        
        
        {/* Textfile title */}
        {noteContext && 
        <div className="nav-list" onClick={() => {menuTab('current');}} >
           <ContentEditable html={noteContext.title ? noteContext.title+'.txt' : "Untitled.txt"} // innerHTML of the editable div
              disabled={true}       // use true to disable editing
              tagName='article' // Use a custom HTML tag (uses a div by default)
              className="btn btn-grayish"
            />
            
        

        </div>}  
        
        {false && noteContext && 
  
            <div className="nav-list">
              <span onClick={() => nextNote()} className="material-icons-outlined nav-span">repeat</span>
            </div>

        }  
        <div className="nav-list menu-large" onClick={() => menuTab('opener')} ><span className="menu-label">Notes</span></div>
        <div className="nav-list menu-large" onClick={() => export2()}><span className="menu-label">Export</span></div> 


        <div className="nav-list menu-large" onClick={() => toggleLightMode()}><span className="material-icons-outlined nav-span">wb_sunny</span></div> 
                
        {/*<div className="nav-list" onClick={() => this.connectMetamask()}><span class="material-icons-outlined">account_circle</span></div> 
        */}
        {/*
        <div className="nav-list" onClick={() => this.connectMetamask()}><img src="img/mm.svg" width="24" height="24"/></div> 
        */}
        
        {<div className="nav-list" onClick={() => clickConnect()}><span className='btn'>{/*<span className='circle'></span>*/}{context.address && context.address.length > 0 ? shortenString(context.address): 'Connect'}</span></div>}
        
        <div className="nav-list menu-icon ham-icon" onClick={() => clickHamburger()}>
            {!hamburger && <span className="material-icons-outlined nav-span">menu</span>}
            {hamburger && <span className="material-icons-outlined nav-span">close</span>}
        </div> 
        


        {/*  ------------------ HAMBURGER MENU ---------------------- */}
        {hamburger &&
        <div className={context.isDark ? "hamburgerMenu light-mode-dark" : "hamburgerMenu light-mode-light"}>
          <div onClick={() => {closeHamburger();menuTab('opener')}} ><span className="menu-label">Notes</span></div>
          <div onClick={() => export2()}><span className="menu-label">Export</span></div>
          {context.address && context.address.length > 0 && <div onClick={() => {closeHamburger();logout()}}>
              <span className="menu-label">Logout</span>
              {/* <span className="material-icons-outlined nav-span">logout</span> */}
          </div>}
          <div onClick={() => toggleLightMode()}><span className="menu-label">Switch Light</span></div> 
        </div>
        }
        {/*  ------------------ HAMBURGER MENU ---------------------- */}



        {context.address && context.address.length > 0 && <div className="nav-list menu-large" onClick={() => logout()}><span className="material-icons-outlined nav-span">logout</span></div>}

        {context.status && <div className="nav-list"><span className='savingTextStyle'>{context.status}</span></div>}

      </div>
        {/* <div className="nav-list">{String(this.state.isDark)}</div> */}
      </div>
      </div>

    )
}

export default NavX