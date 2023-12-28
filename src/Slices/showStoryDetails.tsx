import { createSlice } from "@reduxjs/toolkit";

export const showStoryDetails = createSlice({
  name: "showStoryDetails",
  initialState: { value: false },
  reducers: {
    setShowStoryDetails: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setShowStoryDetails } = showStoryDetails.actions;
export default showStoryDetails.reducer;
