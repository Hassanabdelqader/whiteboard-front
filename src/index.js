import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./Context/userContext";
import PostProvider from "./Context/postContext";
import DataProvider from "./Context/dataContext";
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "./app/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <PostProvider>
          <UserProvider>
            <DataProvider>
              <Provider store={store}>
                <App />
              </Provider>
            </DataProvider>
          </UserProvider>
        </PostProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
