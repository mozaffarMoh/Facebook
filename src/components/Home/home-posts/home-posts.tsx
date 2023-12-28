import "./home-posts.scss";
import profilePicture from "../../../assets/images/header/profile-picture.jpg";
import { MediaQuery } from "../../MediaQuery";
import { postsArray } from "./postsArray";
import { ThreeDots, XLg } from "react-bootstrap-icons";

const HomePosts = () => {
  const { isScreen555, isScreen666 } = MediaQuery();

  const createPostNavigation = [
    {
      img: "https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/c0dWho49-X3.png",
      title: "Live video",
    },
    {
      img: "https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png",
      title: "Photo/video",
    },
    {
      img: "https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png",
      title: "Feeling/activity",
    },
  ];
  isScreen666 && createPostNavigation.pop();

  return (
    <div className={`posts-section pb-5 ${isScreen666 && "w-full"}`}>
      {/* Create Post */}
      <div className="create-post">
        <div className="create-post-first">
          <div className="profile-section-icon profile-icon w-10 h-10 hover:opacity-90">
            <img src={profilePicture} alt="profile" />
          </div>
          <input type="text" placeholder="What's on your mind, Mozaffar?" />
        </div>
        <div className="splitter-line mt-0 w-11/12"></div>
        <div className="create-post-second">
          {createPostNavigation.map((item, index) => {
            return (
              <div
                className={`${
                  isScreen666 && "w-full"
                } create-post-second-item hover:cursor-pointer hover:bg-slate-200`}
                key={index}
              >
                <img height="24" width="24" alt="" src={item.img} />
                <p className="text-sm ml-2">{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Posts */}
      <div className="posts">
        {postsArray.map((post: any, index) => {
          return (
            <div className="post pt-3" key={index}>
              {/* Header */}
              <div className="post-header justify-between items-start px-5">
                <div className="flex">
                  <img src={post.pageImg} alt="Image" />
                  <div className="flex flex-col justify-center">
                    <h2>{post.title}</h2>
                    <p>{post.date}</p>
                  </div>
                </div>
                <div className="flex text-xl justify-between items-center w-14 h-10">
                  <div className="post-header-icon"><ThreeDots /></div>
                  <div className="post-header-icon"><XLg /></div>
                </div>
              </div>

              {/* Content */}
              <div className={`post-text p-5 ${isScreen555 && "text-sm"}`}>
                {post.text}
              </div>

              {/* Media */}
              <div className="post-media w-100 flex ">
                {post.mediaImage && <img src={post.mediaImage} alt="" />}
                {post.mediaVideo && <video src={post.mediaVideo} controls />}
              </div>

              {/* Reactions */}
              <div className="reactions w-full p-4 text-gray-500 font-bold">
                {/* Icons */}
                <div className="reactions-felling-icons flex justify-between">
                  <div className="flex items-center">
                    {post.reactions.like && <img src={post.reactions.like} />}
                    {post.reactions.love && <img src={post.reactions.love} />}
                    {post.reactions.haha && <img src={post.reactions.haha} />}
                    {post.reactions.care && <img src={post.reactions.care} />}
                    {post.reactions.wow && <img src={post.reactions.wow} />}
                    {post.reactions.sad && <img src={post.reactions.sad} />}
                    {post.reactions.angry && <img src={post.reactions.angry} />}

                    <p className="ml-1">{post.reactions.num}</p>
                  </div>
                  <div className="flex items-center">
                    <p>{post.commentsNum}</p>
                    <i
                      className="reactions-icon"
                      style={{ backgroundPosition: "0px -1384px" }}
                    ></i>
                    <p>{post.shareNum}</p>
                    <i
                      className="reactions-icon"
                      style={{ backgroundPosition: "0px -1401px" }}
                    ></i>
                  </div>
                </div>
                <div className="splitter-line"></div>
                {/* Buttons */}
                <div className="reactions-buttons flex justify-center items-center mt-1">
                  <div className="reactions-buttons flex justify-center items-center w-1/3 rounded-md hover:bg-slate-100 cursor-pointer p-1">
                    <i
                      className="reactions-icon"
                      style={{ backgroundPosition: "0 -739px" }}
                    ></i>
                    <p>Like</p>
                  </div>
                  <div className="reactions-buttons flex justify-center items-center w-1/3 rounded-md hover:bg-slate-100 cursor-pointer p-1">
                    <i
                      className="reactions-icon"
                      style={{ backgroundPosition: "0 -550px" }}
                    ></i>
                    <p>Comment</p>
                  </div>
                  <div className="reactions-buttons flex justify-center items-center w-1/3 rounded-md hover:bg-slate-100 cursor-pointer p-1">
                    <i
                      className="reactions-icon"
                      style={{ backgroundPosition: "0 -886px" }}
                    ></i>
                    <p>Share</p>
                  </div>
                </div>
                <div className="splitter-line mt-1"></div>
                <div className="reactions-comments h-11 mt-3 p-0">
                  <div className="profile-section-icon profile-icon w-10 h-10 hover:opacity-90">
                    <img src={profilePicture} alt="profile" />
                  </div>
                  <input
                    type="text"
                    placeholder="Write a public comment..."
                    className={`font-thin ${isScreen555 && "text-sm"}`}
                  />
                  <div className="comments-input-icons">
                    <i
                      className="reactions-icon"
                      style={{ backgroundPosition: "0px -1078px" }}
                    ></i>
                    <i
                      className="reactions-icon"
                      style={{ backgroundPosition: "0px -1180px" }}
                    ></i>
                    <i
                      className="reactions-icon"
                      style={{ backgroundPosition: "0px -1112px" }}
                    ></i>
                    <i
                      className="reactions-icon"
                      style={{ backgroundPosition: "0px -1214px" }}
                    ></i>
                    <i
                      className="reactions-icon"
                      style={{ backgroundPosition: "0px -1333px" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePosts;
