import React, { Component, useContext, useEffect, useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import List from './components/List';
import Note from './components/Note';
import Current from './components/Current';
import Opener from './components/Opener';
import axios from 'axios';
import urlFor from './helpers/urlFor';
import Flash from './components/Flash';
import { AppContext, AppProvider } from "./components/AppContext";
import Child1 from './components/Child1';
import Child2 from './components/Child2';
import NavX from './components/NavX';
import CurrentX from './components/CurrentX';
import OpenerX from './components/OpenerX';
import Metamask from './components/Metamask';
import {UserContext, ProviderComponent} from './components/ProviderComponent';


const MenuState = {
  "current" : true,
  "opener" : false
}



const AppZ = () => {
  const [menu, setMenu] = useState(MenuState)

    // useEffect(() => {
      
    //   console.log("[AppZ] useEffect:");
     
    // }, [address]);

    return (
      <ProviderComponent>
      <div className="rootDiv">
        
        <NavX menu={menu} setMenu={setMenu}/>
        {menu.current && <CurrentX/> }  
        {menu.opener && <OpenerX menu={menu} setMenu={setMenu}/>}
        {/* <Child1 />
        <Child2 /> */}
        <Metamask />
    
      </div>
      </ProviderComponent>
    )
}

export default AppZ


