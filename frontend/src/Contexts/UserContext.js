import React, {createContext, useState} from 'react';
import {Api} from '../Utils/Api';
const UserContext = createContext();


// eslint-disable-next-line react/prop-types
export function UserProvider({children}) {
  const [user, setUser] = useState(null);

  const updateUser = (param, value) => {
    setUser((prv) => ({...prv, [param]: value}));
  };

  function setupUser() {
    Api.get(`${process.env.REACT_APP_DB_API}/accounts/user`)
        .then((response) => {
          console.log(response);
          if (response.success) {
            setUser(response.text);
          } else {
            setUser(null);
          }
        });
  };
  return (
    <UserContext.Provider value={{updateUser, setupUser, user}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
