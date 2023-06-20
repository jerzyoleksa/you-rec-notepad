import React, { useState } from 'react';
import axios from 'axios';
import { decryptWithAES } from './EncryptAES';


const deleteNote = async (note) => {
  //const newNotesState = this.state.notes.filter((note) => note.id !== id );
  axios.delete('https://syslang.io/rest/v1/notes/'+note.id)
  .then(async function(response) {console.log(response);return response;})
  .catch((err) => console.log(err.response) );
}

const createNew = async (noteToCreate) => {
  axios.post('https://syslang.io/rest/v1/notes', noteToCreate) //dont put slash at the end of URL !!!!!!!!!!!
  .then(async function(response) {return response;})
  .catch((err) => console.log(err.response) );
}

const getUser = () =>
  new Promise((resolve, reject) => {
    if (!user) {
      return setTimeout(
        () => reject(new Error('User not found')),
        250
      );
    }

    setTimeout(() => resolve(Object.values(user)), 250);
});



//notes_user - id/sign/address
//notes - id/title/content/encrypted/userId/status/created/updated/viewed
//return new userId or better create new noteId if authey doesnt exist
const registerEthAddress = async (address, sign) => {

  //let key = '0xc5488fc117a44b56d9f9148e3312a4dc740d45dd34034b1323dc7edee00029597571fc81637fb6264d1f79ca59b224871240cca6ac4da695410051d1b0e448791b';
  let apiReturn = await axios
    .post('https://syslang.io/rest/v1/registerAddress', {'address' : address, 'sign': sign})
    .then(async function(response) {
      console.log('---> 2.registerEthAddress'+response.data);
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
    });
  
  return apiReturn;
};

const accessByKey = async (password) => {

  //let key = '0xc5488fc117a44b56d9f9148e3312a4dc740d45dd34034b1323dc7edee00029597571fc81637fb6264d1f79ca59b224871240cca6ac4da695410051d1b0e448791b';
  let apiReturn = await axios
    .post('https://syslang.io/rest/v1/accessByKey', {'accesskey' : password})
    .then(async function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
    });
  
  return apiReturn;
};

const getNote = async (id, sign) => {

  //let key = '0xc5488fc117a44b56d9f9148e3312a4dc740d45dd34034b1323dc7edee00029597571fc81637fb6264d1f79ca59b224871240cca6ac4da695410051d1b0e448791b';
  let apiReturn = await axios
    .post('https://syslang.io/rest/v1/note', {'id' : id, 'sign': sign})
    .then(async function(response) {
      let note = response.data;
      note.content = processContent(note); //decrypt if needed (if status === 7)
      console.log('ApiAxios.getNote() successfull');
      return note;
    })
    .catch(function(error) {
      console.log(error);
    });
  
  return apiReturn;
};

const getNoteByIdx = async (idx, sign) => {

  //let key = '0xc5488fc117a44b56d9f9148e3312a4dc740d45dd34034b1323dc7edee00029597571fc81637fb6264d1f79ca59b224871240cca6ac4da695410051d1b0e448791b';
  let apiReturn = await axios
    .post('https://syslang.io/rest/v1/getNoteByIdx', {'idx' : idx, 'sign': sign})
    .then(async function(response) {
      let note = response.data;
      note.content = processContent(note); //decrypt if needed (if status === 7)
      console.log('ApiAxios.getNote() successfull');
      return note;
    })
    .catch(function(error) {
      console.log(error);
    });
  
  return apiReturn;
};

const processContent = (note) => {
  let ecryptedText = note.content;
  console.log(note.status);
  //if (note.status === 7) {
  if (note.status === 100000) { //disables decryption basically

    console.log('77777777777777777777777777777'+ecryptedText);
    var decrypted = ecryptedText;
    try {
        decrypted = decryptWithAES(ecryptedText, '0123456789123456');       
    } catch (error) {
      console.log(error);
    }
    return decrypted;
  }
  return ecryptedText;
  
}

const fetchUserId = async (sign) => {
  //let key = '0xc5488fc117a44b56d9f9148e3312a4dc740d45dd34034b1323dc7edee00029597571fc81637fb6264d1f79ca59b224871240cca6ac4da695410051d1b0e448791b';
  let apiReturn = await axios
    .get('https://syslang.io/rest/v1/findUser/'+sign)
    .then(async function(response) {
      console.log("--->fetchUser");
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
    });
  
  return apiReturn;
};

const fetchDataCall = async (key) => {
  //let key = '0xc5488fc117a44b56d9f9148e3312a4dc740d45dd34034b1323dc7edee00029597571fc81637fb6264d1f79ca59b224871240cca6ac4da695410051d1b0e448791b';
  let apiReturn = await axios
    .post('https://syslang.io/rest/v1/notesSec', {'authKey': key})
    .then(async function(response) {
      console.log("--->fetchDataCall");
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
    });
  
  return apiReturn;
};

const updateNote = (note) => {
  console.log('updating note in parent!..');
  this.setState({ selectedNote: note });
  
  //-----now just send info to server that this note has been viewed
  let ddate = new Date().toISOString().split('.')[0];
  console.log('Date.now()::'+ddate);
  let noteUpdateStruct = {"id" : note.id};
  noteUpdateStruct["value"] = ddate;
  noteUpdateStruct["authKey"] = this.props.authKee;
  noteUpdateStruct["name"] = "viewed"; 
  
  axios.put('https://syslang.io/rest/v1/notes', noteUpdateStruct)
  .then((res) => {
  })
  .catch((err) => console.log("Error updating!!!",err) )
  //------
}

const updateNoteParam = async(id, name, value, sign) => {
  
  let noteUpdateStruct = {"id" : id};
  noteUpdateStruct["value"] = value;
  noteUpdateStruct["authKey"] = sign;
  noteUpdateStruct["name"] = name; 
  
  axios.put('https://syslang.io/rest/v1/notes', noteUpdateStruct)
  .then(async function(response) {console.log(response);return response;})
  .catch((err) => console.log(err.response) );
}

const exporto = async() => {
  axios.get('https://syslang.io/rest/v1/export')
  .then(async function(response) {console.log(response);return response;})
  .catch((err) => console.log(err.response) );
}

const updateTitleDB = (e, id) => {
  let noteToUpdate = {"id" : id};
  console.log("inside updateTitle:"+e.currentTarget.textContent);
  noteToUpdate["title"] = e.currentTarget.textContent;
  noteToUpdate["value"] = e.currentTarget.textContent;
  //noteToUpdate["authKey"] = this.props.authKee;
  noteToUpdate["name"] = "title"; 
  

  axios.put('https://syslang.io/rest/v1/notes', noteToUpdate)
  .then((res) => {
  })
  .catch((err) => console.log("Error updating!!!",err) );
}

export {getNoteByIdx, accessByKey, fetchDataCall, registerEthAddress, updateNote, fetchUserId, deleteNote, createNew, updateTitleDB, updateNoteParam, exporto, getNote}

/*
notes:

id; int(11)
title;  varchar(256)
content;  text
encrypted;  text
userId; int(11)
status; int(2)
created;  timestamp
updated;  timestamp
viewed; timestamp

select COLUMN_NAME, column_type from information_schema.columns WHERE TABLE_NAME = 'notes'
*/