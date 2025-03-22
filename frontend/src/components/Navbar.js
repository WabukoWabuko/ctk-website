import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">Christ the King Anglican</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/">Welcome</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">Our Parish</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/events">Gatherings</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/sermons">Sermons</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/rotas">Rotas</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/verses">Scripture</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/gallery">Gallery</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/give">Give</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">Reach Out</NavLink></li>
            <li className="nav-item">
              <NavLink className="nav-link btn btn-outline-warning ms-2 px-3" to="/admin-login">Admin</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
