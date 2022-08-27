import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.js";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Mybooking</span>
        </Link>
        {user ? (
          user.username
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
