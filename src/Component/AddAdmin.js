import axios from "axios";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Cookies from "universal-cookie";
import { dataContext } from "../Context/dataContext";
import { userContext } from "../Context/userContext";

function AddAdmin(props) {
  const cookies = new Cookies();

  const userDetalis = useContext(userContext);
  const dataDetalis = useContext(dataContext);

  const handlesubmut = (e) => {
    e.preventDefault();
    if (
      e.target.formBasicPasswordAdmin.value !==
      e.target.formBasicConfirmPasswordAdmin.value
    ) {
      alert("the password should be matched ");
      return;
    }
    let body = {
      username: e.target.formBasicusernameAdmin.value,
      email: e.target.formBasicEmailAdmin.value,
      password: e.target.formBasicPasswordAdmin.value,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}users/addadmin`, body)
      .then((result) => {
        alert("added Suceffully");
        cookies.set("token", result.data.token, { path: "/" });
        userDetalis.setUser(result.data);
        userDetalis.setisLogged(true);
        dataDetalis.fetchData();
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  return (
    <div>
      <div className="container containerlogin">
        <Form onSubmit={handlesubmut}>
          <Form.Group className="mb-3" controlId="formBasicusernameAdmin">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="Enter User Name" required />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmailAdmin">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicPasswordAdmin"
            required
          >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicConfirmPasswordAdmin"
          >
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirmed Password"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddAdmin;
