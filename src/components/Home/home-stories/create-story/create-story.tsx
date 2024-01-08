import "./create-story.scss";
import Header from "../../../Header/Header";
import profilePicture from "../../../../assets/images/header/profile-picture.jpg";
import React from "react";

const CreateStory = () => {
  const [showUploadTextDialog, setShowUploadTextDialog] = React.useState(false);
  const [TextareaLabel, setTextareaLabel] = React.useState("Start typing");
  const [TextareaPlaceholder, setTextareaPlaceholder] = React.useState("");
  const [textreaValue, setTextAreaValue] = React.useState("");

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
  };

  return (
    <>
      <Header />
      <div className="create-story-page">
        {/* Text */}
        <div className="w-1/4 story-text">
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
              <select>
                <li>asd</li>
              </select>

              {/* Background Color */}

              {/* buttons */}
              <div className="flex justify-between">
                <button className="discard-button" onClick={discardChanges}>
                  Discard
                </button>
                <button className="share-button">Share to story</button>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="w-3/4 story-actions">
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
                <div className="text-area"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateStory;
