import React from 'react';
import { NavLink } from 'react-router-dom';

const About = () => {
  return (
    <div className="container my-5">
      {/* Hero Section */}
      <div className="hero">
        <h1 className="display-4 fw-bold">Our Parish</h1>
        <p className="lead">
          Rooted in the Anglican tradition, Christ the King welcomes all to worship and serve under His reign.
        </p>
      </div>

      {/* Main Content */}
      <div className="row mt-5">
        {/* Left Column: Text */}
        <div className="col-md-6 mb-4">
          <h2>A Community of Faith</h2>
          <p>
            At Christ the King Anglican, we are a family gathered around the altar of our Lord. Steeped in the rich liturgy of the Book of Common Prayer, we celebrate the sacraments, proclaim the Gospel, and extend Christ’s love to our neighbors. Whether you’re seeking a spiritual home or a place to grow in faith, our doors are open.
          </p>
          <p>
            Our parish life reflects the rhythm of the church year—from the penitence of Lent to the joy of Easter, and the reign of Christ the King each November. Join us as we walk this journey together.
          </p>
          <NavLink to="/events" className="btn btn-outline-warning">
            Discover Our Gatherings
          </NavLink>
        </div>

        {/* Right Column: Image or Placeholder */}
        <div className="col-md-6 mb-4">
          <div className="card" style={{ backgroundColor: '#F8F9FA', border: 'none' }}>
            <img
              src="https://via.placeholder.com/500x300?text=Church+Image"
              className="card-img-top"
              alt="Christ the King Anglican Church"
            />
            <div className="card-body text-center">
              <p className="card-text">
                The sanctuary of Christ the King, where we gather in His name.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Clergy Section */}
      <div className="mt-5">
        <h2>Our Clergy</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src="https://via.placeholder.com/150?text=Priest"
                className="card-img-top rounded-circle mx-auto d-block mt-3"
                alt="Rector"
                style={{ width: '150px', height: '150px' }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">Rev. John Doe</h5>
                <p className="card-text">Rector</p>
              </div>
            </div>
          </div>
          {/* Add more clergy as needed */}
        </div>
      </div>
    </div>
  );
};

export default About;
