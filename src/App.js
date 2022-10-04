import { useContext, useEffect } from "react";
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

function App() {
  const userDetalis = useContext(userContext);
  const postDetalis = useContext(postContext);
  const dataDetalis = useContext(dataContext);

  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("token")) {
      dataDetalis.fetchData();
      userDetalis.setisLogged(true);
      userDetalis.setsignUpFlag(false);
      userDetalis.setLoginFlag(false);
      userDetalis.setsignOutFlag(true);
    } else {
      userDetalis.setisLogged(false);
      userDetalis.setsignUpFlag(false);
      userDetalis.setLoginFlag(true);
      userDetalis.setsignOutFlag(false);
    }
  }, [userDetalis.isLogged]);

  return (
    <div className="App">
      <NavBar />

      {userDetalis.flagUser && <>{userDetalis.userList && <Users />}</>}

      {userDetalis.isLogged && <>{postDetalis.flagPosts && <ShowData />}</>}

      {!userDetalis.isLogged && (
        <>
          {userDetalis.loginFlag && <Login />}
          {userDetalis.signUpFlag && <SignUp />}
        </>
      )}

      <div className="forfooter"></div>
      <MyFooter />
    </div>
  );
}

export default App;
