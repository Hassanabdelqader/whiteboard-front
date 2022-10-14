import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const loginhandeler= (dispatch,payload)=>{
    axios
    .post(
      `${process.env.REACT_APP_BASE_URL}users/signin`,
      {},
      {
        headers: {
          Authorization: `Basic ${payload}`,
        },
      }
    )
    .then((result) => {
        cookies.set("token", result.data.token, { path: "/" });
        dispatch({type:"LOGIN"})
        // console.log("Hassan ~ dispatch", dispatch({type: "LOGIN"}))
    //  postDetalis.setflagPosts(true);
      return true
    })
    .catch((error) => {
        console.log(error)
      alert(error.response?.data);
      return false
    });

}
export const logouthandeler= (dispatch)=>{
 
    dispatch({type:"LOGOUT"})
    cookies.remove("token") 

}