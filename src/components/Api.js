import axios from 'axios';
import SessionData from './SesionData'

export default class Api{

    

    getNotes = (signedKey) => {
        //use https not http! to avoid problems with redirect/cors
        axios.post('https://frengly.com/ai/notesSec', {'authKey': signedKey})
        .then((res) => {
          
          this.putNotifsInSession(res.data);
          //let list = res.data;
          //this.setState({notesX: list});
          //SessionData.setNotes(list);
    
          //const found = list.find(element => element.status == 1);
          //last because getNotes on server side is ordered asc by viewed time, which means we chose recently opened note
          //let lastNote = list[list.length-1];
          //if (list.length > 0) this.selectNote(lastNote);
          //if (list.length > 0) SessionData.setNote(lastNote);
        })
        .catch((err) => console.log("Error!!!",err) );
      }

      getNotes2 = (signedKey, callback) => {
        //use https not http! to avoid problems with redirect/cors
        axios.post('https://frengly.com/ai/notesSec', {'authKey': signedKey})
        .then((res) => {
          
          callback(res.data);
          //let list = res.data;
          //this.setState({notesX: list});
          //SessionData.setNotes(list);
    
          //const found = list.find(element => element.status == 1);
          //last because getNotes on server side is ordered asc by viewed time, which means we chose recently opened note
          //let lastNote = list[list.length-1];
          //if (list.length > 0) this.selectNote(lastNote);
          //if (list.length > 0) SessionData.setNote(lastNote);
        })
        .catch((err) => console.log("Error!!!",err) );
      }

      putNotifsInSession = (list) => {
        //this.setState({notesX:list});
        SessionData.setNotes(list);
        
        if (list.length > 0) { 
          let lastNote = list[list.length-1];
          SessionData.setNote(lastNote)
        }
        
      }
    
    // axiosGet = (callback) =>{
    //     axios.get(`/https://exampleService.com/${e.target.value}`)
    //             .then(function (response) {
    //                 callback(response.data['name']);
    //             })
    //             .catch(function (error) {
    //                 if (error.response) {
    //                     if (error.response.status === 404) {
    //                         callback(`\u2014`)
    //                     }
    //                 }
    //             })
    // }
}