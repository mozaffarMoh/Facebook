import "./Header.scss";
import React from "react";
import { Facebook, Plus, Search, ArrowLeft } from "react-bootstrap-icons";
import profilePicture from "../../assets/images/header/profile-picture.jpg";
import { MediaQuery } from "../MediaQuery";
import ToolTip from "../Tooltip/Tooltip";
import SearchDialog from "../SearchDialog/SearchDialog";
import { CSSTransition } from "react-transition-group";

const Header = () => {
  const [active, setActive] = React.useState("home");
  const [showSearchDialog, setShowSearchDialog] = React.useState(false);
  const { isScreen800, isScreen555 } = MediaQuery();
  const searchDialogRef: any = React.useRef(null);

  return (
    <nav className="navbar p-2 position-relative z-50 ">
      {/* Search Section */}
      <div
        className={`${
          !isScreen800 ? "w-1/3" : isScreen555 ? "w-1/4" : "w-1/2"
        } flex z-30`}
      >
        <a href="https://www.facebook.com">
          {!showSearchDialog && (
            <Facebook color="rgb(0,70,255)" size={40} cursor={"pointer"} />
          )}
        </a>
        {showSearchDialog || !isScreen555 ? (
          <div className="flex search justify-start">
            <div className="search-icon flex">
              {showSearchDialog ? (
                <div
                  className="arrow-icon-div"
                  onClick={() => setShowSearchDialog(false)}
                >
                  <ArrowLeft />
                </div>
              ) : (
                <Search
                  className="ml-6"
                  onClick={() => setShowSearchDialog(true)}
                />
              )}
            </div>
            <input
              type="text"
              placeholder="Search Facebook"
              className={`search-input ${
                showSearchDialog ? "w-64 p-4  ml-12" : ""
              } `}
              onClick={() => setShowSearchDialog(true)}
            />
          </div>
        ) : (
          <div className="search-icon-radius">
            <Search onClick={() => setShowSearchDialog(true)} />
          </div>
        )}
      </div>

      {/* Search Dialog */}
      <CSSTransition
        in={showSearchDialog}
        timeout={600}
        classNames="fade"
        unmountOnExit
        nodeRef={searchDialogRef}
      >
        <div ref={searchDialogRef}>
          <SearchDialog
            showSearchDialog={showSearchDialog}
            setShowSearchDialog={setShowSearchDialog}
          />
        </div>
      </CSSTransition>

      {/* Navigate Section */}
      {!isScreen800 ? (
        <div className="flex w-1/3 z-10">
          {/* Home */}
          <div
            className={`flex flex-col justify-center w-1/4 ${
              active === "home" && "rounded-none hover:bg-transparent"
            } navigate-icon-div`}
            onClick={() => setActive("home")}
          >
            <div className="flex flex-col">
              <ToolTip text="Home">
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill={active === "home" ? "blue" : "grey"}
                    className="navigate-icon"
                  >
                    {active !== "home" ? (
                      <>
                        <path d="M8.99 23H7.93c-1.354 0-2.471 0-3.355-.119-.928-.125-1.747-.396-2.403-1.053-.656-.656-.928-1.475-1.053-2.403C1 18.541 1 17.425 1 16.07v-4.3c0-1.738-.002-2.947.528-4.006.53-1.06 1.497-1.784 2.888-2.826L6.65 3.263c1.114-.835 2.02-1.515 2.815-1.977C10.294.803 11.092.5 12 .5c.908 0 1.707.303 2.537.786.795.462 1.7 1.142 2.815 1.977l2.232 1.675c1.391 1.042 2.359 1.766 2.888 2.826.53 1.059.53 2.268.528 4.006v4.3c0 1.355 0 2.471-.119 3.355-.124.928-.396 1.747-1.052 2.403-.657.657-1.476.928-2.404 1.053-.884.119-2 .119-3.354.119H8.99zM7.8 4.9l-2 1.5C4.15 7.638 3.61 8.074 3.317 8.658 3.025 9.242 3 9.937 3 12v4c0 1.442.002 2.424.101 3.159.095.706.262 1.033.485 1.255.223.223.55.39 1.256.485.734.099 1.716.1 3.158.1V14.5a2.5 2.5 0 0 1 2.5-2.5h3a2.5 2.5 0 0 1 2.5 2.5V21c1.443 0 2.424-.002 3.159-.101.706-.095 1.033-.262 1.255-.485.223-.222.39-.55.485-1.256.099-.734.101-1.716.101-3.158v-4c0-2.063-.025-2.758-.317-3.342-.291-.584-.832-1.02-2.483-2.258l-2-1.5c-1.174-.881-1.987-1.489-2.67-1.886C12.87 2.63 12.425 2.5 12 2.5c-.425 0-.87.13-1.53.514-.682.397-1.495 1.005-2.67 1.886zM14 21v-6.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V21h4z"></path>
                      </>
                    ) : (
                      <>
                        <path d="M9.464 1.286C10.294.803 11.092.5 12 .5c.908 0 1.707.303 2.537.786.795.462 1.7 1.142 2.815 1.977l2.232 1.675c1.391 1.042 2.359 1.766 2.888 2.826.53 1.059.53 2.268.528 4.006v4.3c0 1.355 0 2.471-.119 3.355-.124.928-.396 1.747-1.052 2.403-.657.657-1.476.928-2.404 1.053-.884.119-2 .119-3.354.119H7.93c-1.354 0-2.471 0-3.355-.119-.928-.125-1.747-.396-2.403-1.053-.656-.656-.928-1.475-1.053-2.403C1 18.541 1 17.425 1 16.07v-4.3c0-1.738-.002-2.947.528-4.006.53-1.06 1.497-1.784 2.888-2.826L6.65 3.263c1.114-.835 2.02-1.515 2.815-1.977zM10.5 13A1.5 1.5 0 0 0 9 14.5V21h6v-6.5a1.5 1.5 0 0 0-1.5-1.5h-3z"></path>
                      </>
                    )}
                  </svg>
                </div>
              </ToolTip>
            </div>
            <div
              className={`mark-line ${active === "home" && "bg-blue-600"}`}
            ></div>
          </div>

          {/* Videos */}
          <div
            className={`flex flex-col justify-center w-1/4 ${
              active === "videos" && "rounded-none hover:bg-transparent"
            } navigate-icon-div`}
            onClick={() => setActive("videos")}
          >
            <div className="flex flex-col">
              <ToolTip text="Videos">
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill={active === "videos" ? "blue" : "grey"}
                    className="navigate-icon"
                  >
                    {active !== "videos" ? (
                      <>
                        <path d="M10.996 8.132A1 1 0 0 0 9.5 9v4a1 1 0 0 0 1.496.868l3.5-2a1 1 0 0 0 0-1.736l-3.5-2z"></path>
                        <path d="M14.573 2H9.427c-1.824 0-3.293 0-4.45.155-1.2.162-2.21.507-3.013 1.31C1.162 4.266.817 5.277.655 6.477.5 7.634.5 9.103.5 10.927v.146c0 1.824 0 3.293.155 4.45.162 1.2.507 2.21 1.31 3.012.802.803 1.813 1.148 3.013 1.31C6.134 20 7.603 20 9.427 20h5.146c1.824 0 3.293 0 4.45-.155 1.2-.162 2.21-.507 3.012-1.31.803-.802 1.148-1.813 1.31-3.013.155-1.156.155-2.625.155-4.449v-.146c0-1.824 0-3.293-.155-4.45-.162-1.2-.507-2.21-1.31-3.013-.802-.802-1.813-1.147-3.013-1.309C17.866 2 16.397 2 14.573 2zM3.38 4.879c.369-.37.887-.61 1.865-.741C6.251 4.002 7.586 4 9.5 4h5c1.914 0 3.249.002 4.256.138.978.131 1.496.372 1.865.74.37.37.61.888.742 1.866.135 1.007.137 2.342.137 4.256 0 1.914-.002 3.249-.137 4.256-.132.978-.373 1.496-.742 1.865-.369.37-.887.61-1.865.742-1.007.135-2.342.137-4.256.137h-5c-1.914 0-3.249-.002-4.256-.137-.978-.132-1.496-.373-1.865-.742-.37-.369-.61-.887-.741-1.865C2.502 14.249 2.5 12.914 2.5 11c0-1.914.002-3.249.138-4.256.131-.978.372-1.496.74-1.865zM8 21.5a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8z"></path>
                      </>
                    ) : (
                      <>
                        <path d="M9.427 2h5.146c1.824 0 3.293 0 4.45.155 1.2.162 2.21.507 3.012 1.31.803.802 1.148 1.813 1.31 3.013.155 1.156.155 2.625.155 4.449v.146c0 1.824 0 3.293-.155 4.45-.162 1.2-.507 2.21-1.31 3.012-.802.803-1.813 1.148-3.013 1.31-1.156.155-2.625.155-4.449.155H9.427c-1.824 0-3.293 0-4.45-.155-1.2-.162-2.21-.507-3.013-1.31-.802-.802-1.147-1.813-1.309-3.013C.5 14.366.5 12.897.5 11.073v-.146c0-1.824 0-3.293.155-4.45.162-1.2.507-2.21 1.31-3.013.802-.802 1.813-1.147 3.013-1.309C6.134 2 7.603 2 9.427 2zm.571 6.135A1 1 0 0 0 9.5 9v4a1 1 0 0 0 1.496.868l3.5-2a1 1 0 0 0 0-1.736l-3.5-2a1 1 0 0 0-.998.003zM8 21.5a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8z"></path>{" "}
                      </>
                    )}
                  </svg>
                </div>
              </ToolTip>
            </div>
            <div
              className={`mark-line ${active === "videos" && "bg-blue-600"}`}
            ></div>
          </div>

          {/* Groups */}
          <div
            className={`flex flex-col justify-center w-1/4 ${
              active === "groups" && "rounded-none hover:bg-transparent"
            } navigate-icon-div`}
            onClick={() => setActive("groups")}
          >
            <div className="flex flex-col">
              <ToolTip text="Groups">
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill={active === "groups" ? "blue" : "grey"}
                    className="navigate-icon"
                  >
                    {active !== "groups" ? (
                      <>
                        <path d="M12 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-2 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                        <path d="M.5 12C.5 5.649 5.649.5 12 .5S23.5 5.649 23.5 12 18.351 23.5 12 23.5.5 18.351.5 12zm2.21-2a9.537 9.537 0 0 0 0 3.993l.3.007A2 2 0 0 0 3 10h-.29zm.663-1.983a4 4 0 0 1 0 7.966 9.523 9.523 0 0 0 1.948 2.773A5.002 5.002 0 0 1 10 15.523h4a5.002 5.002 0 0 1 4.679 3.233 9.523 9.523 0 0 0 1.948-2.773 4 4 0 0 1 0-7.966A9.501 9.501 0 0 0 12 2.5a9.501 9.501 0 0 0-8.627 5.517zM21.5 12a9.55 9.55 0 0 0-.212-2.007l-.265.007H21a2 2 0 0 0-.01 4l.3-.007c.138-.643.21-1.31.21-1.993zM12 21.5a9.455 9.455 0 0 0 4.97-1.402A3 3 0 0 0 14 17.523h-4a3 3 0 0 0-2.97 2.575A9.456 9.456 0 0 0 12 21.5z"></path>
                      </>
                    ) : (
                      <>
                        <path d="M12 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                        <path d="M12 23.5C5.649 23.5.5 18.351.5 12S5.649.5 12 .5 23.5 5.649 23.5 12 18.351 23.5 12 23.5zM3.373 8.017a4 4 0 0 1 0 7.966 9.523 9.523 0 0 0 1.948 2.773A5.002 5.002 0 0 1 10 15.523h4a5.002 5.002 0 0 1 4.679 3.233 9.523 9.523 0 0 0 1.948-2.773 4 4 0 0 1 0-7.966A9.501 9.501 0 0 0 12 2.5a9.501 9.501 0 0 0-8.627 5.517z"></path>
                      </>
                    )}
                  </svg>
                </div>
              </ToolTip>
            </div>
            <div
              className={`mark-line ${active === "groups" && "bg-blue-600"}`}
            ></div>
          </div>

          {/* Gaming */}
          <div
            className={`flex flex-col justify-center w-1/4 ${
              active === "gaming" && "rounded-none  hover:bg-transparent"
            } navigate-icon-div`}
            onClick={() => setActive("gaming")}
          >
            <div className="flex flex-col">
              <ToolTip text="Gaming">
                <div>
                  <svg
                    viewBox="0 1 24 24"
                    width="28"
                    height="28"
                    fill={active === "gaming" ? "blue" : "grey"}
                    className="navigate-icon"
                  >
                    {active !== "gaming" ? (
                      <>
                        <path d="M8 8a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2H9v2a1 1 0 1 1-2 0v-2H5a1 1 0 1 1 0-2h2V9a1 1 0 0 1 1-1zm8 2a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm-2 4a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"></path>
                        <path d="M.5 11a7 7 0 0 1 7-7h9a7 7 0 0 1 7 7v2a7 7 0 0 1-7 7h-9a7 7 0 0 1-7-7v-2zm7-5a5 5 0 0 0-5 5v2a5 5 0 0 0 5 5h9a5 5 0 0 0 5-5v-2a5 5 0 0 0-5-5h-9z"></path>
                      </>
                    ) : (
                      <path d="M7.5 4a7 7 0 0 0-7 7v2a7 7 0 0 0 7 7h9a7 7 0 0 0 7-7v-2a7 7 0 0 0-7-7h-9zM8 8a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2H9v2a1 1 0 1 1-2 0v-2H5a1 1 0 1 1 0-2h2V9a1 1 0 0 1 1-1zm8 2a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm-.5 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
                    )}
                  </svg>
                </div>
              </ToolTip>
            </div>
            <div
              className={`mark-line ${
                active === "gaming" && "bg-blue-600 mb-1"
              }`}
            ></div>
          </div>
        </div>
      ) : null}

      {/* Profile Section */}
      <div
        className={`${
          !isScreen800 ? "w-1/3" : isScreen555 ? "w-3/4" : "w-1/2"
        } flex justify-end profile-section-icons z-10`}
      >
        {!isScreen800 ? (
          <ToolTip text="Menu">
            <div className="profile-section-icon">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M12 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm8 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm8 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm8 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm8 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 17a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
              </svg>
            </div>
          </ToolTip>
        ) : (
          <ToolTip text="Create">
            <div className="profile-section-icon">
              <Plus />
            </div>
          </ToolTip>
        )}
        <ToolTip text="Messenger">
          <div className="profile-section-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M.5 12C.5 5.649 5.649.5 12 .5S23.5 5.649 23.5 12 18.351 23.5 12 23.5c-1.922 0-3.736-.472-5.33-1.308a.63.63 0 0 0-.447-.069l-3.4.882a1.5 1.5 0 0 1-1.828-1.829l.882-3.4a.63.63 0 0 0-.07-.445A11.454 11.454 0 0 1 .5 12zm17.56-1.43a.819.819 0 0 0-1.125-1.167L14 11.499l-3.077-2.171a1.5 1.5 0 0 0-2.052.308l-2.93 3.793a.819.819 0 0 0 1.123 1.167L10 12.5l3.076 2.172a1.5 1.5 0 0 0 2.052-.308l2.931-3.793z"></path>
            </svg>
          </div>
          <span className="badge">4+</span>
        </ToolTip>
        <ToolTip text="Notification">
          <div className="profile-section-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M3 9.5a9 9 0 1 1 18 0v2.927c0 1.69.475 3.345 1.37 4.778a1.5 1.5 0 0 1-1.272 2.295h-4.625a4.5 4.5 0 0 1-8.946 0H2.902a1.5 1.5 0 0 1-1.272-2.295A9.01 9.01 0 0 0 3 12.43V9.5zm6.55 10a2.5 2.5 0 0 0 4.9 0h-4.9z"></path>
            </svg>
          </div>
          <span className="badge">17+</span>
        </ToolTip>
        <ToolTip text="Account">
          <div className="profile-section-icon profile-icon hover:opacity-90">
            <img src={profilePicture} alt="profile" />
          </div>
        </ToolTip>
      </div>
    </nav>
  );
};

export default Header;
