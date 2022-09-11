import React, { useContext, useEffect, useState } from "react"
import fetchDataCall from './ApiAxios'
import { AppContext } from "./AppContext";




const Child1 = () => {
    const [state, setState] = useContext(AppContext);
    //const [data, setData] = useState("");

    //So far the solution I found is using the api method inside the context itself, but it breaks my code organization... – 
//Yes, that's not possible. You can for example create AxiosProvider component with access to proper context and configure axios there. 
//Many libraries are based upon this concept of code organisation, for example restful-react – 
    // const callback = (list) => {
    //     console.log("inside callback::"+list);
    //     if (list.length > 0) { 
    //         let lastNote = list[list.length-1];
    //         console.log("lastNote:"+lastNote);
    //         //setState({"note" : lastNote});
    //         this.setState({"note": lastNote });
            
    //         console.log("---------- state after callback ---------");
    //         console.log(state.note);
    //     }

    //     setState({notes : list});

    //     return "dummy callback";
    // }
    //State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().
    // useEffect( () => {
    //     let key = '0xc5488fc117a44b56d9f9148e3312a4dc740d45dd34034b1323dc7edee00029597571fc81637fb6264d1f79ca59b224871240cca6ac4da695410051d1b0e448791b';
    //     let api = new Api();
    //     api.getNotes2(key, callback); 
    // }, []);  

    // const fetchDataCall = async ({ }) => {
    //     let key = '0xc5488fc117a44b56d9f9148e3312a4dc740d45dd34034b1323dc7edee00029597571fc81637fb6264d1f79ca59b224871240cca6ac4da695410051d1b0e448791b';
    //     let apiReturn = await axios
    //       .post('https://frengly.com/ai/notesSec', {'authKey': key})
    //       .then(async function(response) {
    //         return response;
    //       })
    //       .catch(function(error) {
    //         console.log(error);
    //       });
    //     return apiReturn;
    //   };

      useEffect(() => {
        const fetchData = async () => {
          let list = await fetchDataCall({});
          
          if (list.length > 0) { 
            let lastNote = list[list.length-1];
            setState({"note": lastNote });
          }

          //setData(response.data);
        };
    
        fetchData();
      }, []);

    // useEffect(() => {
    //     (async () => {
    //       const result = await fetch('https://jsonplaceholder.typicode.com/comments')
    //       const data = await result.json()
    //       setComments(data)
    //     })()
    //   }, [])

  
  return (
   
        
            <button onClick={() => setState(state => ({ ...state, name: 'Clicked1!' }))}>
                {state.note ? state.note.title : "Note is null"}
            </button>
             
       
       
   
  )
}

export default Child1