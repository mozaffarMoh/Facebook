import "./HeaderSearch.scss";
import React from "react";
import { Facebook, Search, ArrowLeft } from "react-bootstrap-icons";
import { MediaQuery } from "../../MediaQuery";
import SearchDialog from "../../SearchDialog/SearchDialog";
import { CSSTransition } from "react-transition-group";

const HeaderSearch = () => {
  const [showSearchDialog, setShowSearchDialog] = React.useState(false);
  const { isScreen800, isScreen555 } = MediaQuery();
  const searchDialogRef: any = React.useRef(null);

  return (
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
    </div>
  );
};

export default HeaderSearch;
