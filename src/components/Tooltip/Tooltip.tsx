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
            width: `${text.length > 15 && "175px"}`,
            left: `${text.length > 15 && "-60px"}`,
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
