/*eslint-disable*/
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
    Api.get(`${process.env.REACT_APP_DB_API}/accounts/user/perferences`)
        .then((response) => {
          if (response.success) {
            const pref = response.text;
            const usersPref = {
              ...pref.user,
              allergens: {disliked: pref.allergens},
              cousine: {liked: pref.cousines},
              diet: {liked: pref.diet},
              ingredients: {liked: pref.favoritesIngr, disliked: pref.dislikedIngrs},
            }
            setUser(usersPref);
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
