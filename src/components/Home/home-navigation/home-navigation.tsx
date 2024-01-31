import "./home-navigation.scss";
import React from "react";
import profilePicture from "../../../assets/images/header/profile-picture.jpg";

const HomeNavigation = () => {
  const [focused, setFocused] = React.useState(false);
  const [seeMore, setSeeMore] = React.useState(false);

  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <div className="flex w-1/5 flex-col justify-start">
      <div
        className={`fixed ${
          !focused ? "overflow-y-hidden" : "overflow-y-auto"
        } h-5/6 w-1/5`}
        onMouseEnter={handleFocus}
        onMouseLeave={handleBlur}
      >
        <div className="navigation-div">
          <div className="profile-section-icon profile-icon ml-0 w-8 h-8">
            <img src={profilePicture} alt="profile" />
          </div>
          <h4>Mozaffar Mohammad</h4>
        </div>
        <div className="navigation-div">
          <i
            className="navigation-icon group-icon-1"
            style={{ backgroundPosition: "0 -296px" }}
          ></i>

          <h4>Friends</h4>
        </div>
        <div className="navigation-div">
          <i
            className="navigation-icon group-icon-2"
            style={{ backgroundPosition: "0 -37px" }}
          ></i>
          <h4>Events</h4>
        </div>
        <div className="navigation-div">
          <i
            className="navigation-icon group-icon-1"
            style={{ backgroundPosition: "0 -444px" }}
          ></i>

          <h4>Memories</h4>
        </div>
        <div className="navigation-div">
          <i
            className="navigation-icon group-icon-1"
            style={{ backgroundPosition: "0 -185px" }}
          ></i>
          <h4>Saved</h4>
        </div>
        <div className="navigation-div">
          <i
            className="navigation-icon group-icon-1"
            style={{ backgroundPosition: "0 -37px" }}
          ></i>
          <h4>Groups</h4>
        </div>
        <div className="navigation-div">
          <i
            className="navigation-icon group-icon-1"
            style={{ backgroundPosition: "0 -518px" }}
          ></i>
          <h4>Video</h4>
        </div>
        {/* See More */}
        {!seeMore ? (
          <div className="navigation-div" onClick={() => setSeeMore(true)}>
            <div className="profile-section-icon profile-icon ml-0 w-8 h-8">
              <svg
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
              >
                <g fillRule="evenodd" transform="translate(-448 -544)">
                  <path
                    fillRule="nonzero"
                    d="M452.707 549.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L456 552.586l-3.293-3.293z"
                  ></path>
                </g>
              </svg>
            </div>
            <h4>See more</h4>
          </div>
        ) : (
          <div>
            <div className="navigation-div">
              <img
                height="36"
                width="36"
                alt=""
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/ATlxuj_J5ty.png"
              />
              <h4>Ads Manager</h4>
            </div>
            <div className="navigation-div">
              <img
                height="36"
                width="36"
                alt=""
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/eECk3ceTaHJ.png"
              />
              <h4>Feeds</h4>
            </div>
            <div className="navigation-div">
              <i
                className="navigation-icon group-icon-1"
                style={{ backgroundPosition: "0 -333px" }}
              ></i>
              <h4>Fundraisers</h4>
            </div>
            <div className="navigation-div">
              <img
                height="36"
                width="36"
                alt=""
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/fGWbDwbx9W4.png"
              />
              <h4>Gaming Video</h4>
            </div>
            <div className="navigation-div">
              <i
                className="navigation-icon group-icon-3"
                style={{ backgroundPosition: "0px 0px" }}
              ></i>
              <h4>Messenger</h4>
            </div>
            <div className="navigation-div">
              <img
                height="36"
                width="36"
                alt=""
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/6Z9DShdc7zU.png"
              />
              <h4>Messenger Kids</h4>
            </div>
            <div className="navigation-div">
              <i
                className="navigation-icon group-icon-1"
                style={{ backgroundPosition: "0px -111px" }}
              ></i>
              <h4>Pages</h4>
            </div>
            <div className="navigation-div">
              <i
                className="navigation-icon group-icon-1"
                style={{ backgroundPosition: "0px -74px" }}
              ></i>
              <h4>Play Games</h4>
            </div>
            <div className="navigation-div">
              <img
                height="36"
                width="36"
                alt=""
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/x2_LFd7gCqg.png"
              />
              <h4>Recent and activity</h4>
            </div>
            <div className="navigation-div" onClick={() => setSeeMore(false)}>
              <div className="profile-section-icon profile-icon ml-0 w-8 h-8">
                <svg
                  viewBox="0 0 20 20"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M15.47 12.2 10 6.727 4.53 12.2a.75.75 0 0 1-1.06-1.061l6-6a.751.751 0 0 1 1.06 0l6 6a.75.75 0 0 1-1.06 1.061z"></path>
                </svg>
              </div>
              <h4>See less</h4>
            </div>
          </div>
        )}

        <div className="splitter-line"></div>

        {/* Your Shortcuts */}
        <div className="flex flex-col justify-start group">
          <div className="flex justify-between py-3 px-1">
            <h4 className="text-gray-500 font-bold p-2">Your shortcuts</h4>
            <p className="text-sm text-slate-100  group-hover:text-blue-600 p-2 hover:bg-slate-200 hover:cursor-pointer">
              Edit
            </p>
          </div>
          <div>
            <div className="navigation-div">
              <img
                className="rounded-lg"
                alt=""
                src="https://scontent-bru2-1.xx.fbcdn.net/v/t39.2081-6/42630609_2166936443330818_3464735768197464064_n.png?stp=c6.6.31.31a_dst-png_p36x36&amp;_nc_cat=1&amp;ccb=1-7&amp;_nc_sid=ed3f67&amp;_nc_ohc=JckbVFX3OoUAX9AaoIy&amp;_nc_ht=scontent-bru2-1.xx&amp;oh=00_AfCNNn2OrTEEHTl4sUWXFwl4GYZ4fbjmco6xFFXUwZXzEQ&amp;oe=65BF9B6F"
              />
              <h4>8 Ball Pool</h4>
            </div>

            <div className="navigation-div">
              <img
                className="rounded-lg"
                alt=""
                src="https://scontent-bru2-1.xx.fbcdn.net/v/t39.2081-6/22088589_1654976451201719_5191478939503034368_n.png?stp=c6.6.31.31a_dst-png_p36x36&amp;_nc_cat=1&amp;ccb=1-7&amp;_nc_sid=ed3f67&amp;_nc_ohc=QR7p2lNkzk0AX8UXdmE&amp;_nc_ht=scontent-bru2-1.xx&amp;oh=00_AfBe63LCh8mWYNK8n4Ciuwd_K61tlAYELZi7zCWG7rLXOQ&amp;oe=65BF4582"
              />
              <h4>Candy Crush</h4>
            </div>

            <div className="navigation-div">
              <img
                className="rounded-lg"
                alt=""
                src="https://scontent-bru2-1.xx.fbcdn.net/v/t39.2081-6/38857289_967432326791829_6476944985995345920_n.png?stp=c6.6.31.31a_dst-png_p36x36&amp;_nc_cat=1&amp;ccb=1-7&amp;_nc_sid=ed3f67&amp;_nc_ohc=EDoOt32Zbe4AX9qQmFu&amp;_nc_ht=scontent-bru2-1.xx&amp;oh=00_AfCXdntXaMcKx6JG47Q0tf_7oMAT37a1RdFSB6BPlBzrNw&amp;oe=65BFBD40"
              />
              <h4>Soccer Stars</h4>
            </div>

            <div className="navigation-div">
              <img
                className="rounded-lg"
                alt=""
                src="https://scontent-bru2-1.xx.fbcdn.net/v/t39.2081-6/27045397_10155399661101229_4188312396068028416_n.png?stp=c6.6.31.31a_dst-png_p36x36&amp;_nc_cat=1&amp;ccb=1-7&amp;_nc_sid=ed3f67&amp;_nc_ohc=xDVn8tox3BUAX_LaAB_&amp;_nc_ht=scontent-bru2-1.xx&amp;oh=00_AfDQWro7aTX3PHaVh37YA6fAs_z56ibiqn0eReSw2sq3RQ&amp;oe=65C050CE"
              />
              <h4>Texas HoldEm Poker</h4>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="home-footer">
          <a>Privacy</a> · <a>Terms</a> · <a>Advertising</a> ·{" "}
          <a>Ad Choices </a>
          <i
            style={{
              backgroundImage:
                "url(https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/BwG518LcWF8.png)",
              backgroundPosition: "0 -765px",
              backgroundSize: "auto",
              width: "12px",
              height: "12px",
              backgroundRepeat: "no-repeat",
              display: "inline-block",
            }}
          ></i>{" "}
          · <a>Cookies</a> · <a>More </a> · <span>Meta © 2023</span>
        </div>
      </div>
    </div>
  );
};

export default HomeNavigation;
