import { configureStore } from "@reduxjs/toolkit";
import showStoryDetailsReducer from "../Slices/showStoryDetails";
import sendStoryDataReducer from "../Slices/sendStoryData";
import activeReducer from "../Slices/active";
import createNewStoryReducer from "../Slices/createNewStory";
import createNewPostReducer from "../Slices/createNewPost";

const store = configureStore({
  reducer: {
    showStoryDetails: showStoryDetailsReducer,
    sendStoryData: sendStoryDataReducer,
    active: activeReducer,
    createNewStory: createNewStoryReducer,
    createNewPost : createNewPostReducer
  },
});

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
