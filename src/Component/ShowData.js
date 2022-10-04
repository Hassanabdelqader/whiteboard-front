import React, { useContext } from "react";
import { postContext } from "../Context/postContext";
import AddPost from "./AddPost";
import MyCard from "./MyCard";

function ShowData(props) {
  const postDetalis = useContext(postContext);

  return (
    <div>
      <AddPost fetchData={props.fetchData} />
      {postDetalis.Posts.length &&
        postDetalis.Posts.map((item) => {
          return <MyCard key={item.id} item={item} id={item.id} />;
        })}
    </div>
  );
}

export default ShowData;
