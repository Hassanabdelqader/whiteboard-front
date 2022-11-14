import React, { useContext } from "react";
import { postContext } from "../Context/postContext";
import AddPost from "./AddPost";
import MyCard from "./MyCard";
import { Stack, HStack, VStack, StackDivider } from "@chakra-ui/react";



function ShowData(props) {
  const postDetalis = useContext(postContext);

  return (
    <VStack
      bg={"green.400"}
    >
      <AddPost fetchData={props.fetchData}
      />
      {postDetalis.Posts.length &&
        postDetalis.Posts.map((item) => {
          return <MyCard key={item.id} item={item} id={item.id} />;
        })}
    </VStack>
  );
}

export default ShowData;
