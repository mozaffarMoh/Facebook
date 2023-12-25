import { CircleFill, XLg } from "react-bootstrap-icons";
import "./SearchDialog.scss";
import kfc from "../../../src/assets/images/Search/KFC.jpg";
import barcelona from "../../../src/assets/images/Search/barcelona.jpg";
import microsoft from "../../../src/assets/images/Search/microsoft.jpg";
import React from "react";

const SearchDialog = ({ showSearchDialog, setShowSearchDialog }: any) => {
  const [searchArray, setSearchArray]: Array<any> = React.useState([
    { name: "KFC", img: kfc, new: "1 new" },
    { name: "FC Barcelona", img: barcelona, new: "3 new" },
    { name: "Microsoft", img: microsoft, new: "" },
  ]);
  const searchDialogRef: any = React.useRef(null);

  /* Close Dialog when click outside of it */
  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        searchDialogRef.current &&
        !searchDialogRef.current.contains(event.target)
      ) {
        setShowSearchDialog(false);
      }
    };

    if (showSearchDialog) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchDialog]);

  /* Remove Item */
  const removeItem = (index?: any) => {
    const newArray = [
      ...searchArray.slice(0, index),
      ...searchArray.slice(index + 1),
    ];
    setSearchArray(newArray);
  };

  return (
    <div className="search-dialog z-20 p-2" ref={searchDialogRef}>
      <div className="flex justify-between w-full mt-10 p-2">
        <p className="search-recent">Recent</p>
        <p className="search-edit">Edit</p>
      </div>
      {searchArray.map((item: any, index: number) => {
        return (
          <div
            className="history-search flex justify-between items-center h-100 mt-3 px-2 py-2 hover:bg-slate-100 hover:cursor-pointer rounded-lg"
            key={index}
          >
            <div className="flex w-3/4">
              <img
                src={item.img}
                alt="img"
                className="w-10 h-10 rounded-full"
              />

              <div className="flex flex-col justify-center ml-4">
                <h2 className="font-bold text-sm">{item.name}</h2>
                {item.new && (
                  <div className="flex items-center">
                    <CircleFill color="blue" size={6} />
                    <p>{item.new}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex w-1/4 justify-end">
              <div
                className="flex justify-center items-center hover:cursor-pointer hover:bg-slate-200 p-1 h-8 w-8 rounded-full mt-1"
                onClick={() => removeItem(index)}
              >
                <XLg className="h-3" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchDialog;
