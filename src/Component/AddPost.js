import axios from 'axios';
import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import Cookies from 'universal-cookie';

function AddPost(props) {
    const cookies = new Cookies();

    const handlesubmit = (e)=>{
        e.preventDefault();
      
        if(e.target.controlcontent.value.length === 0 || e.target.controltitle.value.length === 0)
        {
            alert("can not post Empty ")
            return;
        }
        if(!cookies.get('token')){
            alert("there is no user")
            return;
        }


        const config = {
            headers: { Authorization: `Bearer ${cookies.get('token')}` }
        };
        const body= {
            "title" : e.target.controltitle.value,
            "content" : e.target.controlcontent.value,
        }

        axios.post( 
          `${process.env.REACT_APP_BASE_URL}posts/addpost`,
          body,
          config
        ).then(result=>{
          props.fetchData()
          alert("Added Succ")
        }).catch(console.log);
    

        

}

    return (
        <div>
        <Card className='cardpost' >
        <Card.Header>Add Post</Card.Header>
        <Card.Body>
           <Form onSubmit={handlesubmit} >
            <Form.Group className="mb-3" controlId="controltitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="add Title for the post " required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="controlcontent">
                <Form.Label>Contente</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="add Content for the post " required />
            </Form.Group>
          <Button variant="primary" className="cardbtn" type="submit">Post</Button>
            </Form>
    
        </Card.Body>
         
      </Card>
          
        </div>
    );
}

export default AddPost;