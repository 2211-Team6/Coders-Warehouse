import { Link } from "react-router-dom";
import Products from "./Products";

const Home = ({token}) => {
  return (
    <div>
      <Link to="/login">Log in!</Link>
      <br></br>
      <Link to="/register" className="nav">
        Register!
      </Link>
      <br></br>
      <Products/>
    </div>
  );
};

export default Home