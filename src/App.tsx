import "./App.scss";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import StoryDetails from "./components/Home/home-stories/story-details/story-details";
import { useSelector } from "react-redux";
import { RootType } from "./store/store";

function App() {
  const showStoryDetails = useSelector(
    (state: RootType) => state.showStoryDetails.value
  );
  return !showStoryDetails ? (
    <>
      <Header />
      <Home />
    </>
  ) : (
    <StoryDetails />
  );
}

export default App;