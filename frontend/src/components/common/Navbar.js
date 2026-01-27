import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiVideo, FiLogOut, FiMoon, FiSun } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          <FiVideo className="brand-icon" />
          <span className="brand-text">Smart Learning</span>
        </Link>

        <div className="navbar-menu">
          <Link
            to="/dashboard"
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            <FiHome />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/history"
            className={`nav-link ${isActive('/history') ? 'active' : ''}`}
          >
            <FiVideo />
            <span>History</span>
          </Link>
        </div>

        <div className="navbar-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>

          {user && (
            <div className="user-menu">
              <span className="user-name">{user.username}</span>
              <button onClick={handleLogout} className="logout-btn">
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
