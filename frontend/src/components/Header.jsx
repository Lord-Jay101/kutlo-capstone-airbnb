import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RedLogo from "../assets/airbnb-logo.png";
import WhiteLogo from "../assets/airbnb-white-logo.png";
import { FaBars, FaUserCircle, FaGlobe } from "react-icons/fa";
import { useAuth } from "../auth/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isHost = user?.role === "host" || user?.role === "admin";

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className={`header ${isHomePage ? "header-home" : ""}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <img
            src={isHomePage ? WhiteLogo : RedLogo}
            alt="Airbnb Logo"
          />
        </Link>

        <div className="center-nav">
          <Link to="/view-listings" className="nav-link">
            Places to stay
          </Link>
          <span className="nav-link">Experiences</span>
          <span className="nav-link">Online Experiences</span>
        </div>

        <div className="right-menu">
          {(!user || !isHost) && (
            <Link to="/admin-login" className="host-link">
              Become a Host
            </Link>
          )}

          {user && (
            <>
              <span className="header-username">Hi, {user.username}</span>
              <button type="button" className="header-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}

          <FaGlobe className="globe-icon" />

          <div
            ref={menuRef}
            className="user-menu"
            onClick={() => setMenuOpen((open) => !open)}
            role="button"
            tabIndex={0}
            aria-expanded={menuOpen}
            aria-label="Account menu"
          >
            <FaBars className="user-menu-icon" />
            <FaUserCircle className="user-menu-icon" />
            {menuOpen && (
              <div className="dropdown" onClick={(event) => event.stopPropagation()}>
                {user ? (
                  <>
                    <p className="user-greeting">Hi, {user.username}</p>
                    {isHost ? (
                      <Link
                        to="/dashboard"
                        className="dropdown-link"
                        onClick={() => setMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/reservations"
                        className="dropdown-link"
                        onClick={() => setMenuOpen(false)}
                      >
                        My Reservations
                      </Link>
                    )}
                    <button
                      type="button"
                      className="logout-btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="login-btn"
                      onClick={(event) => {
                        event.stopPropagation();
                        setMenuOpen(false);
                        navigate("/login");
                      }}
                    >
                      Guest Login
                    </button>
                    <button
                      type="button"
                      className="login-btn"
                      onClick={(event) => {
                        event.stopPropagation();
                        setMenuOpen(false);
                        navigate("/admin-login");
                      }}
                    >
                      Host Login
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
