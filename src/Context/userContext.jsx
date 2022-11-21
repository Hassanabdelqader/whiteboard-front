import axios from "axios";
import { Base64 } from "js-base64";
import React, { createContext, useContext, useReducer, useState } from "react";
import Cookies from "universal-cookie";
import { loginhandeler, logouthandeler } from "../Actions/userActions";
import { initalState, reducer } from "../Reducers/userReducers";
import { postContext } from "./postContext";

export const userContext = createContext(undefined);

export default function UserProvider({ children }) {
  const [loginFlag, setLoginFlag] = useState(true);
  const [signUpFlag, setsignUpFlag] = useState(false);
  const [signOutFlag, setsignOutFlag] = useState(true);
  const [isLogged, setisLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [userList, setuserList] = useState(null);
  const [flagUser, setflagUser] = useState(false);
  const postDetalis = useContext(postContext);
  const cookies = new Cookies();
  var [authRed, dispatch] = useReducer(reducer, initalState);
  // console.log("aaaaaaaaaaaaaa", dispatch({type: 'LOGIN'}))

  function logout() {
    logouthandeler(dispatch);
  }

  function login(userName, passWord) {
    const encoded = Base64.encode(`${userName}:${passWord}`);
    
    loginhandeler(dispatch, encoded);
  }

  function canDo(capability) {
    if (user?.capabilities.include(capability)) {
      return true;
    } else {
      return false;
    }
  }

  const value = {
    loginFlag,
    setLoginFlag,
    signUpFlag,
    setsignUpFlag,
    signOutFlag,
    setsignOutFlag,
    isLogged,
    setisLogged,
    user,
    setUser,
    flagUser,
    setflagUser,
    userList,
    setuserList,
    canDo,
    login,
    logout,
    authRed,
    dispatch
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}
