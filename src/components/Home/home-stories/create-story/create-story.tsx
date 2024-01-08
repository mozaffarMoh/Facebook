import "./create-story.scss";
import Header from "../../../Header/Header";
import profilePicture from "../../../../assets/images/header/profile-picture.jpg";
import React from "react";
import { colorsArray } from "./colorsArray";
import { MediaQuery } from "../../../MediaQuery";

const CreateStory = () => {
  const { isScreen1000 } = MediaQuery();
  const [focused, setFocused] = React.useState(false);
  const [showUploadTextDialog, setShowUploadTextDialog] = React.useState(false);
  const [TextareaLabel, setTextareaLabel] = React.useState("Start typing");
  const [TextareaPlaceholder, setTextareaPlaceholder] = React.useState("");
  const [textreaValue, setTextAreaValue] = React.useState("");
  const [fontType, setFontType] = React.useState("sans-serif");
  const [selectBG, setSelectBG] = React.useState("");

  /* Input Text on Focus */
  const inputTextOnFocus = () => {
    setTextareaPlaceholder("Start typing");
    setTextareaLabel("Text");
  };

  /* Input Text on Blur */
  const inputTextOnBlur = () => {
    if (!textreaValue) {
      setTextareaPlaceholder("");
      setTextareaLabel("Start typing");
    }
  };

  /* Discard Changes */
  const discardChanges = () => {
    setTextAreaValue("");
    setShowUploadTextDialog(false);
    setFontType("sans-serif");
    setSelectBG("");
  };

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
                  value={textreaValue}
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
                    {colorsArray.map((color) => {
                      return (
                        <div
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
          </div>
        )}

        {/* Actions */}
        <div
          className={`story-actions `}
          style={{ width: `${isScreen1000 && "100%"}` }}
        >
          {/* Upload Photo */}
          <label htmlFor="selectImage" className="upload upload-photo">
            <div className="icon-circle">
              <i
                className="create-story-icons photo-icon"
                style={{ backgroundPosition: "0px -428px" }}
              ></i>
            </div>
            <p>Create a photo story</p>
            <div className="brightness"></div>
            <input type="file" hidden id="selectImage" />
          </label>

          {/* Upload Text */}
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

          {/* Upload Text Dialog */}
          {showUploadTextDialog && (
            <div className="upload-text-dialog py-2 px-5">
              <p>Preview</p>
              <div className="black-area">
                <div
                  className="text-area-value"
                  style={{ backgroundImage: selectBG }}
                >
                  <h1 style={{ fontFamily: `${fontType}` }}>
                    {textreaValue ? textreaValue : "Start Typing"}
                  </h1>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateStory;
