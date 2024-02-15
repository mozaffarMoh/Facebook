import "./create-story.scss";
import Header from "../../../Header/Header";
import profilePicture from "../../../../assets/images/header/profile-picture.jpg";
import React from "react";
import { bgColorsArray } from "./bgColorsArray";
import { colorsArray } from "./colorsArray";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { addNewStory } from "../../../../Slices/createNewStory";
import { useNavigate } from "react-router-dom";
import { Rnd } from "react-rnd";
import { X } from "react-bootstrap-icons";

const CreateStory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resizableRef: any = React.useRef(null);
  const resizableTextRefs: any = React.useRef([]);
  const [focused, setFocused] = React.useState(false);
  const [showUploadTextDialog, setShowUploadTextDialog] = React.useState(false);
  const [showUploadPhotoDialog, setShowUploadPhtotDialog] =
    React.useState(false);
  const [photoValue, setPhotoValue]: any = React.useState(null);
  const [showAddText, setShowAddText] = React.useState(false);
  const [TextareaLabel, setTextareaLabel] = React.useState("Start typing");
  const [TextareaPlaceholder, setTextareaPlaceholder] = React.useState("");
  const [isTextareaHidden, setIsTextareaHidden] = React.useState(false);
  const [resizableTextArray, setResizableTextArray]: any = React.useState([]);
  const [resizableText, setResizableText] = React.useState("");
  const [textareaValue, setTextAreaValue] = React.useState("");
  const [fontType, setFontType] = React.useState("");
  const [fontSizeValue, setFontSizeValue] = React.useState(19.6);
  const [positionValue, setPositionValue] = React.useState({ x: 0, y: 0 });
  const [resizableIndex, setResizableIndex] = React.useState(0);
  const [selectBG, setSelectBG] = React.useState(
    "linear-gradient(to left, rgb(146, 146, 240), rgb(126, 21, 224))"
  );
  const [textPhotoColor, setTextPhotoColor] = React.useState("");

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
    let newText = resizableText;
    let newColor = textPhotoColor;
    let newFontType = fontType;
    let newFontSize = 19.6;
    let newPosition = positionValue;

    const newObject = {
      text: newText,
      color: newColor,
      fontType: newFontType,
      fontSize: newFontSize,
      position: newPosition,
    };

    const handleClickOutside = (event: any) => {
      if (
        resizableRef.current &&
        !resizableRef.current.contains(event.target)
      ) {
        if (resizableText !== "") {
          setIsTextareaHidden(true);
          let newArray = resizableTextArray;
          newArray.push(newObject);
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
  }, [fontType, textPhotoColor, resizableText]);

  /* Change fontSize for resizable text */
  const handleChangeFontSize = (index: number) => {
    const width =
      resizableTextRefs.current[index]?.resizable?.resizable?.clientWidth;
    if (width >= 98 && width <= 250) {
      const FontSizeInPercent = (width * 20) / 100;
      setFontSizeValue(FontSizeInPercent);
    }

    setResizableIndex(index);
  };

  /* Set New Font Size for resizableTextArray */
  React.useEffect(() => {
    if (fontSizeValue !== 19.6) {
      setResizableTextArray((prevArray: any) => {
        const newArray = [...prevArray];
        newArray[resizableIndex] = {
          ...newArray[resizableIndex],
          fontSize: fontSizeValue,
        };
        return newArray;
      });
    }
  }, [fontSizeValue]);

  /* Remove Item from ResizableTextArray */
  const removeItemFromResizableTextArray = (index: number) => {
    setResizableTextArray((prevArray: any) => {
      const newArray = [...prevArray];
      newArray.splice(index, 1);
      return newArray;
    });
  };

  /* Change position for resizable text */
  const handleChangePosition = (index: number) => {
    const x = resizableTextRefs?.current[index]?.draggable?.state.x;
    const y = resizableTextRefs?.current[index]?.draggable?.state.y;
    setPositionValue({ x: x, y: y });
    setResizableIndex(index);
  };

  /* Add new position to resiableTextArray */
  React.useEffect(() => {
    if (positionValue.x !== 0 && positionValue.y !== 0) {
      setResizableTextArray((prevArray: any) => {
        const newArray = [...prevArray];
        newArray[resizableIndex] = {
          ...newArray[resizableIndex],
          position: positionValue,
        };
        return newArray;
      });
      setPositionValue({ x: 0, y: 0 });
    }
  }, [positionValue, resizableIndex]);

  /* Share Text Story */
  const shareTaxtStory = () => {
    dispatch(
      addNewStory({
        img: profilePicture,
        title: "Your story",
        text: textareaValue,
        font: fontType,
        bgColor: selectBG,
        active: true,
        activeText: "just now",
        visible: "friends",
      })
    );
    discardChanges();
    navigate("/Facebook");
  };

  /* Share Photo Story */
  const sharePhotoStory = () => {
    dispatch(
      addNewStory({
        img: profilePicture,
        title: "Your story",
        storyContent: URL.createObjectURL(photoValue),
        textArray: resizableTextArray,
        font: fontType,
        color: textPhotoColor,
        bgColor: selectBG,
        active: true,
        activeText: "just now",
        visible: "friends",
      })
    );
    discardChanges();
    navigate("/Facebook");
  };

  return (
    <>
      <Header />
      <div className="create-story-page">
        {/* Text */}

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
                className={`start-typing ${
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
                <option value="monospace">Monospace</option>
              </select>

              {/*Select Background Color */}
              <div className="select-bg">
                <p>Backgrounds</p>
                <div className="colors">
                  {bgColorsArray.map((color, index) => {
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
                <button className="share-button" onClick={shareTaxtStory}>
                  Share to story
                </button>
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
                <button className="share-button" onClick={sharePhotoStory}>
                  Share to story
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={`story-actions `}>
          {/* Upload Text and photo */}
          {(!showUploadTextDialog || !showUploadPhotoDialog) && (
            <div className={`story-actions `}>
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
                            <div ref={resizableRef}>
                              {/* Text Area on photo */}
                              <Draggable nodeRef={resizableRef}>
                                <textarea
                                  ref={resizableRef}
                                  placeholder="Start typing"
                                  className="textarea-on-photo"
                                  value={resizableText}
                                  style={{
                                    fontFamily: `${fontType}`,
                                    color: `${textPhotoColor}`,
                                    caretColor: `${textPhotoColor}`,
                                  }}
                                  onChange={(e) =>
                                    setResizableText(e.target.value)
                                  }
                                ></textarea>
                              </Draggable>

                              {/* Custom photo Text */}
                              <div className="custom-photo-value">
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
                                  <option value="monospace">Monospace</option>
                                </select>

                                {/*Select text color */}
                                <div className="select-text-color">
                                  <p>Text Color</p>
                                  <div className="colors">
                                    {colorsArray.map((color, index) => {
                                      return (
                                        <div
                                          key={index}
                                          className={`color ${
                                            color.value === textPhotoColor &&
                                            "show-border"
                                          }`}
                                          style={{
                                            backgroundColor: color.value,
                                          }}
                                          onClick={() =>
                                            setTextPhotoColor(color.value)
                                          }
                                        ></div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Photo Text */}
                          {resizableTextArray &&
                            resizableTextArray.map(
                              (item: any, index: number) => {
                                return (
                                  <Rnd
                                    minWidth={50}
                                    maxWidth={250}
                                    minHeight={25}
                                    maxHeight={100}
                                    onResize={() => handleChangeFontSize(index)}
                                    onDrag={() => handleChangePosition(index)}
                                    key={index}
                                    ref={(el) =>
                                      (resizableTextRefs.current[index] = el)
                                    }
                                    className="resizable-textArray-element"
                                  >
                                    <div className="resizable-delete-circle flexCenter">
                                      <X
                                        onClick={() =>
                                          removeItemFromResizableTextArray(
                                            index
                                          )
                                        }
                                      />
                                    </div>
                                    <div
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        whiteSpace: "nowrap",
                                      }}
                                      className="flexCenter"
                                    >
                                      <p
                                        style={{
                                          color: `${item.color || "white"}`,
                                          fontFamily: `${item.fontType}`,
                                          fontSize: `${item.fontSize}px`,
                                        }}
                                      >
                                        {item.text}
                                      </p>
                                    </div>
                                  </Rnd>
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
