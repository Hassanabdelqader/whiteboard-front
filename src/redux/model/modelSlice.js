import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const modelshowSlice = createSlice({
  name: "showmodel",
  initialState,
  reducers: {
    show: (state) => {
     
      state.value =true;
    },
    notshow: (state) => {
      state.value =false;
    }
  },
});

// Action creators are generated for each case reducer function
export const { show, notshow } = modelshowSlice.actions;

export default modelshowSlice.reducer;
