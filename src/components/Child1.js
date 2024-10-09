import React, { useContext, useEffect, useState } from "react"

import { AppContext } from "./AppContext";




const Child1 = () => {
    const [state, setState] = useContext(AppContext);


      useEffect(() => {

      }, []);


  
  return (
   
        
            <button onClick={() => setState(state => ({ ...state, name: 'Clicked1!' }))}>
                {state.note ? state.note.title : "Note is null"}
            </button>
             
       
       
   
  )
}

export default Child1