import "./create-story.scss";
import Header from "../../../Header/Header";
import profilePicture from "../../../../assets/images/header/profile-picture.jpg";
import React from "react";
import { colorsArray } from "./colorsArray";
import { MediaQuery } from "../../../MediaQuery";
import { Resizable } from "react-resizable";
import Draggable from "react-draggable";

const CreateStory = () => {
  const resizableRef: any = React.useRef(null);
  const { isScreen1000 } = MediaQuery();
  const [focused, setFocused] = React.useState(false);
  const [showUploadTextDialog, setShowUploadTextDialog] = React.useState(false);
  const [showUploadPhotoDialog, setShowUploadPhtotDialog] =
    React.useState(false);
  const [photoValue, setPhotoValue] = React.useState<File | null>(null);
  const [showAddText, setShowAddText] = React.useState(false);
  const [TextareaLabel, setTextareaLabel] = React.useState("Start typing");
  const [TextareaPlaceholder, setTextareaPlaceholder] = React.useState("");
  const [isTextareaHidden, setIsTextareaHidden] = React.useState(false);
  const [resizableTextArray, setResizableTextArray]: any = React.useState([]);
  const [resizableText, setResizableText] = React.useState("");
  const [textareaValue, setTextAreaValue] = React.useState("");
  const [fontType, setFontType] = React.useState("sans-serif");
  const [selectBG, setSelectBG] = React.useState("");
  const resizableRefs: React.RefObject<HTMLDivElement>[] =
    resizableTextArray.map(() => React.createRef());

  /* Input Text on Focus */
  const inputTextOnFocus = () => {
    setTextareaPlaceholder("Start typing");
    setTextareaLabel("Text");
  };

  /* Input Text on Blur */
  const inputTextOnBlur = () => {
    if (!textareaValue) {
      setTextareaPlaceholder("");
      setTextareaLabel("Start typing");
    }
  };

  /* Discard Changes */
  const discardChanges = () => {
    setTextAreaValue("");
    setShowUploadTextDialog(false);
    setShowUploadPhtotDialog(false);
    setShowAddText(false);
    setPhotoValue(null);
    setIsTextareaHidden(false);
    setResizableTextArray([]);
    setFontType("sans-serif");
    setSelectBG("");
  };

  /* Upload Image */
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhotoValue(event.target.files[0]);
      event.target.value = "";
    }
  };

  /* Toggle Textarea visibility */
  const toggleTextareaVisibility = () => {
    setShowAddText(true);
    setIsTextareaHidden(false);
  };

  /* Set value to resizable texts Array when click on outside */
  React.useEffect(() => {
    let resizableTextNew = resizableText;
    const handleClickOutside = (event: any) => {
      if (
        resizableRef.current &&
        !resizableRef.current.contains(event.target)
      ) {
        setIsTextareaHidden(true);
        if (resizableText !== "") {
          let newArray = resizableTextArray;
          newArray.push(resizableTextNew);
          setResizableTextArray([...newArray]);
          setResizableText("");
        }
      }
    };
    if (!isTextareaHidden) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [resizableText || isTextareaHidden]);

  return (
    <>
      <Header />
      <div className="create-story-page">
        {/* Text */}
        {!isScreen1000 && (
          <div
            className={`story-text overflow-x-hidden ${
              focused ? "overflow-y-auto" : "overflow-y-hidden"
            }`}
            onMouseEnter={() => setFocused(true)}
            onMouseLeave={() => setFocused(false)}
          >
            <div className="flex w-80 justify-between py-5">
              <h1>Your Story</h1>
              <div className="icon-circle">
                <i
                  className="create-story-icons setting-icon"
                  style={{ backgroundPosition: "0px -553px" }}
                ></i>
              </div>
            </div>
            <div className="flex items-center w-80">
              <div className="profile-section-icon profile-icon w-14 h-14 hover:opacity-90">
                <img src={profilePicture} alt="profile" />
              </div>
              <p>Mozaffar Mohammad</p>
            </div>
            <div className="splitter-line"></div>
            {/* TEXT STORY */}
            {showUploadTextDialog && (
              <div className="type-story p-3">
                {/* Label and Textarea */}
                <label
                  className={` start-typing ${
                    TextareaPlaceholder && "moveLabelToTop"
                  }`}
                  htmlFor="textareaID"
                >
                  {TextareaLabel}
                </label>
                <textarea
                  className="text-input py-2 pt-5 px-4 mt-3"
                  id="textareaID"
                  placeholder={TextareaPlaceholder}
                  onFocus={inputTextOnFocus}
                  onBlur={inputTextOnBlur}
                  value={textareaValue}
                  onChange={(e) => setTextAreaValue(e.target.value)}
                ></textarea>

                {/* Font type */}
                <select
                  name="choice"
                  className="select-font px-2"
                  onChange={(e) => setFontType(e.target.value)}
                >
                  <option value="sans-serif">Simple</option>
                  <option value="Gill Sans">Clean</option>
                  <option value="cursive">Casual</option>
                  <option value="fantasy">Fancy</option>
                  <option value="monospace">Clean</option>
                </select>

                {/*Select Background Color */}
                <div className="select-bg">
                  <p>Backgrounds</p>
                  <div className="colors">
                    {colorsArray.map((color, index) => {
                      return (
                        <div
                          key={index}
                          className={`color ${
                            color.value === selectBG && "show-border"
                          }`}
                          style={{ backgroundImage: color.value }}
                          onClick={() => setSelectBG(color.value)}
                        ></div>
                      );
                    })}
                  </div>
                </div>

                {/* buttons */}
                <div className="buttons">
                  <button className="discard-button" onClick={discardChanges}>
                    Discard
                  </button>
                  <button className="share-button">Share to story</button>
                </div>
              </div>
            )}
            {/* PHOTO STORY */}
            {showUploadPhotoDialog && (
              <div className="photo-story">
                {/* Add Text */}
                <div className="add-text" onClick={toggleTextareaVisibility}>
                  <div className="Aa-icon">
                    <p>Aa</p>
                  </div>
                  <p>Add Text</p>
                </div>

                {/* buttons */}
                <div className="buttons">
                  <button className="discard-button" onClick={discardChanges}>
                    Discard
                  </button>
                  <button className="share-button">Share to story</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div
          className={`story-actions `}
          style={{ width: `${isScreen1000 && "100%"}` }}
        >
          {/* Upload Text and photo */}
          {(!showUploadTextDialog || !showUploadPhotoDialog) && (
            <div
              className={`story-actions `}
              style={{ width: `${isScreen1000 && "100%"}` }}
            >
              <label htmlFor="selectImage" className="upload upload-photo">
                <div className="icon-circle">
                  <i
                    className="create-story-icons photo-icon"
                    style={{ backgroundPosition: "0px -428px" }}
                  ></i>
                </div>
                <p>Create a photo story</p>
                <div className="brightness"></div>
                <input
                  type="file"
                  hidden
                  id="selectImage"
                  onChange={handleImageUpload}
                  onClick={() => setShowUploadPhtotDialog(true)}
                />
              </label>

              <div
                className="upload upload-text"
                id="selectImage"
                onClick={() => setShowUploadTextDialog(true)}
              >
                <div className="icon-circle">
                  <h1>Aa</h1>
                </div>
                <p>Create a text story</p>
                <div className="brightness"></div>
              </div>
            </div>
          )}

          {/* Dialogs */}
          {(showUploadTextDialog || showUploadPhotoDialog) && (
            <div className="upload-text-dialog py-2 px-5">
              <p>Preview</p>
              <div className="black-area">
                {showUploadTextDialog ? (
                  <div
                    className="text-area-value"
                    style={{ backgroundImage: selectBG }}
                  >
                    <h1 style={{ fontFamily: `${fontType}` }}>
                      {textareaValue ? textareaValue : "Start Typing"}
                    </h1>
                  </div>
                ) : (
                  photoValue && (
                    <div className="photo-area-all">
                      <div className="photo-area">
                        <div>
                          <img
                            src={URL.createObjectURL(photoValue)}
                            alt="uploaded image"
                          />
                          {showAddText && !isTextareaHidden && (
                            <Draggable nodeRef={resizableRef}>
                              <textarea
                                ref={resizableRef}
                                placeholder="Start typing"
                                className="textarea-on-photo"
                                onChange={(e) =>
                                  setResizableText(e.target.value)
                                }
                              ></textarea>
                            </Draggable>
                          )}
                          {isTextareaHidden &&
                            resizableTextArray &&
                            resizableTextArray.map(
                              (item: any, index: number) => {
                                return (
                                  <Draggable
                                    nodeRef={resizableRefs[index]}
                                    key={index}
                                    position={item.position}
                                  >
                                    <Resizable
                                      width={100}
                                      height={100}
                                      minConstraints={[50, 50]}
                                      maxConstraints={[500, 500]}
                                    >
                                      <div
                                        className="cursor-pointer"
                                        ref={resizableRefs[index]}
                                      >
                                        <h1>
                                          {item}
                                        </h1>
                                      </div>
                                    </Resizable>
                                  </Draggable>
                                );
                              }
                            )}
                        </div>
                      </div>
                      <div className="photo-area-label">
                        <h2>Select photo to crop and rotate</h2>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateStory;
