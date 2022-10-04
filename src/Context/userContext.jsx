import axios from "axios";
import { Base64 } from "js-base64";
import React, { createContext, useContext, useState } from "react";
import Cookies from "universal-cookie";
import { postContext } from "./postContext";

export const userContext = createContext(undefined);


export default function UserProvider({children}) {

  const [loginFlag, setLoginFlag] = useState(true);
  const [signUpFlag, setsignUpFlag] = useState(false);
  const [signOutFlag, setsignOutFlag] = useState(true);
  const [isLogged, setisLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [userList, setuserList] = useState(null);
  const [flagUser, setflagUser] = useState(false);
  const postDetalis = useContext(postContext);
  const cookies = new Cookies();

  function logout() {
  
    cookies.remove("token") 
                      setisLogged(false)
                      setsignUpFlag(false)
                      setLoginFlag(true)
                      setsignOutFlag(false)
                      setflagUser(false)
                      postDetalis.setflagPosts(false)
  }
  

  function login(userName,passWord) {

    const encoded = Base64.encode(
        `${userName}:${passWord}`
      );
  
    axios
    .post(
      `${process.env.REACT_APP_BASE_URL}users/signin`,
      {},
      {
        headers: {
          Authorization: `Basic ${encoded}`,
        },
      }
    )
    .then((result) => {
      cookies.set("token", result.data.token, { path: "/" });
     setisLogged(true);
      postDetalis.setflagPosts(true);
      return true
    })
    .catch((error) => {
        console.log(error)
      alert(error.response?.data);
      return false
    });
  }
  
  
  function canDo(capability) {
      if(user?.capabilities.include(capability)){
          return true
        }else{
            return false
        }
    }
    
        const value = {
            loginFlag, setLoginFlag,
            signUpFlag, setsignUpFlag,
            signOutFlag, setsignOutFlag,
            isLogged, setisLogged,
            user, setUser,
            flagUser, setflagUser,
            userList, setuserList,
            canDo,login,logout
        }
    
    
    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
        );
}

