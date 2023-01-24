import { Link } from "react-router-dom";
import Products from "./Products";

const Home = () => {
  return (
    <div>
      <Link to="/login">Need to log in? Click Here and get going!</Link>
      <br></br>
      <Link to="/register">
        Not signed up yet? Click Here to get registered!
      </Link>
      <br></br>
      <Products />
    </div>
  );
};

export default Home