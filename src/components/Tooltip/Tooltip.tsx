import { useState } from "react";
import PropTypes from "prop-types";
import "./Tooltip.scss"; // You can create a separate CSS file for styling

const ToolTip = ({ text, children }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => {
    setIsVisible(true);
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  const changeWidth = () => {
    if (text.includes("Search")) {
      return "175px";
    } else if (text.includes("Esc")) {
      return "130px";
    } else if (text.includes("this")) {
      return "135px";
    } else {
      return "fit-content";
    }
  };
  const changeHeight = () => {
    return "fit-content";
  };
  const changeLeftPosition = () => {
    if (text.includes("Search")) {
      return "-60px";
    } else if (text.includes("Esc")) {
      return "60px";
    }
  };
  const changeBottomPosition = () => {
    if (text.includes("this")) {
      return "-37px";
    }
  };

  return (
    <div
      className="custom-tooltip-container z-30"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {isVisible && (
        <div
          className="custom-tooltip"
          style={{
            width: changeWidth(),
            height: changeHeight(),
            left: changeLeftPosition(),
            top: changeBottomPosition(),
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

ToolTip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ToolTip;
