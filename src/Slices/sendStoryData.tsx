import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  data: [],
};

export const sendStoryData = createSlice({
  name: "showStoryDetails",
  initialState: initialState,
  reducers: {
    addStoryData: (state, action) => {
      state.data.push(action.payload);
    },
    removeStoryData: (state) => {
      state.data.pop();
    },
  },
});

export const { addStoryData, removeStoryData } = sendStoryData.actions;
export default sendStoryData.reducer;
