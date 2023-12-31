import "./progress-bar.scss";
import { useSpring, animated } from "@react-spring/web";

const ProgressBar = ({ pause, reset, next }: any) => {
  const props = useSpring({
    from: { width: "0%", backgroundColor: "grey" },
    to: { width: "100%" },
    config: { duration: 6000},
    pause: pause,
    reset : reset,
    onRest: next
  });

  return (
    <div className="progress-bar-container">
    <animated.div style={props} className="animate-div">
      <div className="progress-bar"></div>
    </animated.div>
    </div>
  );
};

export default ProgressBar;
