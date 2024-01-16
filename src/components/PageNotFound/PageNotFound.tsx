import { Link } from "react-router-dom";
import "./PageNotFound.scss";
const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <h1>:( URL NOT FOUND :(</h1>
      <h4>Sorry we can't find this url in our website</h4>
      <Link to="/Facebook/">
        <button className="page-button">Back To Home</button>
      </Link>
    </div>
  );
};

export default PageNotFound;
