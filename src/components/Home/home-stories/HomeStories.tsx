import "./HomeStories.scss";
import React from "react";
import { contactsArray } from "../home-contacts/contactsArray";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { MediaQuery } from "../../MediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setShowStoryDetails } from "../../../Slices/showStoryDetails";
import { addStoryData, removeStoryData } from "../../../Slices/sendStoryData";
import { Link } from "react-router-dom";
import { RootType } from "../../../store/store";

const HomeStories = () => {
  const dispatch = useDispatch();
  const newStory: any = useSelector(
    (state: RootType) => state.createNewStory.data
  );
  const contactsArrayNewStory = [...contactsArray];
  if (newStory[0]) {
    contactsArrayNewStory.unshift(newStory[0]);
  }
  const { isScreen555 } = MediaQuery();
  const [firstElement, setFirstElement] = React.useState(0);
  const [lastElement, setLastElement] = React.useState(3);
  const [loadedImagesArray, setLoadedImagesArray]: any = React.useState([]);
  const ref = React.useRef(null);

  const handlePreviousElement = () => {
    if (firstElement >= 0) {
      const previous = firstElement - 3;
      const next = lastElement - 4;
      setFirstElement(previous);
      setLastElement(next);
    }
  };

  const handleNextElement = () => {
    if (lastElement < contactsArray.length) {
      const previous = firstElement + 3;
      const next = lastElement + 4;
      setFirstElement(previous);
      setLastElement(next);
    }
  };

  const handleNewStoryWindow = (storyData: any) => {
    dispatch(removeStoryData());
    dispatch(setShowStoryDetails(true));
    dispatch(addStoryData(storyData));
  };

  const handleLoadedImage = (id: number) => {
    if (loadedImagesArray && !loadedImagesArray?.includes(id)) {
      setLoadedImagesArray((prevArray: any) => {
        const newArray = [...prevArray, id];
        return newArray;
      });
    }
  };

  return (
    <div className="stories">
      {/* Arrow Left */}
      {firstElement !== 0 && (
        <div
          className={`arrow-circle arrow-left ${isScreen555 && "left-4 "}`}
          onClick={handlePreviousElement}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="black">
            <path d="M14.791 5.207 8 12l6.793 6.793a1 1 0 1 1-1.415 1.414l-7.5-7.5a1 1 0 0 1 0-1.414l7.5-7.5a1 1 0 1 1 1.415 1.414z"></path>
          </svg>
        </div>
      )}

      {/* Arrow Right */}
      {lastElement < contactsArray.length && (
        <div
          className={`arrow-circle arrow-right ${isScreen555 && "right-4 "}`}
          onClick={handleNextElement}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="black">
            <path d="M9.209 5.207 16 12l-6.791 6.793a1 1 0 1 0 1.415 1.414l7.5-7.5a1 1 0 0 0 0-1.414l-7.5-7.5a1 1 0 1 0-1.415 1.414z"></path>
          </svg>
        </div>
      )}

      {/* Create-Story */}
      {firstElement === 0 && (
        <Link to={"/Facebook/create-story"}>
          <div className="story-you flex flex-col items-center overflow-hidden">
            <div className="brightness"></div>
            <div className="story-you-image"></div>
            <div className="create-story-icon flex justify-center">
              <div>
                <svg viewBox="0 0 20 20" width="20" height="20" fill="white">
                  <g fillRule="evenodd" transform="translate(-446 -350)">
                    <g fillRule="nonzero">
                      <path
                        d="M95 201.5h13a1 1 0 1 0 0-2H95a1 1 0 1 0 0 2z"
                        transform="translate(354.5 159.5)"
                      ></path>
                      <path
                        d="M102.5 207v-13a1 1 0 1 0-2 0v13a1 1 0 1 0 2 0z"
                        transform="translate(354.5 159.5)"
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <div className="flex justify-center items-end w-full h-full text-sm">
              <p className="mb-2">Create story</p>
            </div>
          </div>
        </Link>
      )}

      <TransitionGroup className="flex toOver">
        {(!newStory[0] ? contactsArray : contactsArrayNewStory)
          .slice(
            firstElement >= contactsArray.length - 4
              ? contactsArray.length - 4
              : firstElement,
            lastElement >= contactsArray.length
              ? contactsArray.length
              : lastElement
          )
          .map((story: any, index: number) => {
            return (
              <CSSTransition
                in={true}
                timeout={1000}
                classNames="fade"
                unmountOnExit
                key={index}
                nodeRef={ref}
              >
                <div
                  className="story-others flex flex-col items-center overflow-hidden text-slate-50"
                  ref={ref}
                  onClick={() => handleNewStoryWindow(story)}
                >
                  <div className="brightness"></div>
                  <div className="story-image-page z-20">
                    {!loadedImagesArray.includes(story.id) && (
                      <div className="story-image-page-alt"></div>
                    )}
                    <img
                      src={story.img}
                      alt=""
                      onLoad={() => handleLoadedImage(story.id)}
                    />
                  </div>
                  {story.storyContent ? (
                    <div>
                      {!loadedImagesArray.includes((story.id + 1) * 10) && (
                        <div className="story-content-alt"></div>
                      )}
                      <img
                        src={story.storyContent}
                        className="story-content"
                        onLoad={() => handleLoadedImage((story.id + 1) * 10)}
                      />
                      {story.textArray &&
                        story.textArray.map((text: any, index: number) => {
                          return (
                            <h1
                              key={index}
                              color={text.color}
                              style={{
                                fontFamily: text.fontType,
                                fontSize: text.fontSize,
                                color: text.color,
                                position: "absolute",
                                top: `${
                                  text.position.y - (text.position.y * 40) / 100
                                }px`,
                                left: `${
                                  text.position.x - (text.position.x * 50) / 100
                                }px`,
                                zIndex: "10",
                              }}
                            >
                              {text.text}
                            </h1>
                          );
                        })}
                    </div>
                  ) : (
                    <div
                      className="story-content flex justify-center items-center"
                      style={{
                        backgroundImage: `${story.bgColor && story.bgColor}`,
                      }}
                    >
                      <h1>{story.text}</h1>
                    </div>
                  )}
                  <div className="story-image-title z-20 flex justify-center">
                    <p className="z-20">{story.title}</p>
                  </div>
                </div>
              </CSSTransition>
            );
          })}
      </TransitionGroup>
    </div>
  );
};

export default HomeStories;
