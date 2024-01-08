import { configureStore } from "@reduxjs/toolkit";
import showStoryDetailsReducer from "../Slices/showStoryDetails";
import sendStoryDataReducer from "../Slices/sendStoryData";
import activeReducer from "../Slices/active"; 

const store = configureStore({
  reducer: {
    showStoryDetails: showStoryDetailsReducer,
    sendStoryData: sendStoryDataReducer,
    active : activeReducer,
  },
});

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
