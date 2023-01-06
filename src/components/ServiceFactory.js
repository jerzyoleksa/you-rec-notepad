import axios from 'axios';
import SessionData from './SesionData'

var ServiceFactory = (function() {
  
   
    var getNotes = function(signKey) {
      //use https not http! to avoid problems with redirect/cors
      axios.post('https://frengly.com/rest/v1/notesSec', {'authKey': signKey})
      .then((res) => {
        let list = res.data;
        //this.setState({notesX: list});
        SessionData.setNotes(list);
  
        //const found = list.find(element => element.status == 1);
        //last because getNotes on server side is ordered asc by viewed time, which means we chose recently opened note
        let lastNote = list[list.length-1];
        //if (list.length > 0) this.selectNote(lastNote);
        if (list.length > 0) SessionData.setNote(lastNote);
      })
      .catch((err) => console.log("Error!!!",err) );
    }
  
    return {
      getNotes: getNotes
    }
  
  })();
  
  export default ServiceFactory;