import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const handleClick = async () => {
    try {
      await axios.get("/auth/logout/");
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (err) {}
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Mybooking</span>
        </Link>
        {user ? (
          <div className="logout">
            {user.username}
            <img
              onClick={handleClick}
              src="./img/logout.svg"
              alt="logout"
              className="navButton"
            />
          </div>
        ) : (
          <div className="navItems">
            <button onClick={() => navigate("/register")} className="navButton">
              Register
            </button>
            <button onClick={() => navigate("/login")} className="navButton">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
