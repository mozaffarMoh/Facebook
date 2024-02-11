import "./Animations.scss";
import like from "../../assets/images/animartions-imoges/like.gif";
import love from "../../assets/images/animartions-imoges/love.gif";
import care from "../../assets/images/animartions-imoges/care.gif";
import haha from "../../assets/images/animartions-imoges/haha.gif";
import wow from "../../assets/images/animartions-imoges/wow.gif";
import sad from "../../assets/images/animartions-imoges/sad.gif";
import angry from "../../assets/images/animartions-imoges/angry.gif";

interface AnimationType {
  reaction: (value: string) => void;
  positionInPosts?: boolean;
}

const Animations = ({ reaction, positionInPosts }: AnimationType) => {
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

  /* Send Reaction to Parent */
  const handleReaction = (value: string) => {
    reaction(value);
  };

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
            ></img>
          </div>
        );
      })}
    </div>
  );
};

export default Animations;
