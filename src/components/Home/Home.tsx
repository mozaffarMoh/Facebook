import "./Home.scss";
import { MediaQuery } from "../MediaQuery";
import HomeNavigation from "./home-navigation/home-navigation";
import HomePosts from "./home-posts/home-posts";
import HomeContacts from "./home-contacts/home-contacts";
import Stories from "./home-stories/HomeStories";
import Header from "../Header/Header";
import StoryDetails from "./home-stories/story-details/story-details";
import { RootType } from "../../store/store";
import { useSelector } from "react-redux";
import React from "react";
import CreatePost from "./home-posts/create-post/create-post";

const Home = () => {
  const { isScreen900, isScreen1000 } = MediaQuery();
  const showStoryDetails = useSelector(
    (state: RootType) => state.showStoryDetails.value
  );

  const [showBrightness, setShowBrightness] = React.useState(false);

  return !showStoryDetails ? (
    <>
      {showBrightness && (
        <div className="brightness-create-new-post">
          <CreatePost setShowBrightness={setShowBrightness} />
        </div>
      )}
      <Header />
      <div className="flex w-full vh-100 bg-slate-100 p-4">
        {!isScreen1000 && <HomeNavigation />}
        <div
          className={`${
            !isScreen900 ? "w-4/5" : "w-full"
          } flex flex-col items-center`}
        >
          <Stories />
          <HomePosts setShowBrightness={setShowBrightness} />
        </div>

        {/* Contacts */}
        {!isScreen900 && <HomeContacts />}
      </div>
    </>
  ) : (
    <StoryDetails />
  );
};

export default Home;
