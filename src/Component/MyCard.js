import axios from "axios";
import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FormComment from "./FormComment";
import Cookies from 'universal-cookie';
import MineModal from "./Modal";


function MyCard(props) {

    const cookies = new Cookies();

  const [showModal,setShowModal] = useState(false)


    const handleEdit= (id)=>{
      setShowModal(true)
      
    }

  const handleDelete = (id)=>{
    if(!window.confirm(" You Are about to Delete the Post and all it's Comments?")){
      return ;
    }
    const config = {
      headers: { Authorization: `Bearer ${cookies.get('token')}` }
  };

    axios.delete( 
      `${process.env.REACT_APP_BASE_URL}posts/deletepost/${id}`,
      config
    ).then(result=>{
      props.fetchData()
      alert("Delete Succ")
    }).catch(console.log);
  }

  return (

    <div>
      {showModal &&
      <MineModal flage={showModal} setShowModal={setShowModal} id={props.id} 
      title={props.item.title}
      content = {props.item.content}
      fetchData={props.fetchData}
      />
      }
      <Card>
        <Card.Header>{`Post By ${props.item.name}`}</Card.Header>
        <Card.Body>
          <Card.Title>{props.item.title}</Card.Title>
          <Card.Text>{props.item.content} </Card.Text>

        {
         (props.user?.role ==="admin")&&
          <>
            <Button variant="primary" className="cardbtn" onClick={()=>handleEdit(props.id)} >Update</Button>
            <Button variant="primary" className="cardbtn" onClick={()=>handleDelete(props.id)} >Delete</Button>
          </>
        }

          {props.item.Comments &&
          <ListGroup className="list-group-flush">
            
              {
                props.item.Comments?.map((item,idx)=>{
                  return (
                    <ListGroup.Item key={idx} >
                      <>
                      <h3>
                      {item.title}
                      </h3>
                      <p>
                      {item.content}
                      </p>
                      <span className='commentOwner'>{`Comment By ${item.name}`}</span>
                      </>
                  </ListGroup.Item>
                  )
                }
                )
              }

          </ListGroup>
          }
        </Card.Body>
          <FormComment user={props.user} id = {props.id} 
          fetchData={props.fetchData}
          />
      </Card>
    </div>
  );
}

export default MyCard;
