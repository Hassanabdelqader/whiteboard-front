import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MyFooter from "./Component/Footer";
import Login from "./Component/Login";
import NavBar from "./Component/NavBar";
import ShowData from "./Component/ShowData";
import SignUp from "./Component/SignUp";
import Cookies from 'universal-cookie';
import axios from "axios";
import Users from "./Component/Users";

function App() {
  const [loginFlag, setLoginFlag] = useState(true);
  const [signUpFlag, setsignUpFlag] = useState(false);
  const [signOutFlag, setsignOutFlag] = useState(true);
  const [isLogged, setisLogged] = useState(false);
  const [Posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [userList, setuserList] = useState(null);
  const [flagUser, setflagUser] = useState(false);
  const [flagPosts, setflagPosts] = useState(true);


 

  const cookies = new Cookies();

  useEffect(() => {
      if(cookies.get('token')){
        fetchData()
        setisLogged(true)
        setsignUpFlag(false)
        setLoginFlag(false)
        setsignOutFlag(true)
      }else{
        setisLogged(false)
        setsignUpFlag(false)
        setLoginFlag(true)
        setsignOutFlag(false)

      }
    
  },[isLogged]);

  const fetchData = (e)=>{

    const config = {
      headers: { Authorization: `Bearer ${cookies.get('token')}` }
  };
  
  axios.get( 
    `${process.env.REACT_APP_BASE_URL}users/finduser`,
    config
  ).then(result=>{
    // console.log(result.data)
    setUser(result.data)
  }).catch(console.log);
  
  axios.get( 
    `${process.env.REACT_APP_BASE_URL}posts`,
    config
  ).then(result=>{
    // consokle.log(result.data)
    setPosts(result.data)
  }).catch(console.log);

  
  axios.get( 
    `${process.env.REACT_APP_BASE_URL}users`,
    config
  ).then(result=>{
    // console.log(result.data)
    setuserList(result.data)
  }).catch(console.log);


  }

  return (
    <div className="App">
      <NavBar
        setLoginFlag={setLoginFlag}
        signOutFlag={signOutFlag}
        setsignOutFlag={setsignOutFlag}
        setsignUpFlag={setsignUpFlag}
        isLogged={isLogged}
        setisLogged={setisLogged}
        fetchData={fetchData}
        setUser={setUser}
        user={user}
        setflagPosts={setflagPosts}
        setflagUser={setflagUser}
      />

       {flagUser &&
           <>
            { userList &&
              <Users userList={userList}  fetchData={fetchData} />
          }
           </>
       }


      {isLogged && (
            <>
            {flagPosts &&
              <ShowData Posts={Posts} fetchData={fetchData}  user={user}/>
            }
            </>
      
      )
      }

      {!isLogged && (
        <>
          {loginFlag && <Login setisLogged={setisLogged} setUser={setUser}  setflagPosts={setflagPosts} />}
          {signUpFlag && <SignUp setisLogged={setisLogged} setUser={setUser}  setflagPosts={setflagPosts} />}
        </>
      )}

      <div className="forfooter"></div>
      <MyFooter />
    </div>
  );
}

export default App;





/**
 * 
 * 
        <Routes>
        <Route path="/" element={(isLogged)?
        <ShowData /> :  <>
        {loginFlag && <Login />}
        {signUpFlag && <SignUp />}
      </> 
      } />
      </Routes>

 */
