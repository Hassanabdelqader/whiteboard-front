import { useContext } from "react";
import { postContext } from "../Context/postContext";

export const initalState = {
    loginFlag : true,
    signUpFlag : false,
    signOutFlag : true,
    isLogged : false,
    user : "",
    userList : "",
    flagUser : false,
    // const postDetalis = useContext(postContext);
    // const cookies = new Cookies();
}

export function reducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
             ...state,
             isLogged : true,
             signUpFlag:false,
             loginFlag : false,
             signOutFlag : true,
             flagUser : false
            }
        case "SIGNUPSUC":
            return {
                ...state,
                isLogged : true
            }
       case "LOGOUT":
            return {
             ...state ,
             isLogged : false,
             signUpFlag :false ,
             loginFlag : true,
             signOutFlag : false,
             flagUser : false
            }
        case "SIGNOUTPAGE":
            return {
                ...state ,
                signUpFlag :true ,
                loginFlag : false,
                signOutFlag : false,
            }
        case "SIGNINPAGE":
            return {
                ...state ,
                signUpFlag :false ,
                loginFlag : true,
                signOutFlag : false,
            }
        case "POSTLIST":
                return {
                    ...state ,
                    flagUser :false
                }
        case "USERLIST":
                return {
                    ...state ,
                    flagUser :true
                }
      default:
        throw new Error();
    }
  }


//     switch (action.type) {
    //   case "LOGIN":
    //    return {
    //     ...state,
    //     isLogged : true,
    //     setsignUpFlag:false,
    //     setLoginFlag : false,
    //     setsignOutFlag : true
    //    }
    
    //   case "LOGOUT":
    //    return {
    //     ...state ,
    //     isLogged : false,
    //     signUpFlag :false ,
    //     loginFlag : true,
    //     signOutFlag : false,
    //     flagUser : false
    //    }

//        case "TEST":{
//         return 5
//       }
        
//       default:
//         return state;
//     }
  
//   };