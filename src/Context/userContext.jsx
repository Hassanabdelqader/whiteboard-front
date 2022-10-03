import React, { createContext, useState } from "react";

export const userContext = createContext(undefined);


export default function UserProvider({children}) {

  const [loginFlag, setLoginFlag] = useState(true);
  const [signUpFlag, setsignUpFlag] = useState(false);
  const [signOutFlag, setsignOutFlag] = useState(true);
  const [isLogged, setisLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [userList, setuserList] = useState(null);
  const [flagUser, setflagUser] = useState(false);
  

    const value = {
        loginFlag, setLoginFlag,
        signUpFlag, setsignUpFlag,
        signOutFlag, setsignOutFlag,
        isLogged, setisLogged,
        user, setUser,
        flagUser, setflagUser,
        userList, setuserList,
    }


    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
        );
}

