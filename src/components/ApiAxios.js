import React, { useState } from 'react';
import axios from 'axios';


const deleteNote = async (note) => {
  //const newNotesState = this.state.notes.filter((note) => note.id !== id );
  axios.delete('https://frengly.com/ai/notes/'+note.id)
  .then(async function(response) {console.log(response);return response;})
  .catch((err) => console.log(err.response) );
}

const createNew = async (noteToCreate) => {
  axios.post('https://frengly.com/ai/notes', noteToCreate) //dont put slash at the end of URL !!!!!!!!!!!
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
    .post('https://frengly.com/ai/registerAddress', {'address' : address, 'sign': sign})
    .then(async function(response) {
      console.log('---> 2.registerEthAddress'+response.data);
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
    });
  
  return apiReturn;
};

const fetchUserId = async (sign) => {
  //let key = '0xc5488fc117a44b56d9f9148e3312a4dc740d45dd34034b1323dc7edee00029597571fc81637fb6264d1f79ca59b224871240cca6ac4da695410051d1b0e448791b';
  let apiReturn = await axios
    .get('https://frengly.com/ai/findUser/'+sign)
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
    .post('https://frengly.com/ai/notesSec', {'authKey': key})
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
  
  axios.put('https://frengly.com/ai/notes', noteUpdateStruct)
  .then((res) => {
  })
  .catch((err) => console.log("Error updating!!!",err) )
  //------
}

const updateTitle = (event, id) => {
  let noteToUpdate = {"id" : id};
  console.log("inside updateTitle:"+event.target.value);
  noteToUpdate["title"] = event.target.value;
  noteToUpdate["value"] = event.target.value;
  //noteToUpdate["authKey"] = this.props.authKee;
  noteToUpdate["name"] = "title"; 
  

  axios.put('https://frengly.com/ai/notes', noteToUpdate)
  .then((res) => {
  })
  .catch((err) => console.log("Error updating!!!",err) );
}

export {fetchDataCall, registerEthAddress, updateNote, fetchUserId, deleteNote, createNew, updateTitle}