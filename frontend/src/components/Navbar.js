import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#4B2E5A' }}>
      <div className="container">
        <NavLink className="navbar-brand fw-bold text-white" to="/">Christ the King Anglican</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/">Welcome</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/about">Our Parish</NavLink>
            </li>
            {/* Worship Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="worshipDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Worship
              </a>
              <ul className="dropdown-menu" aria-labelledby="worshipDropdown">
                <li><NavLink className="dropdown-item" to="/events">Gatherings</NavLink></li>
                <li><NavLink className="dropdown-item" to="/sermons">Sermons</NavLink></li>
                <li><NavLink className="dropdown-item" to="/liturgical">Liturgical Calendar</NavLink></li>
                <li><NavLink className="dropdown-item" to="/lectionary">Readings</NavLink></li>
                <li><NavLink className="dropdown-item" to="/stream">Worship Online</NavLink></li>
                <li><NavLink className="dropdown-item" to="/prayer">Prayer</NavLink></li>
              </ul>
            </li>
            {/* Community Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="communityDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Community
              </a>
              <ul className="dropdown-menu" aria-labelledby="communityDropdown">
                <li><NavLink className="dropdown-item" to="/rotas">Rotas</NavLink></li>
                <li><NavLink className="dropdown-item" to="/volunteer">Volunteer</NavLink></li>
                <li><NavLink className="dropdown-item" to="/directory">Directory</NavLink></li>
                <li><NavLink className="dropdown-item" to="/ministries">Ministries</NavLink></li>
                <li><NavLink className="dropdown-item" to="/gallery">Gallery</NavLink></li>
              </ul>
            </li>
            {/* Resources Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="resourcesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Resources
              </a>
              <ul className="dropdown-menu" aria-labelledby="resourcesDropdown">
                <li><NavLink className="dropdown-item" to="/verses">Scripture</NavLink></li>
                <li><NavLink className="dropdown-item" to="/news">News</NavLink></li>
                <li><NavLink className="dropdown-item" to="/give">Give</NavLink></li>
                <li><NavLink className="dropdown-item" to="/feedback">Feedback</NavLink></li>
                <li><NavLink className="dropdown-item" to="/contact">Reach Out</NavLink></li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link btn btn-outline-warning ms-2 px-3 text-white" to="/admin-login">Admin</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
