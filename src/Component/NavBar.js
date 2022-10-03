import React, { useContext } from 'react';
import {
  MDBNavbar,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';
import Cookies from 'universal-cookie';
import { userContext } from '../Context/userContext';
import { postContext } from '../Context/postContext';
import { dataContext } from '../Context/dataContext';

export default function NavBar(props) {
  
  const userDetalis = useContext(userContext)
  const postDetalis = useContext(postContext)
  const dataDetalis = useContext(dataContext)


  const cookies = new Cookies();

  return (
    <MDBNavbar light bgColor='light'>
        
      <MDBContainer tag="form" fluid className='justify-content-sapce'>
        <div>

        
        
        <MDBBtn outline color="secondary"  className='headerlogo' type='button' onClick={()=>{
          dataDetalis.fetchData([1,2])
        }} >
        WhiteBoard
        </MDBBtn>
        </div>

      <div>
      {!userDetalis.isLogged && 
       <>
        <MDBBtn outline color="success" className='me-2' type='button'onClick={()=>{
            userDetalis.setLoginFlag(false)
            userDetalis.setsignUpFlag(true)
            userDetalis.setsignOutFlag(false)
            }}>
          Sign Up
        </MDBBtn>

        <MDBBtn outline color="secondary" type='button' onClick={()=>{

            userDetalis.setsignUpFlag(false)
            userDetalis.setLoginFlag(true)
            userDetalis.setsignOutFlag(false)
            userDetalis.setUser(null)
            
            }}>
          Login
        </MDBBtn>
       </>
        }
          
            {userDetalis.isLogged && 
            <>
            welcome{" "} {userDetalis.user?.username} {" "}
             {(userDetalis.user?.role === "admin")&&
              <MDBBtn outline color="success" className='me-2' type='button'onClick={()=>{
                userDetalis.setflagUser(false)
                postDetalis.setflagPosts(true)
                }}>
              Posts List
            </MDBBtn>
            }

          

            {(userDetalis.user?.role === "admin")&&
              <MDBBtn outline color="success" className='me-2' type='button'onClick={()=>{
                userDetalis.setflagUser(true)
                postDetalis.setflagPosts(false)
                }}>
              Users List
            </MDBBtn>
            }
          {userDetalis.signOutFlag &&
                  <MDBBtn outline color="secondary" type='button' onClick={()=>{
                      cookies.remove("token") 
                      userDetalis.setisLogged(false)
                      userDetalis.setsignUpFlag(false)
                      userDetalis.setLoginFlag(true)
                      userDetalis.setsignOutFlag(false)
                      userDetalis.setflagUser(false)
                      postDetalis.setflagPosts(false)
                      }}>
                  Sign out
                  </MDBBtn>
          }
            </>
            }
      </div>
      </MDBContainer>
    </MDBNavbar>
  );
}