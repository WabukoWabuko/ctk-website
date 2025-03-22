import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="hero">
        <h1 className="display-3 fw-bold">Welcome to Christ the King</h1>
        <p className="lead">
          Proclaiming the reign of Christ through worship, fellowship, and service.
        </p>
        <NavLink to="/events" className="btn btn-outline-warning btn-lg mt-3">
          Join Us This Sunday
        </NavLink>
      </div>
      <div className="container my-5">
        <h2 className="text-center">A Parish for All Seasons</h2>
        <p className="text-center">
          Rooted in Anglican tradition, we gather to celebrate the love and majesty of Christ our King.
        </p>
      </div>
    </div>
  );
};

export default Home;
