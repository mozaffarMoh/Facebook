import { configureStore } from "@reduxjs/toolkit";
import showStoryDetailsReducer from "../Slices/showStoryDetails";
import sendStoryDataReducer from "../Slices/sendStoryData";

const store = configureStore({
  reducer: {
    showStoryDetails: showStoryDetailsReducer,
    sendStoryData: sendStoryDataReducer,
  },
});

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
