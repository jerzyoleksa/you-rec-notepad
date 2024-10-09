import React, { useContext, useEffect, useuserData, useRef, useState, forwardRef } from "react"
import {accessByKey, deleteNote, getNote, updateNote, updateNoteParam, updateTitleDB} from './ApiAxios'
import Web3 from 'web3';
import ContentEditable from 'react-contenteditable'
//import { UserContext, NoteContext } from "./ProviderComponent";
import axios from 'axios'
import { decryptWithAES } from "./EncryptAES";
import Cookies from 'js-cookie'
import { registerSecret } from "./ApiAxios";
import logo from './google_logo.png';
import logo2 from './metamask.png';

const LoginPageX = ({ menu, setMenu, getNavXref, setUser, loginWithCookies}) => {
    //const [context, setContext] = useContext(UserContext);
    //const [noteContext, setNoteContext] = useContext(NoteContext);
    //const [notes, setNotes] = useState([]);

    // const refs = useRef({});
    // refs.current = []; // or an {}
    const action4 = () => {
      console.log('action4');
    }

    const action3 = () => {
      console.log('inside updateCredo');
      setMenu({ "loginPage" : false, "current": false, "opener": false, "password" : true });
    }

    const action1 = () => {
      console.log('inside updateCredo');
      getNavXref.current.clickConnect();
      setMenu({ "current": true, "opener": false, "password" : false, "loginPage" : false });
    }

    const action2 = async() => {
      const uuid = crypto.randomUUID();
      const addressGenerated = "User"+Date.now();
      let result2 = await registerSecret(addressGenerated, uuid);  //registerSecret and CreateFirstMessage
      Cookies.set('syslang-secret', uuid, { expires: 365 });
      loginWithCookies();
      
      //let userId = result2.userId
      //let address = result2.address
      //setUser(currentContext => ({ ...currentContext, ...{"secret" : uuid, "address" : uuid, "userId" : userId} })); 
      //setMenu({ "current": true, "opener": false, "password" : false, "loginPage" : false });
      
    }




    useEffect(() => {
      console.log('useEffect in LoginPageX')
    }, []);

    
    return (
        
 
      <div className="login-table">
        <div onClick={() => action3()} className="login-option">Login</div>
        <div onClick={() => action2()} className="login-option">Register</div>
        <div onClick={() => action1()} className="login-option"><img src={logo2} className="logo-icon"/>Web3</div>
        <div onClick={() => action1()} className="login-option">
        {/* <button class="logo-btn"><img src="{logo}" className="logo-icon" />Sign Up with Google</button> */}
        <img src={logo} className="logo-icon"/><span>Google</span> 
        </div>
        {/* <div onClick={() => action1()} className="login-option">
          <button type="button" className="logo-btn1"><img src="{logo}" className=""/>Sign Up with Google</button>
        </div> */}
      </div>
                      
    )
}

export default LoginPageX