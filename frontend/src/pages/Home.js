import React from 'react';

const Home = () => {
  return (
    <div className="container my-5">
      <div className="text-center">
        <h1 className="display-4 fw-bold" style={{ color: '#4B2E5A' }}>
          Welcome to Christ the King
        </h1>
        <p className="lead">
          A vibrant Anglican parish celebrating the reign of Christ through worship, fellowship, and service.
        </p>
        <button className="btn btn-outline-warning mt-3">Join Us Sunday at 10 AM</button>
      </div>
    </div>
  );
};

export default Home;
