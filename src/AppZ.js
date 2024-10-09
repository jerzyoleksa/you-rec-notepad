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
// import {UserContext, ProviderComponent} from './components/ProviderComponent';
import { KeyHandlerX } from './components/KeyHandlerX';
import Cookies from 'js-cookie';
import { fetchUserSec, fetchNoteSec, fetchListCall } from './components/ApiAxios';

const MenuState = {
  "current" : true,
  "opener" : false,
  "password" : false,
  "loginPage" : false
}

const userObject = {
  name: "John Snow",
  content: "kwuegfoiqwgf",
  email: "john.snow@thewall.north",
  status: "",
  typing: false,
  typingTimeout: 0,
  address: null,
  sign: null,
  userId : null,
  isDark : null, //loadIsDark(),
  updateStatus: null, //functionTemplate,
  updateAddress: null //functionTemplate
}

const noteObject = {
  name: "",
  content: "",
  title: null
}

const AppZ = () => {
  const [menu, setMenu] = useState(MenuState)
  const [note, setNote] = useState(noteObject)
  const [user, setUser] = useState(userObject)
  const [notes, setNotes] = useState([]);

  const ref1 = useRef();



  /** -------------- Main Login function ----------------------------------------------------- */
  const loginWithCookies = async () => {
    let secret = Cookies.get('syslang-secret');
    let sign = Cookies.get('syslang-sign');
    
    //need this for child componenets using user object
    setUser(currentContext => ({ ...currentContext, ...{"sign": sign,"secret": secret} })); 


    if (!secret && !sign) return;

    const fetchNote = async () => {
      let note = await fetchNoteSec(sign, secret);
      setNote(note);
    }

    const fetchList = async () => {
      let list = await fetchListCall(sign, secret);
      setNotes(list);
    };

    const fetchUser = async () => {
      let userObj = await fetchUserSec(sign, secret);
      setUser(currentContext => ({ ...currentContext, ...{"id": userObj.id, "address": userObj.address} })); 

      //!!!!!!! to ponizej nie dzialalao, wiec zastapilem setUser jak u gory
      // user.id = userObj.id
      // user.address = userObj.address
    };


    fetchUser();
    fetchList();
    fetchNote();
    setMenu({ "current": true, "opener": false, "password" : false });
  }
  /** -------------- Main Login function end ------------------------------------------------------ */



    useEffect(() => {    
      loginWithCookies();
    }, []);

    return (
   
      <div className="rootDiv">   
        <NavX menu={menu} setMenu={setMenu} ref = {ref1} user={user} note={note} setUser={setUser} setNote={setNote} loginWithCookies={loginWithCookies}/>
        {menu.current && <CurrentX user={user} note={note} setNote={setNote} setUser={setUser}/> }  
        {menu.opener && <OpenerX menu={menu} setMenu={setMenu} user={user} note={note} setNote={setNote} setUser={setUser} notes={notes} setNotes={setNotes}/>}
        {menu.password && <CredsX setMenu={setMenu} setUser={setUser} loginWithCookies={loginWithCookies}/>}
        {menu.loginPage && <LoginPageX setMenu={setMenu} getNavXref = {ref1} setUser={setUser} loginWithCookies={loginWithCookies}/>}
        {/* <BottomFixedMenuX setMenu={setMenu}/> */}
        {/* <Child1 />
        <Child2 /> */}
        {/* <div>{notes && notes.length > 0 && notes[0].title}</div> */}
      </div>
   
    )
}

export default AppZ


