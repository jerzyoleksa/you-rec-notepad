import React, { useState, useEffect } from "react"
import { listenToMetamask, connectMetamaskSilently } from "./MetamaskX"
import Cookies from 'js-cookie'
import { fetchUserId } from "./ApiAxios"

const functionTemplate = () => {}

//Cannot access 'loadIsDark' before initialization
const loadIsDark = () => {
  let initValue = Cookies.get("isDark");

  let result = (initValue === undefined || initValue === "false") ?  false :  true; 
  console.log("isDark -> cookie initValue:"+initValue + " of type "+typeof initValue);
  console.log("loadIsDark will return "+result);
  return result;
}

const userObjectContext = {
  name: "John Snow",
  content: "kwuegfoiqwgf",
  email: "john.snow@thewall.north",
  status: "",
  typing: false,
  typingTimeout: 0,
  address: null,
  sign: null,
  userId : null,
  isDark : loadIsDark(),
  updateStatus: functionTemplate,
  updateAddress: functionTemplate
}

const noteObjectContext = {
  name: "",
  content: "",
  title: null
}



const UserContext = React.createContext(userObjectContext)
const NoteContext = React.createContext(noteObjectContext)

const ProviderComponent = ({children}) => {
  const [context, setContext] = useState(userObjectContext)
  const [noteContext, setNoteContext] = useState(noteObjectContext)

  useEffect(() => {
    console.log("isDark, Cookies: "+Cookies.get("isDark")+", userContext: "+context.isDark);
    listenToMetamask();
    
    const fetchData = async () => {
        
        let accounts1 = await connectMetamaskSilently({});
        if (!accounts1) return;
        
        let sign = Cookies.get(accounts1[0]);
       
        //TODO:
        //api to server to get userId by address and sign, and set userId in context
        let userResult = await fetchUserId(sign);
        //console.log('userResult--->'+userResult.userId);
        let userId = userResult ? userResult.userId : null;

        setContext(currentContext => ({ ...currentContext, ...{"address" : accounts1[0], "sign" : sign, "userId" : userId} })) //instead of updateContext
        
      };
  
      fetchData();

  }, []);


  //does value have to match how we later useContext, say const[context, setContext] ?, then below will be wrong
  //moreover it seems that provider can populate only one Context, below it is UserContext
  return (
  <UserContext.Provider value={[context, setContext]}>
    <NoteContext.Provider value={[noteContext, setNoteContext]}>
    {children}
    </NoteContext.Provider>
  </UserContext.Provider>
  )
}

export { UserContext, NoteContext, ProviderComponent };