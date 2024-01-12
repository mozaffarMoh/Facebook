import { CircleFill, Facebook, XLg } from "react-bootstrap-icons";
import HeaderProfile from "../../../Header/header-profile/HeaderProfile";
import "./story-detalils.scss";
import { contactsArray } from "../../home-contacts/contactsArray";
import ToolTip from "../../../Tooltip/Tooltip";
import { MediaQuery } from "../../../MediaQuery";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootType } from "../../../../store/store";
import { setShowStoryDetails } from "../../../../Slices/showStoryDetails";
import {
  addStoryData,
  removeStoryData,
} from "../../../../Slices/sendStoryData";
import ProgressBar from "../../../progress-bar/progress-bar";
import Animations from "../../../Animations/Animations";
import { ReactionsIconsArray } from "../../home-posts/ReactionsIconsArray";
import { Link } from "react-router-dom";

const StoryDetails = () => {
  const dispatch = useDispatch();
  const storyDataReceived: any = useSelector(
    (state: RootType) => state.sendStoryData.data
  );
  const { isScreen555, isScreen900 } = MediaQuery();
  const [muteVoice, setMuteVoice] = React.useState(false);
  const [pauseStory, setPauseStory] = React.useState(false);
  const [resetStory, setResetStory] = React.useState(false);
  const [reactionState, setReactionState] = React.useState("");

  /* Handle Close */
  const handleClose = () => {
    dispatch(removeStoryData());
    dispatch(setShowStoryDetails(false));
  };

  /* Handle Show Story */
  const handleShowStory = (storyData: any) => {
    setPauseStory(false);
    setResetStory(true);
    dispatch(removeStoryData());
    dispatch(addStoryData(storyData));
    setTimeout(() => {
      setResetStory(false);
    }, 1000);
  };

  /* Press on Esce to close */
  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.keyCode === 27) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
  }, []);

  /* Handle Arrow Left */
  const handleArrowLeft = () => {
    for (let i = 0; i < contactsArray.length; i++) {
      if (contactsArray[i] === storyDataReceived[0]) {
        if (i !== 0) {
          setPauseStory(false);
          setResetStory(true);
          dispatch(removeStoryData());
          dispatch(addStoryData(contactsArray[i - 1]));
          setTimeout(() => {
            setResetStory(false);
          }, 1000);
        } else {
          console.log("no");
        }
      }
    }
  };

  /* Handle Arrow Right */
  const handleArrowRight = () => {
    for (let i = 0; i < contactsArray.length; i++) {
      if (contactsArray[i] === storyDataReceived[0]) {
        if (i !== contactsArray.length - 1) {
          setPauseStory(false);
          setResetStory(true);
          dispatch(removeStoryData());
          dispatch(addStoryData(contactsArray[i + 1]));
          setTimeout(() => {
            setResetStory(false);
          }, 1000);
        }
      }
    }
  };

  /* Handle Reaction */
  const handleReactionState = (value: any) => {
    setReactionState(value);
    setTimeout(() => {
      setReactionState("");
    }, 2000);
  };

  return (
    <div className="story-details">
      {/* Posters Section */}
      {!isScreen900 ? (
        <div className="posters-section overflow-y-auto">
          <div className="flex pt-3 px-3">
            <ToolTip text="Press Esc to close">
              <div className="close-circle" onClick={handleClose}>
                <XLg />
              </div>
            </ToolTip>
            <a href="https://www.facebook.com">
              <Facebook color="rgb(0,70,255)" size={40} cursor={"pointer"} />
            </a>
          </div>
          <div className="splitter-line"></div>
          <div className="p-3">
            <h1 className="text-xl font-extrabold">Stories</h1>
            <div className="links flex mt-2">
              <p>Archive</p>
              <span className="mx-1">·</span>
              <p>Settings</p>
            </div>
            <br />

            <h1 className="text-sm font-bold">Your Story</h1>

            {/* Create Story */}
            <Link to={"/Facebook/create-story"} onClick={handleClose}>
              <div className="create-story my-5">
                <div className="create-story-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="1.5em"
                    height="1.5em"
                    fill="currentColor"
                  >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                  </svg>
                </div>
                <div className="create-story-text flex flex-col justify-center ml-5">
                  <h1>Create a story</h1>
                  <p>Share a photo or write something.</p>
                </div>
              </div>
            </Link>

            <h1 className="text-sm font-extrabold">All Stories</h1>

            {contactsArray.map((item, index) => {
              return (
                <div
                  className={`contacts-item flex items-center h-16 ${
                    storyDataReceived[0] === item && "bg-slate-300"
                  }`}
                  key={index}
                  onClick={() => handleShowStory(item)}
                >
                  <div
                    className={`contact-image-border ${
                      item.activeText === "Active now" && "border-blue-500"
                    }`}
                  >
                    <div className="contacts-item-image">
                      <img src={item.img} alt="" />
                    </div>
                  </div>
                  <div className="poster-text flex flex-col px-3">
                    <h1 className="text-sm">{item.title}</h1>
                    <div className="text-sm flex items-center">
                      {item.activeText === "Active now" && (
                        <CircleFill className="mr-1" color="green" size={7} />
                      )}
                      <p>{item.activeText}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex pt-3 px-3 absolute top-0 left-0 z-40">
          <ToolTip text="Press Esc to close">
            <div className="close-circle" onClick={handleClose}>
              <XLg />
            </div>
          </ToolTip>
          <a href="https://www.facebook.com">
            <Facebook color="rgb(0,70,255)" size={40} cursor={"pointer"} />
          </a>
        </div>
      )}

      {/* Story */}
      <div className="flex flex-col" style={{ width: "70%", height: "100%" }}>
        {/* Story Section */}
        <div className={`story-section ${isScreen900 && "w-full"}`}>
          <div className="header-profile">
            <HeaderProfile />
          </div>

          {/* Arrow Left */}
          <div className="w-2/5 left-section" onClick={handleArrowLeft}>
            {!(contactsArray[0] === storyDataReceived[0]) && (
              <div
                className={`arrow-circle arrow-left ${
                  isScreen555 && "left-4 "
                }`}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="black">
                  <path d="M14.791 5.207 8 12l6.793 6.793a1 1 0 1 1-1.415 1.414l-7.5-7.5a1 1 0 0 1 0-1.414l7.5-7.5a1 1 0 1 1 1.415 1.414z"></path>
                </svg>
              </div>
            )}
          </div>

          {/* Story Slide */}
          <div className="w-1/5 story-slide ">
            {storyDataReceived.map((story: any, index: number) => {
              return (
                <div className="story-media" key={index}>
                  <div className="story-header-with-bar px-2">
                    <ProgressBar
                      pause={pauseStory}
                      reset={resetStory}
                      next={handleArrowRight}
                    />
                    <div className="story-header">
                      <div className="header-content">
                        <img src={story.img} alt="" />
                        <div>
                          <h1>
                            {!(story.title.length >= 8)
                              ? story.title
                              : story.title.slice(0, 5) + "..."}
                          </h1>
                          {!(story.activeText === "Active now") && (
                            <p>{story.activeText}</p>
                          )}

                          {/* Public icon */}
                          {story.visible === "public" && (
                            <svg
                              viewBox="0 0 12 13"
                              width="12"
                              height="12"
                              fill="currentColor"
                            >
                              <g
                                fillRule="evenodd"
                                transform="translate(-450 -1073)"
                              >
                                <g>
                                  <path
                                    d="M107.5 936a5.497 5.497 0 0 1-3.595 5.16l.051-.026c.856-.734 1.277-2.19 1.467-2.812.224-.73.3-.95-.367-1.437-.236-.173-.496-.144-.762-.35-.18-.139-.262-.433-.445-.535-.435-.247-.664-.13-1.285-.047-.29.037-.621.055-.89-.031-.005 0-.005 0-.01-.003l-.061-.021c-.12-.062-.056-.152.005-.264h-.005c.063-.125.063-.277-.037-.39a.834.834 0 0 0-.564-.247c-.078-.002-.154 0-.23.003l-.003-.003-.09.003h-.027c-.237.005-.254.006-.42-.199-.194-.259-.339-.139-.055-.4.206-.19.399-.618 1.09-.192.443.27.856.324 1.223.202.242-.08.352-.222.068-.638a.825.825 0 0 1-.156-.535c.048-.57.504-.617.853-.88.342-.262.499-.692.4-1.068-.078-.303-.373-.641-.938-.741a5.492 5.492 0 0 1 4.784 5.451"
                                    transform="translate(354 143.5)"
                                  ></path>
                                  <path
                                    d="M103.546 941.277A5.5 5.5 0 0 1 99 931.392a4.015 4.015 0 0 0-1.213 1.71c-.553 1.627-.061 2.96 1.777 2.96.612 0 .924.452.875 1.782-.01.296.35 1.372 1.766 1.453.513.03.903.695 1.01 1.198.045.213.094.477.19.711a.128.128 0 0 0 .14.071"
                                    transform="translate(354 143.5)"
                                  ></path>
                                  <path
                                    fillRule="nonzero"
                                    d="M108 936a6 6 0 1 1-12 0 6 6 0 0 1 12 0zm-1 0a5 5 0 1 0-10 0 5 5 0 0 0 10 0z"
                                    transform="translate(354 143.5)"
                                  ></path>
                                </g>
                              </g>
                            </svg>
                          )}

                          {/* Friends icon */}
                          {story.visible === "friends" && (
                            <svg
                              viewBox="0 0 12 13"
                              width="12"
                              height="12"
                              fill="currentColor"
                            >
                              <g
                                fillRule="evenodd"
                                transform="translate(-450 -1073)"
                              >
                                <path d="M458.5 1078.5c-.827 0-1.5-.784-1.5-1.75 0-1.079.575-1.75 1.5-1.75s1.5.671 1.5 1.75c0 .966-.673 1.75-1.5 1.75m.838 1h-1.03a.3.3 0 0 0-.23.491 3.97 3.97 0 0 1 .922 2.544v.665a.3.3 0 0 0 .3.3h1.362c.737 0 1.338-.6 1.338-1.338a2.665 2.665 0 0 0-2.662-2.662m-2.616 5h-5.444a1.28 1.28 0 0 1-1.278-1.278v-.687a3.038 3.038 0 0 1 3.035-3.035h1.93a3.039 3.039 0 0 1 3.035 3.035v.687a1.28 1.28 0 0 1-1.278 1.278m-2.722-6c-1.103 0-2-1.01-2-2.25 0-1.388.767-2.25 2-2.25s2 .862 2 2.25c0 1.24-.897 2.25-2 2.25"></path>
                              </g>
                            </svg>
                          )}
                        </div>

                        <div>
                          {/* Play and pause icons */}
                          {pauseStory ? (
                            <div className="story-header-icon">
                              <ToolTip text="Play">
                                <svg
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  fill="currentColor"
                                  onClick={() => setPauseStory(false)}
                                >
                                  <path d="m18.477 12.906-9.711 5.919A1.148 1.148 0 0 1 7 17.919V6.081a1.148 1.148 0 0 1 1.766-.906l9.711 5.919a1.046 1.046 0 0 1 0 1.812z"></path>
                                </svg>
                              </ToolTip>
                            </div>
                          ) : (
                            <div className="story-header-icon">
                              <ToolTip text="Pause">
                                <svg
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  fill="currentColor"
                                  onClick={() => setPauseStory(true)}
                                >
                                  <rect
                                    x="7"
                                    y="5"
                                    width="4"
                                    height="14"
                                    rx="1.167"
                                  ></rect>
                                  <rect
                                    x="13"
                                    y="5"
                                    width="4"
                                    height="14"
                                    rx="1.167"
                                  ></rect>
                                </svg>
                              </ToolTip>
                            </div>
                          )}

                          {/* Mute and Unmute icon */}
                          {muteVoice ? (
                            <div className="story-header-icon">
                              <ToolTip text="unmute">
                                <svg
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  fill="currentColor"
                                  onClick={() => setMuteVoice(false)}
                                >
                                  <path d="M13.16 2.124a1.449 1.449 0 0 0-1.563.26l-4.346 4.1a.8.8 0 0 0-.251.58v9.921a.8.8 0 0 0 .255.585l4.35 4.054a1.438 1.438 0 0 0 .97.375 1.466 1.466 0 0 0 .585-.123A1.382 1.382 0 0 0 14 20.6V3.4a1.382 1.382 0 0 0-.84-1.276zM4.25 7A2.25 2.25 0 0 0 2 9.25v5.5A2.25 2.25 0 0 0 4.25 17h.35a.4.4 0 0 0 .4-.4V7.4a.4.4 0 0 0-.4-.4zM21.707 9.293a1 1 0 0 0-1.414 0L19 10.586l-1.293-1.293a1 1 0 0 0-1.414 1.414L17.586 12l-1.293 1.293a1 1 0 1 0 1.414 1.414L19 13.414l1.293 1.293a1 1 0 0 0 1.414-1.414L20.414 12l1.293-1.293a1 1 0 0 0 0-1.414z"></path>
                                </svg>
                              </ToolTip>
                            </div>
                          ) : (
                            <div className="story-header-icon">
                              <ToolTip text="mute">
                                <svg
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  fill="currentColor"
                                  onClick={() => setMuteVoice(true)}
                                >
                                  <path d="M13.16 2.124a1.449 1.449 0 0 0-1.563.26l-4.346 4.1a.8.8 0 0 0-.251.58v9.921a.8.8 0 0 0 .255.585l4.35 4.054a1.438 1.438 0 0 0 .97.375 1.466 1.466 0 0 0 .585-.123A1.382 1.382 0 0 0 14 20.6V3.4a1.382 1.382 0 0 0-.84-1.276zM4.25 7A2.25 2.25 0 0 0 2 9.25v5.5A2.25 2.25 0 0 0 4.25 17h.35a.4.4 0 0 0 .4-.4V7.4a.4.4 0 0 0-.4-.4zM16.95 7.05a1 1 0 1 0-1.414 1.414 5.008 5.008 0 0 1 0 7.072 1 1 0 1 0 1.414 1.414 7.009 7.009 0 0 0 0-9.9z"></path>
                                  <path d="M18.364 4.222a1 1 0 0 0 0 1.414 9.01 9.01 0 0 1 0 12.728 1 1 0 1 0 1.414 1.414 11.012 11.012 0 0 0 0-15.556 1 1 0 0 0-1.414 0z"></path>
                                </svg>
                              </ToolTip>
                            </div>
                          )}

                          {/* Options */}
                          <div className="story-header-icon">
                            <ToolTip text="Options">
                              <svg
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="currentColor"
                              >
                                <circle cx="12" cy="12" r="2.5"></circle>
                                <circle cx="19.5" cy="12" r="2.5"></circle>
                                <circle cx="4.5" cy="12" r="2.5"></circle>
                              </svg>
                            </ToolTip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="media">
                    <img src={story.storyContent} />
                  </div>
                  {reactionState && (
                    <div className="flex justify-between w-48 absolute bottom-3 left-10 text-slate-100">
                      <img
                        src={ReactionsIconsArray[0][reactionState]}
                        width={24}
                        height={24}
                      />
                      <p>Sent to {story.title}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Arrow Right */}
          <div className="w-2/5 right-section" onClick={handleArrowRight}>
            {!(
              contactsArray[contactsArray.length - 1] === storyDataReceived[0]
            ) && (
              <div
                className={`arrow-circle arrow-right ${
                  isScreen555 && "right-4 "
                }`}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="black">
                  <path d="M9.209 5.207 16 12l-6.791 6.793a1 1 0 1 0 1.415 1.414l7.5-7.5a1 1 0 0 0 0-1.414l-7.5-7.5a1 1 0 1 0-1.415 1.414z"></path>
                </svg>
              </div>
            )}
          </div>
        </div>

        {/*  Story Footer */}
        <div className="story-footer ">
          <div className="footer-input">
            <input type="text" placeholder="Reply..." />
            <svg viewBox="0 0 20 20" width="20" height="20" fill="white">
              <g fillRule="evenodd" transform="translate(-446 -398)">
                <g>
                  <path
                    fillRule="nonzero"
                    d="m101.952 213.438-2.87.501c-2.212.386-4.324-1.08-4.716-3.279l-1.803-10.126c-.393-2.202 1.09-4.3 3.305-4.686l10.235-1.787c2.213-.386 4.324 1.08 4.716 3.279l.503 2.825c1.11 6.233-3.087 12.176-9.37 13.273zm-.086-1.51c5.372-1.031 8.934-6.144 7.98-11.5l-.504-2.825c-.246-1.383-1.58-2.31-2.981-2.064l-10.235 1.787c-1.4.244-2.333 1.564-2.086 2.945l1.803 10.126c.246 1.383 1.58 2.309 2.981 2.064l2.87-.5.172-.032z"
                    transform="translate(354 204)"
                  ></path>
                  <path
                    fillRule="nonzero"
                    d="M100.313 213.724c2.395-.418 4.083-1.903 4.253-4.072l.01-.139c.097-2.012 1.845-4.54 3.792-5.59l.13-.067c2.003-1.006 3.004-2.684 2.61-4.896a.75.75 0 0 0-1.477.263c.26 1.465-.323 2.502-1.677 3.226l-.13.067c-2.417 1.214-4.536 4.188-4.737 6.773l-.01.151c-.07 1.463-1.21 2.49-3.022 2.806a.75.75 0 1 0 .258 1.478z"
                    transform="translate(354 204)"
                  ></path>
                  <path
                    d="M106.25 200.75a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"
                    transform="translate(354 204)"
                  ></path>
                  <path
                    fillRule="nonzero"
                    d="M107 200.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zm-1.5 0a.25.25 0 0 0 .5 0 .25.25 0 0 0-.5 0z"
                    transform="translate(354 204)"
                  ></path>
                  <path
                    d="M98.75 202.25a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"
                    transform="translate(354 204)"
                  ></path>
                  <path
                    fillRule="nonzero"
                    d="M99.5 202.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zm-1.5 0a.25.25 0 0 0 .5 0 .25.25 0 0 0-.5 0zm3.682 5.522c-1.157-.289-2.053-.865-2.47-1.539l-.054-.092a.75.75 0 1 0-1.316.718c.611 1.12 1.89 1.972 3.476 2.369a.75.75 0 1 0 .364-1.456z"
                    transform="translate(354 204)"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
          <div className="footer-animations">
            <Animations reaction={handleReactionState} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetails;
