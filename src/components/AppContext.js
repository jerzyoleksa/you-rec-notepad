import React, { useState } from 'react';

const AppContext = React.createContext([{}, () => {}]);

const AppProvider = ({children}) => {
  const [userData, setUserData] = useState({"isDark" : false, "address" : "no_address"});
  const [note, setNote] = useState();

  return (
    <AppContext.Provider value={[userData, setUserData, note, setNote]}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };