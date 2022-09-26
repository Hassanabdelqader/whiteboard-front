import React from 'react';
import AddAdmin from './AddAdmin';
import CardUser from './CardUser';

function Users(props) {
    return (
        <div>
             <h1>Add Admin User</h1>
                <AddAdmin /> 
            {
                props.userList.map((item,idx)=>{
                    return <CardUser item={item} key={idx} id={item.id} fetchData={props.fetchData} />
                })
            }
        </div>
    );
}

export default Users;