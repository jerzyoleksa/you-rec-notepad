import React, { Component, useContext } from 'react';
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






const AppZ = () => {
    const { current, opener, email } = useContext(UserContext)
    return (
      <ProviderComponent>
      <div className="rootDiv">
        
        <NavX />
        {current && <CurrentX/> }  
        {opener && <OpenerX/>}
        {/* <Child1 />
        <Child2 /> */}
        <Metamask />
        <div>curr:::{current? "true" : "false"}</div>
      </div>
      </ProviderComponent>
    )
}

export default AppZ


