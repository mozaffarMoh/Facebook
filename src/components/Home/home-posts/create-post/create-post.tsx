import "./create-post.scss";
import { bgColorsArray } from "../../home-stories/create-story/bgColorsArray";
import { XLg } from "react-bootstrap-icons";
import profilePicture from "../../../../assets/images/header/profile-picture.jpg";
import notAllowedIcon from "../../../../assets/images/posts/notAllowed.svg";
import colorsImage from "../../../../assets/images/posts/colors.png";
import React from "react";
import { useDispatch } from "react-redux";
import { addNewPost } from "../../../../Slices/createNewPost";

const CreatePost = ({ setShowBrightness }: any) => {
  const dispatch = useDispatch();
  const [showColors, setShowColors] = React.useState(false);
  const [postButtonActive, setPostButtonActive] = React.useState(false);
  const [showAddPhoto, setShowAddPhoto] = React.useState(false);
  const [addPhotoNotAllowed, setAddPhotoNotAllowed] = React.useState(false);
  const [bgColor, setBgColor] = React.useState("");
  const [bgColorBorder, setBgColorBorder] = React.useState(0);
  const [photoValue, setPhotoValue]: any = React.useState(null);
  const [isPhotoUploaded, setIsPhotoUploaded] = React.useState(false);
  const [textareaValue, setTextareaValue] = React.useState("");

  /* Handle Close */
  const handleClose = () => {
    setShowBrightness(false);
  };

  /* Handle add new photo */
  const handleUploadNewPhoto = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setPhotoValue(event.target.files[0]);
      event.target.value = "";
      setIsPhotoUploaded(true);
      setPostButtonActive(true);
    }
  };

  /* Handle Close Add photo */
  const handleCloseAddPhoto = () => {
    setShowAddPhoto(false);
    setIsPhotoUploaded(false);
    setPhotoValue("");
    !textareaValue && setPostButtonActive(false);
  };

  /* Handle Textarea */
  const handleTextArea = (event: any) => {
    !event && !isPhotoUploaded
      ? setPostButtonActive(false)
      : setPostButtonActive(true);

    setTextareaValue(event.target.value);
  };

  /* Handel Create new post */
  const handleCreatePost = () => {
    if (postButtonActive) {
      dispatch(
        addNewPost({
          pageImg: profilePicture,
          date: "just now",
          title: "Mozaffar Mohammad",
          text: textareaValue,
          mediaImageURL: photoValue,
          reactions: {
            num: 0,
          },
          comments: [],
          currentReaction: "",
          bgColor: bgColor,
          reactionNewPost : true,
        })
      );
      handleClose();
    }
  };

  /* Handle change background color */
  const handleChangeBgColor = (bgColorValue: any, index: number) => {
    setAddPhotoNotAllowed(index === 0 ? false : true);
    setBgColorBorder(index);
    if (bgColorValue === "linear-gradient(white, white)") {
      setBgColor("");
    } else {
      setBgColor(bgColorValue);
    }
  };

  return (
    <div className="create-new-post">
      {/* Header */}
      <div className="create-new-post-header flexCenter">
        <div className="title flexCenter">
          <h1>Create Post</h1>
        </div>
        <div className="close-circle flexCenter" onClick={handleClose}>
          <XLg />
        </div>
      </div>

      {/* Profile */}
      <div className="profile flexStart">
        <img src={profilePicture} />
        <div className="profile-details flexCenterColumnStartItems">
          <p>Mozaffar Mohammad</p>
          <div className="post-visibility flexCenter">
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/zPcex_q0TM1.png"
              className="friends-icon"
            />
            <p>Friends</p>
            <i className="arrow-icon"></i>
          </div>
        </div>
      </div>

      {/* Whats on your mind */}
      <div
        className={`whats-on-your-mind ${bgColor && "flexCenter"}`}
        style={{ backgroundImage: bgColor }}
      >
        <textarea
          className={`${bgColor && "text-center text-slate-50"}`}
          placeholder="What's on your mind, Mozaffar ?"
          onChange={(event: any) => handleTextArea(event)}
        />
        {showAddPhoto && (
          <div className="add-photo-container">
            <input
              type="file"
              id="upload-new-photo"
              hidden
              onChange={(e: any) => handleUploadNewPhoto(e)}
            />
            <div
              className="add-photo flexCenterColumn"
              style={{
                backgroundImage: `${
                  photoValue && `url(${URL.createObjectURL(photoValue)})`
                }`,
              }}
            >
              <div
                className="close-circle flexCenter"
                onClick={handleCloseAddPhoto}
              >
                <XLg />
              </div>
              {!isPhotoUploaded && (
                <label className="flexCenterColumn" htmlFor="upload-new-photo">
                  <div className="add-photo-icon-cover flexCenter">
                    <i className="add-photo-icon"></i>
                  </div>
                  <h1>Add Photos/Videos</h1>
                  <p>or drag and drop</p>
                </label>
              )}
            </div>
          </div>
        )}
      </div>

      {/* colors */}
      <div className="colors flexStart">
        <div className="colors-squares-container flexStart">
          {showColors && !showAddPhoto ? (
            <div className="colors-squares flexCenter">
              <div
                className="colors-arrow-container flexCenter"
                onClick={() => setShowColors(false)}
              >
                <i className="colors-arrow"></i>
              </div>
              {bgColorsArray.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="colors-square"
                    style={{
                      backgroundImage: item.value,
                      border: `${
                        bgColorBorder === index ? "2px solid blue" : "none"
                      }`,
                    }}
                    onClick={() => handleChangeBgColor(item.value, index)}
                  ></div>
                );
              })}
            </div>
          ) : (
            <img
              src={colorsImage}
              width={40}
              style={{ cursor: `${showAddPhoto ? "not-allowed" : "pointer"}` }}
              onClick={() => setShowColors(true)}
            />
          )}
        </div>
        <i className="emoji-icon"></i>
      </div>

      {/* Add to your post  */}
      <div className="add-to-your-post-container">
        <div className="add-to-your-post flexBetween">
          <div
            className="text flexStart"
            onClick={() => setShowAddPhoto(!addPhotoNotAllowed ? true : false)}
          >
            <p
              style={{
                cursor: `${addPhotoNotAllowed ? "not-allowed" : "pointer"}`,
              }}
            >
              Add to your post
            </p>
          </div>
          <div className="images flexStart">
            <div
              className="image-cover flexCenter"
              onClick={() =>
                setShowAddPhoto(!addPhotoNotAllowed ? true : false)
              }
              style={{
                cursor: `${addPhotoNotAllowed ? "not-allowed" : "pointer"}`,
              }}
            >
              {addPhotoNotAllowed ? (
                <img src={notAllowedIcon} />
              ) : (
                <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png" />
              )}
            </div>
            <div className="image-cover flexCenter">
              <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/b37mHA1PjfK.png" />
            </div>
            <div className="image-cover flexCenter">
              <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png" />
            </div>
            <div className="image-cover flexCenter">
              <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/8zlaieBcZ72.png" />
            </div>
            <div className="image-cover flexCenter">
              <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/q7MiRkL7MLC.png" />
            </div>
            <div className="image-cover flexCenter">
              <i className="three-dots"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Post button */}
      <div className="post-button-container">
        <button
          className={`post-button flexCenter ${
            postButtonActive && "post-button-active"
          }`}
          onClick={handleCreatePost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
