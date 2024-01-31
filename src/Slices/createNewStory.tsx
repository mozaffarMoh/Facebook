import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  data: [],
};

export const createNewStory = createSlice({
  name: "showStoryDetails",
  initialState: initialState,
  reducers: {
    addNewStory: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { addNewStory } = createNewStory.actions;
export default createNewStory.reducer;
