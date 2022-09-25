import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      {/* <h1>Cromwell developer test</h1> */}
      <figure className="profile-image">
        <img src={require("../cromwell.png")} alt="" />
      </figure>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
};

export default Navbar;
