import Header from "../Header/Header";
import "./OtherPages.scss";

const OtherPages = ({ pageName }: any) => {
  const handleChangeColor = () => {
    if (pageName === "Videos") {
      return "text-blue-600";
    }
    if (pageName === "Groups") {
      return "text-red-400";
    }
    if (pageName === "Gaming") {
      return "text-green-600";
    }
  };

  return (
    <div>
      <Header />
      <div className={`flexCenter other-pages ${handleChangeColor()}`}>
        <h1>{pageName} Page</h1>
      </div>
    </div>
  );
};

export default OtherPages;
