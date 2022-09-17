import React, { useState, useEffect } from "react"

const functionTemplate = () => {}

const userObjectContext = {
  name: "John Snow",
  content: "kwuegfoiqwgf",
  email: "john.snow@thewall.north",
  status: "",
  typing: false,
  typingTimeout: 0,
  address: null,
  sign: null,
  updateStatus: functionTemplate,
  updateAddress: functionTemplate
}

const noteObjectContext = {
  name: "John Snow",
  content: "kwuegfoiqwgf",
  title: "john.snow@thewall.north"
}

const UserContext = React.createContext(userObjectContext)
const NoteContext = React.createContext(noteObjectContext)

const ProviderComponent = ({children}) => {
  const [context, setContext] = useState(userObjectContext)
  const [noteContext, setNoteContext] = useState(noteObjectContext)

  useEffect(() => {}, [])

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