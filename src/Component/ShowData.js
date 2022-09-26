import React from 'react';
import { Card } from 'react-bootstrap';
import AddPost from './AddPost';
import MyCard from './MyCard';

function ShowData(props) {


    return (
        <div>
                <AddPost  fetchData={props.fetchData} />
              
                    {props.Posts.length &&
                        props.Posts.map(item =>{
                            return <MyCard key={item.id} item={item} user={props.user} id={item.id}
                            fetchData={props.fetchData}
                            />
                        })
                    }
        </div>
    );
}

export default ShowData;