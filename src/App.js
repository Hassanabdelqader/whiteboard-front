import { useContext, useEffect, useReducer } from "react";
import "./App.css";
import MyFooter from "./Component/Footer";
import Login from "./Component/Login";
import NavBar from "./Component/NavBar";
import ShowData from "./Component/ShowData";
import SignUp from "./Component/SignUp";
import Cookies from "universal-cookie";
import Users from "./Component/Users";
import { userContext } from "./Context/userContext";
import { postContext } from "./Context/postContext";
import { dataContext } from "./Context/dataContext";
import { initalState, reducer } from "./Reducers/userReducers";


function App() {
  const userDetalis = useContext(userContext);
  const postDetalis = useContext(postContext);
  const dataDetalis = useContext(dataContext);
  // const [authRed, dispatch] = useReducer(reducer, initalState);
  
  const cookies = new Cookies();
  useEffect(() => {
    if (cookies.get("token")) {
      dataDetalis.fetchData();
      userDetalis.dispatch({type:"LOGIN"})
    } else {
      userDetalis.dispatch({type:"LOGOUT"})
    }
  }, [userDetalis.authRed.isLogged]);

  return (
    <div className="App">
      <NavBar />


      {userDetalis.authRed.isLogged && <>{postDetalis.flagPosts && <ShowData />}</>}
      {userDetalis.authRed.flagUser && <>{

      userDetalis.userList && <Users />}</>}


      {!userDetalis.authRed.isLogged && (
        <>
          {userDetalis.authRed.loginFlag && <Login />}
          {userDetalis.authRed.signUpFlag && <SignUp />}
        </>
      )}


      <div className="forfooter"></div>

      <MyFooter />
    </div>
  );
}

export default App;
