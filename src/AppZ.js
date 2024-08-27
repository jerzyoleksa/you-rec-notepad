import React, { Component, useContext, useEffect, useState, useRef } from 'react';
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
import CredsX from './components/CredsX';
import LoginPageX from './components/LoginPageX';
import BottomFixedMenuX from './components/BottomFixedMenuX';
import {UserContext, ProviderComponent} from './components/ProviderComponent';
import { KeyHandlerX } from './components/KeyHandlerX';


const MenuState = {
  "current" : true,
  "opener" : false,
  "password" : false,
  "loginPage" : false
}



const AppZ = () => {
  const [menu, setMenu] = useState(MenuState)
  const ref1 = useRef();
    // useEffect(() => {
      
    //   console.log("[AppZ] useEffect:");
     
    // }, [address]);

    return (
      <ProviderComponent>
      {/*<KeyHandlerX setMenu={setMenu} menu={menu}>  */}
      <div className="rootDiv">
      
        <NavX menu={menu} setMenu={setMenu} ref = {ref1}/>
        {menu.current && <CurrentX/> }  
        {menu.opener && <OpenerX menu={menu} setMenu={setMenu}/>}
        {menu.password && <CredsX setMenu={setMenu}/>}
        {menu.loginPage && <LoginPageX setMenu={setMenu} getNavXref = {ref1} />}
        {/* <BottomFixedMenuX setMenu={setMenu}/> */}
        {/* <Child1 />
        <Child2 /> */}
       
      </div>
      {/*</KeyHandlerX >*/}
      </ProviderComponent>
    )
}

export default AppZ


