import React, { useContext, useEffect, useuserData, useRef, useState, forwardRef } from "react"
import {accessByKey, deleteNote, fetchDataCall, getNote, updateNote, updateNoteParam, updateTitleDB} from './ApiAxios'
import Web3 from 'web3';
import ContentEditable from 'react-contenteditable'
import { UserContext, NoteContext } from "./ProviderComponent";
import axios from 'axios'
import { decryptWithAES } from "./EncryptAES";
import Cookies from 'js-cookie'

const LoginPageX = ({ menu, setMenu, getNavXref}) => {
    const [context, setContext] = useContext(UserContext);
    const [noteContext, setNoteContext] = useContext(NoteContext);
    const [notes, setNotes] = useState([]);
    const [merge1, setMerge1] = useState(-1);
    const [merge2, setMerge2] = useState(-1);
    const [credo, setCredo] = useState("");
    const refs = useRef({});
    refs.current = []; // or an {}



    const action1 = () => {
      console.log('inside updateCredo');
      getNavXref.current.clickConnect();
      setMenu({ "current": true, "opener": false, "password" : false, "loginPage" : false });
    }

    useEffect(() => {
      console.log('useEffect in LoginPageX')
    }, []);

    
    return (
        
      <div className="login-table">
        <div onClick={() => action1()} className="login-option"><span className="btn btn-framed-100">web3</span></div>
        <div onClick={() => action1()} className="login-option"><span className="btn btn-framed-100">login</span></div>
        <div onClick={() => action1()} className="login-option"><span className="btn btn-framed-100">register</span></div>
        <div onClick={() => action1()} className="login-option"><span className="btn btn-framed-100">google</span></div>
      </div>
                      

    )
}

export default LoginPageX