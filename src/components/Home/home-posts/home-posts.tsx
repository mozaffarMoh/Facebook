import "./home-posts.scss";
import profilePicture from "../../../assets/images/header/profile-picture.jpg";
import { MediaQuery } from "../../MediaQuery";
import { postsArray } from "./postsArray";
import { ThreeDots, XLg } from "react-bootstrap-icons";
import Animations from "../../Animations/Animations";
import React from "react";
import { ReactionsIconsArray } from "./ReactionsIconsArray";
import ToolTip from "../../Tooltip/Tooltip";
import { RootType } from "../../../store/store";
import { useSelector } from "react-redux";

const HomePosts = ({ setShowBrightness }: any) => {
  const createPostsArray = useSelector(
    (state: RootType) => state.createNewPost.data
  );
  const { isScreen555, isScreen666 } = MediaQuery();
  const [newPostsArray, setNewPostsArray]: any = React.useState(postsArray);
  const [showAnimations, setShowAnimations] = React.useState(false);
  const [postIndex, setPostIndex] = React.useState(0);
  const [userComment, setUserComment] = React.useState("");
  const [editCommentDialog, setEditCommentDialog] = React.useState(false);
  const [editCommentIndex, setEditCommentIndex] = React.useState(0);
  const [loadedImagesArray, setLoadedImagesArray]: any = React.useState([]);
  const editCommentRef: any = React.useRef(null);

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

  /* wait to load profiles images */
  const handleLoadedImage = (id: number) => {
    if (loadedImagesArray && !loadedImagesArray?.includes(id)) {
      setLoadedImagesArray((prevArray: any) => {
        const newArray = [...prevArray, id];
        return newArray;
      });
    }
  };

  /* Show Create post and show brightness */
  const handleCreatePost = () => {
    setShowBrightness(true);
  };

  /* Add New Post */
  React.useEffect(() => {
    const newPost = createPostsArray[createPostsArray.length - 1];
    if (newPost && !newPostsArray.includes(newPost)) {
      setNewPostsArray((prevArray: any) => [newPost, ...prevArray]);
    }
  }, [createPostsArray]);

  /* Close Dialog when click outside of it */
  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        editCommentRef.current &&
        !editCommentRef.current.contains(event.target)
      ) {
        setEditCommentDialog(false);
      }
    };
    if (editCommentDialog) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  }, [editCommentDialog]);

  /* Change Reaction State */
  const handleReactionState = (index: number) => {
    return (value: string) => {
      setNewPostsArray((prevArray: any) => {
        const newArray = [...prevArray];
        newArray[index] = {
          ...newArray[index],
          currentReaction:
            newPostsArray[index].currentReaction !== value ? value : "",
        };
        return newArray;
      });

      setTimeout(() => {
        setShowAnimations(false);
      }, 300);
    };
  };

  /* Default press is Like */
  const likeButton = (index: number) => {
    setNewPostsArray((prevArray: any) => {
      const newArray = [...prevArray];
      newArray[index] = { ...newArray[index], currentReaction: "Like" };
      return newArray;
    });
    setShowAnimations(false);
  };

  /* Disable Reaction */
  const disableReaction = (index: number) => {
    setNewPostsArray((prevArray: any) => {
      const newArray = [...prevArray];
      newArray[index] = { ...newArray[index], currentReaction: "" };
      return newArray;
    });
    setShowAnimations(false);
  };

  /* Change Reaction Color */
  const changeReactionColor = (currentReaction: string) => {
    if (currentReaction === "") {
      return "text-slate-600";
    } else if (currentReaction === "Like") {
      return "text-blue-600 ml-2 p-0.5";
    } else if (currentReaction === "Love") {
      return "text-red-500 ml-2 p-0.5";
    } else {
      return "text-yellow-500 ml-2 p-0.5";
    }
  };

  /* Add Comment */
  const addComment = (index: number) => {
    if (userComment) {
      setNewPostsArray((prevPostsArray: any) => {
        const updatedPostsArray = [...prevPostsArray];
        updatedPostsArray[index] = {
          ...updatedPostsArray[index],
          comments: [
            ...updatedPostsArray[index].comments,
            {
              comment: userComment,
              img: profilePicture,
              title: "Mozaffar Mohammad",
            },
          ],
        };
        return updatedPostsArray;
      });
      setUserComment("");
    }
  };

  /* Add Comment when press Enter */
  React.useEffect(() => {
    const handleEnterPress = (event: any) => {
      if (event.keyCode === 13) {
        addComment(postIndex);
      }
    };
    document.addEventListener("keydown", handleEnterPress);

    return () => {
      document.removeEventListener("keydown", handleEnterPress);
    };
  }, [addComment]);

  return (
    <div className={`posts-section pb-5 ${isScreen666 && "w-full"}`}>
      {/* Create Post */}
      <div className="create-post">
        <div className="create-post-first">
          <div className="profile-section-icon profile-icon w-10 h-10 hover:opacity-90">
            <img src={profilePicture} alt="profile" />
          </div>
          <input
            type="text"
            readOnly
            placeholder="What's on your mind, Mozaffar?"
            onClick={handleCreatePost}
          />
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
        {newPostsArray.map((post: any, index: number) => {
          return (
            <div className="post pt-3" key={index}>
              {/* Header */}
              <div className="post-header justify-between items-start px-5">
                <div className="flex">
                  {!loadedImagesArray.includes(index) && (
                    <div className="post-page-image-alt flexCenter">
                      <svg
                        className="text-gray-300 animate-spin"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                      >
                        <path
                          d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                          stroke="currentColor"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                          stroke="currentColor"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-500"
                        ></path>
                      </svg>
                    </div>
                  )}
                  <img
                    src={post.pageImg}
                    alt="Image"
                    onLoad={() => handleLoadedImage(index)}
                  />
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
              <div
                className={`post-text p-5 ${isScreen555 && "text-sm"} ${
                  post.bgColor && "flexCenter text-slate-200 h-80 text-4xl"
                }`}
                style={{ backgroundImage: post.bgColor ? post.bgColor : "" }}
              >
                <h1>{post.text}</h1>
              </div>

              {/* Media */}
              {(post.mediaImage || post.mediaImageURL) && (
                <div className="post-media w-100 flex ">
                  {!loadedImagesArray.includes((index + 1) * 10) && (
                    <div className="post-media-alt flexCenter">
                      <svg
                        className="text-gray-300 animate-spin"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        width="70"
                        height="70"
                      >
                        <path
                          d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                          stroke="currentColor"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                          stroke="currentColor"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-500"
                        ></path>
                      </svg>
                    </div>
                  )}
                  {post.mediaImage && (
                    <img
                      src={post.mediaImage}
                      alt=""
                      loading="lazy"
                      onLoad={() => handleLoadedImage((index + 1) * 10)}
                    />
                  )}
                  {post.mediaImageURL && (
                    <img
                      src={URL.createObjectURL(post.mediaImageURL)}
                      alt=""
                      loading="lazy"
                      onLoad={() => handleLoadedImage((index + 1) * 10)}
                    />
                  )}
                </div>
              )}
              {post.mediaVideo && <video src={post.mediaVideo} controls />}

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

                    {post.reactions.num !== 0 && (
                      <p className="ml-1">
                        {newPostsArray[index].currentReaction
                          ? post.reactions.num + 1
                          : post.reactions.num}
                      </p>
                    )}

                    {post.reactionNewPost && post.currentReaction && (
                      <div className="flexCenter gap-2 text-sm">
                        <img
                          src={ReactionsIconsArray[0][post["currentReaction"]]}
                        />
                        <p>you</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    {post.commentsNum && <p>{post.commentsNum}</p>}
                    {post.commentsNum && (
                      <i
                        className="reactions-icon"
                        style={{ backgroundPosition: "0px -1384px" }}
                      ></i>
                    )}
                    {post.shareNum && <p>{post.shareNum}</p>}
                    {post.shareNum && (
                      <i
                        className="reactions-icon"
                        style={{ backgroundPosition: "0px -1401px" }}
                      ></i>
                    )}
                  </div>
                </div>
                <div className="splitter-line"></div>
                {/* Buttons */}
                <div className="reactions-buttons h-fit mt-1 relative">
                  <div
                    className="reactions-button like-button w-1/3"
                    onMouseEnter={() => {
                      setShowAnimations(true);
                      setPostIndex(index);
                    }}
                    onMouseLeave={() =>
                      setTimeout(() => {
                        setShowAnimations(false);
                      }, 300)
                    }
                  >
                    {showAnimations && index === postIndex && (
                      <Animations
                        reaction={handleReactionState(index)}
                        positionInPosts={true}
                      />
                    )}

                    {post.currentReaction === "" ? (
                      <div
                        className="flex justify-center items-center"
                        onClick={() => likeButton(index)}
                      >
                        <i
                          className="reactions-icon"
                          style={{ backgroundPosition: "0px -760px" }}
                          onClick={() => likeButton(index)}
                        ></i>
                        <p onClick={() => likeButton(index)}>Like</p>
                      </div>
                    ) : (
                      <div
                        className="flex justify-center items-center"
                        onClick={() => disableReaction(index)}
                      >
                        <img
                          src={ReactionsIconsArray[0][post.currentReaction]}
                          width={24}
                          height={24}
                        />
                        <p
                          className={`${changeReactionColor(
                            post.currentReaction
                          )}`}
                        >
                          {post.currentReaction}
                        </p>{" "}
                      </div>
                    )}
                  </div>
                  <div className="reactions-button w-1/3">
                    <i
                      className="reactions-icon"
                      style={{ backgroundPosition: "0 -550px" }}
                    ></i>
                    <p>Comments</p>
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
                {post.comments &&
                  post.comments.map((item: any, index: number) => {
                    return (
                      <div className="flex h-100 mt-2" key={index}>
                        <div className="profile-section-icon profile-icon w-10 h-10 hover:opacity-90">
                          <img src={item.img} alt="" />
                        </div>
                        <div>
                          <div className="flex justify-center items-center relative comment">
                            <div className="flex flex-col bg-slate-200 rounded-3xl py-1 px-3 ml-2 text-black">
                              <p className="text-md">{item.title}</p>
                              <span className="text-sm font-thin">
                                {item.comment}
                              </span>
                            </div>
                            {/* Edit comment button */}
                            {!editCommentDialog && (
                              <div
                                className="edit-comment ml-2 hidden"
                                onClick={() => {
                                  setEditCommentDialog(true);
                                  setEditCommentIndex(index);
                                }}
                              >
                                <ToolTip text="Edit or delete this">
                                  <div className="post-header-icon">
                                    <ThreeDots />
                                  </div>
                                </ToolTip>
                              </div>
                            )}

                            {/* Edit comment dialog */}
                            {editCommentDialog &&
                              index === editCommentIndex && (
                                <div
                                  className="edit-comment-dialog"
                                  ref={editCommentRef}
                                >
                                  <div className="edit-comment-option">
                                    Edit
                                  </div>
                                  <div className="edit-comment-option">
                                    Delete
                                  </div>
                                  <svg
                                    aria-hidden="true"
                                    height="12"
                                    viewBox="0 0 25 12"
                                    width="25"
                                    fill="white"
                                  >
                                    <path d="M24.553.103c-2.791.32-5.922 1.53-7.78 3.455l-9.62 7.023c-2.45 2.54-5.78 1.645-5.78-2.487V2.085C1.373 1.191.846.422.1.102h24.453z"></path>
                                  </svg>
                                </div>
                              )}
                          </div>

                          <div className="flex w-48 justify-around items-center py-1">
                            <span className="text-sm font-thin ml-5">
                              just now
                            </span>
                            <p>Like</p>
                            <p>Reply</p>
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
                    placeholder={`${
                      isScreen555
                        ? "Write a comment"
                        : "Write a public comment..."
                    }`}
                    className={`${isScreen555 && "text-sm"} font-thin`}
                    value={userComment}
                    onChange={(e: any) => setUserComment(e.target.value)}
                    onClick={() => setPostIndex(index)}
                  />

                  <div className="comments-input-icons">
                    <i
                      className={`reactions-icon ${isScreen555 && "hidden"}`}
                      style={{ backgroundPosition: "0px -1078px" }}
                    ></i>
                    <i
                      className={`reactions-icon ${isScreen555 && "hidden"}`}
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
                      onClick={() => addComment(index)}
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
