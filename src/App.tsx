import "./App.scss";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import CreateStory from "./components/Home/home-stories/create-story/create-story";
import OtherPages from "./components/OtherPages/OtherPages";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Facebook/" element={<Home />} />
          <Route path="/Facebook/create-story/" element={<CreateStory />} />
          <Route
            path="/Facebook/videos/"
            element={<OtherPages pageName="Videos" />}
          />
          <Route
            path="/Facebook/groups/"
            element={<OtherPages pageName="Groups" />}
          />
          <Route
            path="/Facebook/gaming/"
            element={<OtherPages pageName="Gaming" />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
