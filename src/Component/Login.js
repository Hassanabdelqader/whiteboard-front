import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { Base64 } from "js-base64";
import Cookies from 'universal-cookie';


function Login(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const cookies = new Cookies();

    const handlesubmut = (e)=>{
        e.preventDefault();

          const encoded = Base64.encode(`${e.target.formBasicEmail.value}:${e.target.formBasicPassword.value}`)


        axios.post(`${process.env.REACT_APP_BASE_URL}users/signin`, {},{
            headers: {
                'Authorization': `Basic ${encoded}` 
              }
        })
        .then((result)=>{
          cookies.set('token', result.data.token, { path: '/' });
        //   props.setUser(result.data)
          props.setisLogged(true)
        })
        .catch(error=>{
            console.log("error")
          alert(error.response.data)

        })


    }

  return (
    <div>
        <div className="container">
        <Form onSubmit={handlesubmut}>
      <Form.Group className="mb-3" controlId="formBasicEmail" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" required />
        
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </div>
    </div>
  );
}

export default Login;
