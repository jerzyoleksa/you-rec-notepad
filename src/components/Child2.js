import React, { useContext } from "react"
import { AppContext } from "./AppContext";

const Child2 = () => {
  const [state, setState] = useContext(AppContext);
  return (
    <button onClick={() => setState(state => ({ ...state, name: 'Clicked2!' }))}>
      {state.note ? state.note.title : "Note is null"}
    </button>
  )
}

export default Child2