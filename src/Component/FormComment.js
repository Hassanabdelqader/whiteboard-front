import axios from 'axios';
import React, { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { dataContext } from '../Context/dataContext';


function FormComment(props) {
    const cookies = new Cookies();
  const dataDetalis = useContext(dataContext)



    const handleComment = (e)=>{
        e.preventDefault();

          if(e.target.Controlcontent.value.length === 0 || e.target.controltitle.value.length === 0 )
        {
            alert("can not post Empty ")
            return;
        }
        if(!cookies.get('token')){
            alert("there is no user")
            return;
        }

        if(!props.id){
            alert("there is no post")
            return;
        }
        const config = {
            headers: { Authorization: `Bearer ${cookies.get('token')}` }
        };
        const body= {
            "title" : e.target.controltitle.value,
            "content" : e.target.Controlcontent.value,
        }

        axios.post( 
          `${process.env.REACT_APP_BASE_URL}comments/addcomment/${props.id}`,
          body,
          config
        ).then(result=>{
            dataDetalis.fetchData()
        }).catch(console.log);

    }

    return (
        <div>
       <>
       <Form  onSubmit={handleComment} className='commentForm'>
           
       <Form.Group className="mb-3" controlId="controltitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="add Title for the Comment " required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Controlcontent">
                <Form.Label></Form.Label>
                <Form.Control as="textarea"  placeholder='Add Comment' rows={3} />
            </Form.Group>
            <Button variant="primary" type="submit">
        Comment
      </Button>
    </Form>
       </>

        </div>
    );
}

export default FormComment;