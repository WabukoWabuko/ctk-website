import React from 'react';

const Give = () => {
  return (
    <div className="container my-5">
      <div className="hero">
        <h1 className="display-4">Support Our Mission</h1>
        <p className="lead">Your offering sustains our worship and outreach.</p>
      </div>
      <div className="text-center mt-4">
        <a href="https://paypal.me/yourchurch" className="btn btn-outline-warning btn-lg">
          Give Online
        </a>
        <p className="mt-3">Or place your offering in the plate during Sunday service.</p>
      </div>
    </div>
  );
};

export default Give;
