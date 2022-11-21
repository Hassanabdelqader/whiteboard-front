import { configureStore } from "@reduxjs/toolkit";
import modelReducer from "../redux/model/modelSlice";


export const store = configureStore({
    reducer: {
      model:modelReducer,
  },
});
