import React, { useContext, useEffect, useState, useRef } from "react"
import {exporto, fetchDataCall} from './ApiAxios'
import Web3 from 'web3';
import ContentEditable from 'react-contenteditable'
import Cookies from 'js-cookie'
import { UserContext, NoteContext } from "./ProviderComponent";
//import connectMetamask from "./Metamask";
import { connectMetamask } from "./MetamaskX";
import { registerEthAddress } from "./ApiAxios";

const NavX = ({ menu, setMenu }) => {
    
    const [context, setContext] = useContext(UserContext);
    const [noteContext, setNoteContext] = useContext(NoteContext);
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

    const toggleLightMode = () => {
    
        if (context.isDark) {
          document.body.style.backgroundColor = "white";
          document.body.style.color = "black";
          document.getElementsByClassName("nav-bar").backgroundColor = "red";
          document.getElementsByClassName("nav-container").backgroundColor = "orange";
          
        }
        else {
          document.body.style.backgroundColor = "rgb(51,51,51)";
          document.body.style.color = "white";
          document.getElementsByClassName("nav-bar").backgroundColor = "red";
          document.getElementsByClassName("nav-container").backgroundColor = "orange";
          
        }
    
        setContext(currentContext => ({ ...currentContext, ...{isDark : !context.isDark} }));    
    }


    const toggleNote = () => {
      // setState({
      //   showNote: ! state.showNote
      // })
    }
    const menuTab = async(text) => {
      console.log("menuTab...")
      if (text == 'opener') setMenu({ "current": false, "opener": true });
      if (text == 'current') setMenu({ "current": true, "opener": false });
    }

    const shortenString = (str) => {
      //return str;
      return str.substring(0, 4)+'...'+str.substring((str.length-4), str.length);
    }

    const clickConnect = async() => {

      
    
      const meta = async () => {

        let result = await connectMetamask();

        if (!result) {console.log('No Metamask detected...'); return;}
        Cookies.set(result.publicAddress, result.signature);
        console.log(result);

        let result2 = await registerEthAddress(result.publicAddress, result.signature);  
        console.log(result2);

      };

      meta();

    }





    useEffect(() => {
      //setDummy({"dummy": "lets see !" });
      //console.log("[NAVX] useEffect:"+JSON.stringify(userData));
      console.log("NavX -> useEffect "+context.sign);
      
      if (!context.sign) return;

      const fetchData = async () => {
        let list = await fetchDataCall(context.sign);
        
        if (list && list.length > 0) { 
          let lastNote = list[list.length-1];

          //setContext(currentContext => ({ ...currentContext, ...{"address" : sigKey} })) //instead of updateContext
            
          setNoteContext(lastNote); // this line removes the userData !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //setUserData(state => ({ ...state, "note": lastNote }));
        } 
      

      };
  
      fetchData();
    }, [context.sign]); //rerender NavX every time user is changed (sign param is changed)




    return (
          
      <div className={(context.isDark ? 'nav-bar-dark' : 'nav-bar-light')}>
      <div className="nav-container">
        <div className="nav-row">
        {noteContext && <div className="nav-list" onClick={() => {menuTab('current');toggleNote()}} >
           <ContentEditable html={noteContext.title ? noteContext.title+'.txt' : "Untitled.txt"} // innerHTML of the editable div
              disabled={true}       // use true to disable editing
              tagName='article' // Use a custom HTML tag (uses a div by default)
              className="btn btn-grayish"
            />
        </div>}  
        
        <div className="nav-list" onClick={() => menuTab('opener')} ><span className="menu-label">Notes</span></div>
       
        
        
        <div className="nav-list" onClick={() => export2()}><span className="menu-label">Export</span></div> 
        <div className="nav-list" onClick={() => toggleLightMode()}><span className="material-icons-outlined nav-span">wb_sunny</span></div> 
                
        {/*<div className="nav-list" onClick={() => this.connectMetamask()}><span class="material-icons-outlined">account_circle</span></div> 
        */}
        {/*
        <div className="nav-list" onClick={() => this.connectMetamask()}><img src="img/mm.svg" width="24" height="24"/></div> 
        */}
        
        {<div className="nav-list" onClick={() => clickConnect()}><span className='btn'>{/*<span className='circle'></span>*/}{context.address && context.address.length > 0 ? shortenString(context.address): 'Connect'}</span></div>}
        


        {context.status && <div className="nav-list"><span className='savingTextStyle'>{context.status}</span></div>}

      </div>
        {/* <div className="nav-list">{String(this.state.isDark)}</div> */}
      </div>
      </div>

    )
}

export default NavX