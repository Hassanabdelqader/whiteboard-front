import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React, {useContext} from "react";
import { userContext } from "../Context/userContext";

function Login(props) {
  const { login } = useContext(userContext);

  const handlesubmut = (e) => {
    e.preventDefault();
    login(e.target.formBasicEmail.value, e.target.formBasicPassword.value);
  };

  return (
    <div>
      <div className="container">
        <Form onSubmit={handlesubmut}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />

            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
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
