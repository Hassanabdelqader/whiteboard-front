import { VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { userContext } from "../Context/userContext";
import AddAdmin from "./AddAdmin";
import CardUser from "./CardUser";

function Users(props) {
  const userDetalis = useContext(userContext);

  return (
    <VStack
    bg={"yellowgreen"}
    >
      <h1>Add Admin User</h1>
      <AddAdmin />
      {userDetalis.userList.map((item, idx) => {
        return <CardUser item={item} key={idx} id={item.id} />;
      })}
    </VStack>
  );
}

export default Users;
