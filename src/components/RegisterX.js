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

const RegisterX = ({ menu, setMenu, getNavXref, user, loginWithCookies}) => {

    const confirm = () => {
      console.log('inside updateCredo');
      setMenu({ "current": true, "opener": false, "password" : false, "loginPage" : false, "registerConfirm": true });
    }

   




    useEffect(() => {
      console.log('useEffect in RegisterX')
    }, []);

    
    return (
        
 
      <div>
        <div className="title-3">Please store your generated secret for future reference</div>
        <div id="inp2016" suppressContentEditableWarning={true} contentEditable="false" className="pass-input">{user.secret}</div>
        <div id="auth-but" onClick={() => confirm()}><span className="btn btn-framed">Confirm</span></div>
      </div>
                      
    )
}

export default RegisterX