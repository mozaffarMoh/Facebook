import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  value: "",
};

export const activeSlice = createSlice({
  name: "active",
  initialState: initialState,
  reducers: {
    setActive: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setActive } = activeSlice.actions;
export default activeSlice.reducer;
