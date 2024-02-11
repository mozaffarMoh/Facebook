import "./Animations.scss";
import like from "../../assets/images/animartions-imoges/like.gif";
import love from "../../assets/images/animartions-imoges/love.gif";
import care from "../../assets/images/animartions-imoges/care.gif";
import haha from "../../assets/images/animartions-imoges/haha.gif";
import wow from "../../assets/images/animartions-imoges/wow.gif";
import sad from "../../assets/images/animartions-imoges/sad.gif";
import angry from "../../assets/images/animartions-imoges/angry.gif";
import React from "react";

interface AnimationType {
  reaction: (value: string) => void;
  positionInPosts?: boolean;
  FlyAnimations?: boolean;
}

const Animations = ({
  reaction,
  positionInPosts,
  FlyAnimations,
}: AnimationType) => {
  const animationsArray = [
    {
      title: "Like",
      src: like,
    },
    {
      title: "Love",
      src: love,
    },

    {
      title: "Care",
      src: care,
    },

    {
      title: "Haha",
      src: haha,
    },
    {
      title: "Wow",
      src: wow,
    },
    {
      title: "Sad",
      src: sad,
    },
    {
      title: "Angry",
      src: angry,
    },
  ];

  const [startFly, setStartFly] = React.useState(false);
  const [flyIndex, setFlyIndex] = React.useState(0);

  /* Send Reaction to Parent */
  const handleReaction = (value: string) => {
    reaction(value);
  };

  /* Start Fly */
  const handleFly = (index: number) => {
    if (FlyAnimations) {
      setStartFly(true);
      setFlyIndex(index);
    }
  };

  /* Stop Fly */
  React.useEffect(() => {
    setTimeout(() => {
      setStartFly(false);
    }, 700);
  }, [startFly]);

  return (
    <div className={`animations ${positionInPosts && "positionInPosts"}`}>
      {animationsArray.map((item, index) => {
        return (
          <div
            className="item"
            key={index}
            onClick={() => handleReaction(item.title)}
          >
            <p>{item.title}</p>
            <img
              src={item.src}
              loading="lazy"
              className={`${item.title === "Care" && "care-item px-2"}`}
              onClick={() => handleFly(index)}
            />
            {FlyAnimations && startFly && index === flyIndex && (
              <img
                src={item.src}
                className={`${
                  item.title === "Care" && "care-item px-2"
                } fly-animation`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Animations;
