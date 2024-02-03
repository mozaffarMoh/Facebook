import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  data: [],
};

export const createNewPost = createSlice({
  name: "createNewPost",
  initialState: initialState,
  reducers: {
    addNewPost: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { addNewPost } = createNewPost.actions;
export default createNewPost.reducer;
