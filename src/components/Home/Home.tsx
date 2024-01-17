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

const Home = () => {
  const { isScreen900, isScreen1000 } = MediaQuery();
  const showStoryDetails = useSelector(
    (state: RootType) => state.showStoryDetails.value
  );

  return !showStoryDetails ? (
    <>
      <Header />
      <div className="flex w-full vh-100 bg-slate-100 p-4 overflow-auto">
        {!isScreen1000 && <HomeNavigation />}
        <div
          className={`${
            !isScreen900 ? "w-4/5" : "w-full"
          } flex flex-col items-center`}
        >
          <Stories />
          <HomePosts />
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