var SessionData = (function() {
    var full_name = "";
    var notes = []
    var note = {}
  
    var getNotes = function() {
        return notes;    // Or pull this from cookie/localStorage
    };
    
    var setNotes = function(arr) {
        notes = arr;     
        // Also set this in cookie/localStorage
    };

    var getNote = function() {
        return note;    // Or pull this from cookie/localStorage
    };
    
    var setNote = function(obj) {
        note = obj;     
        // Also set this in cookie/localStorage
    };

    var getName = function() {
      return full_name;    // Or pull this from cookie/localStorage
    };
  
    var setName = function(name) {
      full_name = name;     
      // Also set this in cookie/localStorage
    };
  
    return {
      getNote: getNote,
      setNote: setNote,
      getNotes: getNotes,
      setNotes: setNotes,
      getName: getName,
      setName: setName
    }
  
  })();
  
  export default SessionData;