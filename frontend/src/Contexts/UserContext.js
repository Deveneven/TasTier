import React, {createContext, useState} from 'react';

const UserContext = createContext();


// eslint-disable-next-line react/prop-types
export function UserProvider({children}) {
  const [user, setUser] = useState(null);

  const updateUser = (param, value) => {
    setUser((prv) => ({...prv, [param]: value}));
  };

  const setupUser = (userParam) => {
    setUser(userParam);
  };
  return (
    <UserContext.Provider value={{updateUser, setupUser, user}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
