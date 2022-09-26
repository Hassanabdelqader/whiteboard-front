import React from 'react';
import {
  MDBNavbar,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';
import Cookies from 'universal-cookie';

export default function NavBar(props) {


  const cookies = new Cookies();

  return (
    <MDBNavbar light bgColor='light'>
        
      <MDBContainer tag="form" fluid className='justify-content-sapce'>
        <div>

        
        
        <MDBBtn outline color="secondary"  className='headerlogo' type='button' onClick={()=>{
          props.fetchData([1,2])
        }} >
        WhiteBoard
        </MDBBtn>
        </div>

      <div>
      {!props.isLogged && 
       <>
        <MDBBtn outline color="success" className='me-2' type='button'onClick={()=>{
            props.setLoginFlag(false)
            props.setsignUpFlag(true)
            props.setsignOutFlag(false)
            }}>
          Sign Up
        </MDBBtn>
        <MDBBtn outline color="secondary" type='button' onClick={()=>{

            props.setsignUpFlag(false)
            props.setLoginFlag(true)
            props.setsignOutFlag(false)
            props.setUser(null)
            
            }}>
          Login
        </MDBBtn>
       </>
        }

            {props.isLogged && 
            <>
            welcome{" "} {props.user?.username} {" "}
                {props.signOutFlag &&
                        <MDBBtn outline color="secondary" type='button' onClick={()=>{
                            cookies.remove("token") 
                            props.setisLogged(false)
                            props.setsignUpFlag(false)
                            props.setLoginFlag(true)
                            props.setsignOutFlag(false)
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