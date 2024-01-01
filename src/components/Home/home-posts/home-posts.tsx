import "./home-posts.scss";
import profilePicture from "../../../assets/images/header/profile-picture.jpg";
import { MediaQuery } from "../../MediaQuery";
import { postsArray } from "./postsArray";
import { ThreeDots, XLg } from "react-bootstrap-icons";
import Animations from "../../Animations/Animations";
import React from "react";
import { ReactionsIconsArray } from "./ReactionsIconsArray";

const HomePosts = () => {
  const { isScreen555, isScreen666 } = MediaQuery();
  const [reactionState, setReactionState] = React.useState("");
  const [showAnimations, setShowAnimations] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [userComment, setUserComment] = React.useState("");

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

  /* Change Reaction State */
  const handleReactionState = (value: any) => {
    if (reactionState === "") {
      setReactionState("Like");
    }
    if (value !== reactionState) {
      setReactionState(value);
    } else {
      setReactionState("");
    }
    setTimeout(() => {
      setShowAnimations(false);
    }, 300);
  };

  /* Default press is Like */
  const likeButton = () => {
    setReactionState("Like");
    setShowAnimations(false);
  };

  /* Disable Reaction */
  const disableReaction = () => {
    setReactionState("");
    setShowAnimations(false);
  };

  /* Change Reaction Color */
  const changeReactionColor = () => {
    if (reactionState === "") {
      return "text-slate-600";
    } else if (reactionState === "Like") {
      return "text-blue-600 ml-2 p-0.5";
    } else if (reactionState === "Love") {
      return "text-red-500 ml-2 p-0.5";
    } else {
      return "text-yellow-500 ml-2 p-0.5";
    }
  };

  /* Add Comment */
  const addComment = () => {
    if (userComment) {
      const newArray: any = [...comments];
      newArray.push({
        comment: userComment,
        img: profilePicture,
        title: "Mozaffar Mohammad",
      });
      setComments(newArray);
      setUserComment("");
    }
  };

  /* Add Comment when press Enter */
  React.useEffect(() => {
    const handleEnterPress = (event: any) => {
      if (event.keyCode === 13) {
        addComment();
      }
    };
    document.addEventListener("keydown", handleEnterPress);
  }, [addComment]);

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
                  <div className="post-header-icon">
                    <ThreeDots />
                  </div>
                  <div className="post-header-icon">
                    <XLg />
                  </div>
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
                    {post.reactions.like && (
                      <img src={ReactionsIconsArray[0].Like} />
                    )}
                    {post.reactions.love && (
                      <img src={ReactionsIconsArray[0].Love} />
                    )}
                    {post.reactions.care && (
                      <img src={ReactionsIconsArray[0].Care} />
                    )}
                    {post.reactions.haha && (
                      <img src={ReactionsIconsArray[0].Haha} />
                    )}
                    {post.reactions.wow && (
                      <img src={ReactionsIconsArray[0].Wow} />
                    )}
                    {post.reactions.sad && (
                      <img src={ReactionsIconsArray[0].Sad} />
                    )}
                    {post.reactions.angry && (
                      <img src={ReactionsIconsArray[0].Angry} />
                    )}

                    <p className="ml-1">
                      {reactionState
                        ? post.reactions.num + 1
                        : post.reactions.num}
                    </p>
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
                <div className="reactions-buttons h-fit mt-1 relative">
                  <div
                    className="reactions-button like-button w-1/3"
                    onMouseEnter={() => setShowAnimations(true)}
                    onMouseLeave={() =>
                      setTimeout(() => {
                        setShowAnimations(false);
                      }, 300)
                    }
                  >
                    {showAnimations && (
                      <div className="animations">
                        <Animations reaction={handleReactionState} />
                      </div>
                    )}

                    {reactionState === "" ? (
                      <div
                        className="flex justify-center items-center"
                        onClick={likeButton}
                      >
                        <i
                          className="reactions-icon"
                          style={{ backgroundPosition: "0px -760px" }}
                          onClick={likeButton}
                        ></i>
                        <p onClick={likeButton}>Like</p>
                      </div>
                    ) : (
                      <div
                        className="flex justify-center items-center"
                        onClick={disableReaction}
                      >
                        <img
                          src={ReactionsIconsArray[0][reactionState]}
                          width={24}
                          height={24}
                        />
                        <p className={`${changeReactionColor()}`}>
                          {reactionState}
                        </p>{" "}
                      </div>
                    )}
                  </div>
                  <div className="reactions-button w-1/3">
                    <i
                      className="reactions-icon"
                      style={{ backgroundPosition: "0 -550px" }}
                    ></i>
                    <p>Comment</p>
                  </div>
                  <div className="reactions-button w-1/3">
                    <i
                      className="reactions-icon"
                      style={{ backgroundPosition: "0 -886px" }}
                    ></i>
                    <p>Share</p>
                  </div>
                </div>
                <div className="splitter-line mt-1"></div>

                {/* Comments */}
                {comments &&
                  comments.map((item: any, index: number) => {
                    return (
                      <div className="flex h-100 mt-2" key={index}>
                        <div className="profile-section-icon profile-icon w-10 h-10 hover:opacity-90">
                          <img src={item.img} alt="" />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex flex-col bg-slate-200 rounded-3xl py-1 px-3 ml-2 text-black">
                            <p className="text-md">{item.title}</p>
                            <body className="text-sm font-thin">
                              {item.comment}
                            </body>
                          </div>
                          <div className="flex w-60 justify-around items-center py-1">
                            <body className="text-sm font-thin ml-5">just now</body>
                            <p>Like</p>
                            <p>Reply</p>
                            <p>Share</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {/* Write a comment */}
                <div className="reactions-comments h-11 mt-3 p-0">
                  <div className="profile-section-icon profile-icon w-10 h-10 hover:opacity-90">
                    <img src={profilePicture} alt="profile" />
                  </div>
                  <input
                    type="text"
                    placeholder="Write a public comment..."
                    className={`font-thin ${isScreen555 && "text-sm"}`}
                    value={userComment}
                    onChange={(e: any) => setUserComment(e.target.value)}
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
                    <i
                      className="reactions-icon-send"
                      style={{ backgroundPosition: "0px -1318px" }}
                      onClick={addComment}
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
