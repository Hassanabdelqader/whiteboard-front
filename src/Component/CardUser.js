import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Cookies from "universal-cookie";
import axios from "axios";
import { dataContext } from "../Context/dataContext";
import { useContext } from "react";
import { HStack } from "@chakra-ui/react";

function CardUser(props) {
  const cookies = new Cookies();
  const dataDetalis = useContext(dataContext);

  const handlesubmit = () => {
    const configuser = {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
    };
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}users/editAdmin/${props.id}`,
        {},
        configuser
      )
      .then((result) => {
        dataDetalis.fetchData();
        alert("Upated Succ");
      })
      .catch(console.log);
  };

  return (
    <HStack
      width={"100%"}
      bg={"green"}
    >
      <Card
      style={{ width:"100%" }}
      >
        <Card.Header as="h5">{props.item.username}</Card.Header>
        <Card.Body>
          <Card.Title>{` Role : ${props.item.role}`}</Card.Title>
          <Card.Text>{` Email : ${props.item.email}`}</Card.Text>
          <Button variant="primary" onClick={handlesubmit}>
            Make as Admin
          </Button>
        </Card.Body>
      </Card>
    </HStack>
  );
}

export default CardUser;
