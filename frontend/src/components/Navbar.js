import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  console.log(isLoggedIn);

  return (
    <div className="navbar">
      <figure className="profile-image">
        <img src={require("../cromwell.png")} alt="" />
      </figure>

      <div className="links">
        <Link to="/">Home</Link>
        {/* <Link to="/register">Register</Link> */}
        {!isLoggedIn && <Link to="/login">Login/Register</Link>}
        <Link to="/profile/">Profile</Link>
      </div>
    </div>
  );
};

export default Navbar;
