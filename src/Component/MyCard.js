import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FormComment from "./FormComment";
import Cookies from "universal-cookie";
import MineModal from "./Modal";
import { userContext } from "../Context/userContext";
import { dataContext } from "../Context/dataContext";
import { HStack, VStack } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { show, notshow } from "../redux/model/modelSlice";


function MyCard(props) {
  const cookies = new Cookies();

  // const [showModal, setShowModal] = useState(false);

  // const modelState = useSelector((state) => state.model.value);
  const dispatch = useDispatch();


  const userDetalis = useContext(userContext);
  const dataDetalis = useContext(dataContext);

  const handleEdit = (id) => {
    // dispatch(show());
    // setShowModal(true);
  };

  const handleDelete = (id) => {
    if (
      !window.confirm(
        " You Are about to Delete the Post and all it's Comments?"
      )
    ) {
      return;
    }
    const config = {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
    };

    axios
      .delete(`${process.env.REACT_APP_BASE_URL}posts/deletepost/${id}`, config)
      .then((result) => {
        dataDetalis.fetchData();
        alert("Delete Succ");
      })
      .catch(console.log);
  };
 
    useEffect(() => {
      console.log(props.cardid);
    });

  return (
    <VStack>
      {/* {modelState && ( */}
        <MineModal
          // flage={modelState}
          // setShowModal={setShowModal}
          cardid={props.item.id}
          title={props.item.title}
          content={props.item.content}
        />
      {/* )} */}
      <VStack>
        <Card style={{ width: "100%" }}>
          <Card.Header>{`Post By ${props.item.name}`}</Card.Header>
          <Card.Body>
            <Card.Title>{props.item.title}</Card.Title>
            <Card.Text>{props.item.content} </Card.Text>

            {userDetalis.user?.role === "admin" ? (
              <HStack>
                <Button
                  variant="primary"
                  className="cardbtn"
                  onClick={() => handleEdit(props.item.id)}
                >
                  Update
                </Button>
                <Button
                  variant="primary"
                  className="cardbtn"
                  onClick={() => handleDelete(props.item.id)}
                >
                  Delete
                </Button>
              </HStack>
            ) : props.item.UserId === userDetalis.user?.id ? (
              <HStack>
                <Button
                  variant="primary"
                  className="cardbtn"
                  onClick={() => handleEdit(props.item.id)}
                >
                  Update
                </Button>
                <Button
                  variant="primary"
                  className="cardbtn"
                  onClick={() => handleDelete(props.item.id)}
                >
                  Delete
                </Button>
              </HStack>
            ) : (
              <></>
            )}

            {props.item.Comments && (
              <ListGroup className="list-group-flush">
                {props.item.Comments?.map((item, idx) => {
                  return (
                    <ListGroup.Item key={idx}>
                      <>
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                        <span className="commentOwner">{`Comment By ${item.name}`}</span>
                      </>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            )}
          </Card.Body>
          <FormComment id={props.id} />
        </Card>
      </VStack>
    </VStack>
  );
}

export default MyCard;
