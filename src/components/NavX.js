import React, { useContext, useEffect, useState, useRef } from "react"
import fetchDataCall from './ApiAxios'
import Web3 from 'web3';
import ContentEditable from 'react-contenteditable'
import Cookies from 'js-cookie'
import { AppContext } from "./AppContext";


const NavX = () => {
    
    const [userData, setUserData] = useContext(AppContext);
    const [note, setNote] = useContext(AppContext);
    const [dummy, setDummy] = useContext(AppContext);

    //const contentEditableRef = useRef();

    const updateTitle = () => {
    }

    const export2 = () => {
    }

    const toggleLightMode = () => {
    }

    const toggleNote = () => {
      // setState({
      //   showNote: ! state.showNote
      // })
    }
    const menuTab = async(text) => {
      if (text == 'opener') setUserData({ "current": false, "opener": true }); 
      if (text == 'current') setUserData({ "current": true, "opener": false }); 
    }

    const shortenString = (str) => {
      //return str;
      return str.substring(0, 4)+'...'+str.substring((str.length-4), str.length);
    }





    useEffect(() => {
      //setDummy({"dummy": "lets see !" });
      console.log("[NAVX] useEffect:"+JSON.stringify(userData));
      const fetchData = async () => {
        let list = await fetchDataCall({});
        
        if (list && list.length > 0) { 
          let lastNote = list[list.length-1];

          setNote(lastNote); // this line removes the userData !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //setUserData(state => ({ ...state, "note": lastNote }));
        } 
        if (list === 'undefined') console.log('list is NULL !!!');

      };
  
      fetchData();
    }, []); //consider [userData]




    return (
          
      <div className="nav-bar">
      <div className="nav-container">
        <div className="nav-row">

        {note && note.title && <div className="nav-list" onClick={() => {menuTab('current');toggleNote()}} >
           <ContentEditable html={note.name+'.txt'} // innerHTML of the editable div
              disabled={false}       // use true to disable editing
              onChange={updateTitle}
              tagName='article' // Use a custom HTML tag (uses a div by default)
              className={userData.isDark ? 'btn tn-grayishb' : 'btn btn-grayish'}
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
        
        {<div className="nav-list" onClick={() => connectMetamask()}><span className={userData.isDark ? 'btn btn-grayish' : 'btn'}>{/*<span className='circle'></span>*/}{userData && userData.address && userData.address.length > 0 ? shortenString(userData.address): 'Connect'}</span></div>}
        


        {userData.saviStatus && <div className="nav-list"><span className='savingTextStyle'>{userData.saviStatus}</span></div>}

        <div className="nav-list"><span className="menu-label">cur:{userData.current} opener: {userData.opener} dummy: {userData.dummy}</span></div> 

      </div>
        {/* <div className="nav-list">{String(this.state.isDark)}</div> */}
      </div>
      </div>

    )
}

export default NavX