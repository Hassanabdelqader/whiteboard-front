import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'universal-cookie';
import { dataContext } from '../Context/dataContext';
import { useSelector, useDispatch } from "react-redux";
import { show, notshow } from "../redux/model/modelSlice";


function MineModal(props) {
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const cookies = new Cookies();
  const dataDetalis = useContext(dataContext)
  
  const modelState = useSelector((state) => state.model.value);
  const dispatch = useDispatch();


  const handleExite = () => {
    // setShow(false);
    dispatch(notshow());
    // props.setShowModal(false)
}


  const handleSubmit = (e) => {
    console.log(props.cardid);
      e.preventDefault();
      
    if(e.target.title.value.length === 0 || e.target.content.value.length === 0)
    {
        console.log("can not post Empty ")
        return;
    }
    if(!cookies.get('token')){
        console.log("there is no user")
        return;
    }

    const config = {
        headers: { Authorization: `Bearer ${cookies.get('token')}` }
    };
    const body= {
        "title" : title,
        "content" : content,
    }

    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}posts/updatepost/${props.cardid}`,
        body,
        config
      )
      .then((result) => {
        console.log(result.data);
        dataDetalis.fetchData();
        alert("Upated Succ");
      })
      .catch(console.log);

dispatch(notshow());
    // props.setShowModal(false)

  }

  const handlechangecontent = (e) => {setContent(e.target.value)}
  const handlechangetitle = (e) => {setTitle(e.target.value)}

   useEffect(() => {
     console.log(props.cardid);
   });

  return (
    <>
      <Modal show={modelState} onHide={handleExite}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post{props.cardid}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={`${title}`}
                onChange={handlechangetitle}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={handlechangecontent}
                value={`${content}`}
              />

              <br />
              <Button variant="success" type="submit">
                Save Changes
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
export default MineModal