import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import Cookies from "universal-cookie";
import { postContext } from "./postContext";
import { userContext } from "./userContext";

export const dataContext = createContext(undefined);


export default function DataProvider({children}) {

    
  const userDetalis = useContext(userContext)
  const postDetalis = useContext(postContext)
  
  const cookies = new Cookies();


    const fetchData = (e)=>{

    const config = {
      headers: { Authorization: `Bearer ${cookies.get('token')}` }
  };
  
  axios.get( 
    `${process.env.REACT_APP_BASE_URL}users/finduser`,
    config
  ).then(result=>{
    userDetalis.setUser(result.data)
  }).catch(console.log);
  
  axios.get( 
    `${process.env.REACT_APP_BASE_URL}posts`,
    config
  ).then(result=>{
     postDetalis.setPosts(result.data)
  }).catch(console.log);

  
  axios.get( 
    `${process.env.REACT_APP_BASE_URL}users`,
    config
  ).then(result=>{
    userDetalis.setuserList(result.data)
  }).catch(console.log);
  }

   
   
   
    const value = {
        fetchData
    }


    return (
        <dataContext.Provider value={value}>
            {children}
        </dataContext.Provider>
        );
}
