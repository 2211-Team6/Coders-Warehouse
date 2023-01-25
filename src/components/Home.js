import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/login">Need to log in? Click Here and get going!</Link>
      <br></br>
      <Link to="/register">
        Not signed up yet? Click Here to get registered!
      </Link>
      <br></br>
      <Link to="/cart"> Checkout here!</Link>
    </div>
  );
};

export default Home