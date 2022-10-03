import React, { createContext, useState } from "react";

export const postContext = createContext(undefined);


export default function PostProvider({children}) {

    const [flagPosts, setflagPosts] = useState(true);
    const [Posts, setPosts] = useState([]);
  
    const value = {
        flagPosts, setflagPosts,
        Posts, setPosts
    }


    return (
        <postContext.Provider value={value}>
            {children}
        </postContext.Provider>
        );
}
