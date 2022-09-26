import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddAdmin from './AddAdmin';
import Cookies from 'universal-cookie';
import axios from 'axios';


function CardUser(props) {
    const cookies = new Cookies();


const handlesubmit =()=>{

const configuser = {
    headers: { Authorization: `Bearer ${cookies.get('token')}` }
};
axios.put( 
    `${process.env.REACT_APP_BASE_URL}users/editAdmin/${props.id}`,
    {},
    configuser
  ).then(result=>{
   props.fetchData()
    alert("Upated Succ")
  }).catch(console.log);

}

  return (
   <>
    <Card>
      <Card.Header as="h5">{props.item.username}</Card.Header>
      <Card.Body>
        <Card.Title>{` Role : ${props.item.role}`}</Card.Title>
        <Card.Text>
        {` Email : ${props.item.email}`}
        </Card.Text>
        <Button variant="primary" onClick={handlesubmit} >Make as Admin</Button>
      </Card.Body>
    </Card>
   </>
  );
}

export default CardUser;