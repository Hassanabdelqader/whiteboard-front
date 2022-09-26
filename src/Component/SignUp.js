import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Cookies from 'universal-cookie';


function SignUp(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const cookies = new Cookies();


    const handlesubmut = (e)=>{
        e.preventDefault();
        if(e.target.formBasicPassword.value !==e.target.formBasicConfirmPassword.value )
        {
          alert("the password should be matched ")
          return;
        }
        let body ={
          username: e.target.formBasicusername.value,
          email: e.target.formBasicEmail.value,
          password: e.target.formBasicPassword.value,
        }
        
        axios.post(`${process.env.REACT_APP_BASE_URL}users/signup`, body)
        .then((result)=>{
          alert("added Suceffully")
          cookies.set('token', result.data.token, { path: '/' });
          // props.setUser(result.data)
          props.setisLogged(true)
        })
        .catch(error=>{
          alert(error.response.data)

        })

     
    }

  return (
    <div>
        <div className="container containerlogin">
        <Form onSubmit={handlesubmut}>
          
        <Form.Group className="mb-3" controlId="formBasicusername"  >
        <Form.Label>User Name</Form.Label>
        <Form.Control type="text" placeholder="Enter User Name" required />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail"  >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" required />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword" required>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirmed Password" required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
        </div>
    </div>
  );
}

export default SignUp;
