import React, { useState, useEffect } from "react"
import fetchDataCall from "./ApiAxios"


const functionTemplate = () => {}

const userObjectContext = {
  name: "John Snow",
  content: "kwuegfoiqwgf",
  email: "john.snow@thewall.north",
  status: "Winter is coming",
  current: true,
  opener: false,
  updateStatus: functionTemplate
}

const noteObjectContext = {
  name: "John Snow",
  content: "kwuegfoiqwgf",
  title: "john.snow@thewall.north",
  status: "Winter is coming",
  current: true,
  opener: false,
  saviStatus: ""
}

const UserContext = React.createContext(userObjectContext)
const NoteContext = React.createContext(noteObjectContext)



let users = [
  { name: 'Robin',
    email: 'wieruch@gmail.com',
    status: 'ready',
  },
  {
 
    name: 'Dave',
    email: 'davdis@gmail.com',
    status: 'sleeping',
  }
];

const getUsers = () =>
  new Promise((resolve, reject) => {
    if (!users) {
      return setTimeout(
        () => reject(new Error('Users not found')),
        250
      );
    }

    setTimeout(() => resolve(Object.values(users)), 250);
});


getUsers()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

// usage (2)
const doGetUsers = async () => {
  try {
    const result = await getUsers();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};


const fetchUser = async () => {
  try {
    const res = await doGetUsers();
    return res;
    //return res.json()
  } catch (e) {
    console.error(e)
    return {
      name: "Not found",
      email: "Not found",
      status: "Not found"
    }
  }
}

const ProviderComponent = ({children}) => {
  const [context, setContext] = useState(userObjectContext)
  const [noteContext, setNoteContext] = useState(noteObjectContext)

  const updateContext = (contextUpdates = {}) =>
    setContext(currentContext => ({ ...currentContext, ...contextUpdates }))

  useEffect(() => {
    const populateContext = (contextUpdates = {}) =>
      setContext(currentContext => ({ ...currentContext, ...contextUpdates }))
      
      
      async function fetchData0() {
        const user = await fetchUser()
        populateContext(user)
      }

     async function fetchData() {
       const list = await fetchDataCall();
       if (list.length > 0) { 
        let lastNote = list[list.length-1];
        console.log(lastNote);
        //setContext({"address" : "1231"});
        //setNote(lastNote); // this line removes the userData !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //setUserData(state => ({ ...state, "note": lastNote }));
         
       populateContext(lastNote)
       //updateNote(lastNote);
      }
     }
    fetchData0()
    fetchData()
    doGetUsers()
  }, [])

  useEffect(() => {
    if (context?.updateStatus === functionTemplate) {
      
      updateContext({
        updateStatus: value => {updateStatus({ status: value });console.log('!!!!!!! updateNote'+value);},
      })
    }
  }, [context?.updateStatus])

  return <UserContext.Provider value={[context, noteContext]}>{children}</UserContext.Provider>
}

export { UserContext, NoteContext, ProviderComponent };