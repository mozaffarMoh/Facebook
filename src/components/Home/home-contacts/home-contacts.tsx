import { CircleFill, Plus, Search } from "react-bootstrap-icons";
import { contactsArray } from "./contactsArray";
import "./home-contacts.scss";
import ToolTip from "../../Tooltip/Tooltip";
import React from "react";

const HomeContacts = () => {
  const [focused, setFocused] = React.useState(false);

  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };
  return (
    <div className="flex flex-col w-1/4">
      <div
        className={`fixed ${
          !focused ? "overflow-y-hidden" : "overflow-y-auto"
        } h-5/6 w-1/5`}
        onMouseEnter={handleFocus}
        onMouseLeave={handleBlur}
      >
        <div>
          <h1 className="text-slate-500 font-bold">Birthdays</h1>
          <div className="birthday-div flex  items-center">
            <i className="birthday-icon"></i>
            <p>
              <span>Friend Five</span>'s birthday is today
            </p>
          </div>
        </div>
        <div className="splitter-line mt-2"></div>
        <div className="contacts-items flex flex-col">
          <div className="flex justify-between items-center mt-3">
            <h1 className="text-slate-500 font-bold">Contacts</h1>
            <div className="flex">
              <div className="contact-icon-circle flex justify-center items-center">
                <ToolTip text="Search by name or group">
                  <Search />
                </ToolTip>
              </div>
              <div className="contact-icon-circle flex justify-center items-center">
                <ToolTip text="Options">
                  <svg viewBox="0 0 20 20" width="20" height="20" fill="grey">
                    <g transform="translate(-446 -350)">
                      <path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
                    </g>
                  </svg>
                </ToolTip>
              </div>
            </div>
          </div>
          {contactsArray.map((item, index) => {
            return (
              <div className="contacts-item flex items-center" key={index}>
                <div className="contacts-item-image">
                  <img src={item.img} alt="" />
                  {(item.active || item.lastSeen) && (
                    <div className="active-div flex justify-center items-center">
                      {item.active && <CircleFill className="active-circle" />}
                      {item.lastSeen && <p>{item.lastSeen}</p>}
                    </div>
                  )}
                </div>
                <p className="text-sm ml-3">{item.title}</p>
              </div>
            );
          })}
        </div>
        <div className="splitter-line mt-2"></div>
        <div>
          <h1 className="text-slate-500 font-bold mt-3">Group conversations</h1>
          <div className="birthday-div flex items-center">
            <div className="create-new-group-icon">
              <Plus />
            </div>
            <p>Create new group</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContacts;
