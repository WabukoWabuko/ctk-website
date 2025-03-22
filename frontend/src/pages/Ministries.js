import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Ministries = () => {
  const [ministries, setMinistries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/ministries/')
      .then(res => setMinistries(res.data))
      .catch(err => console.error('Error fetching ministries:', err));
  }, []);

  return (
    <div className="container my-5">
      <div className="hero">
        <h1 className="display-4 fw-bold">Ministries</h1>
        <p className="lead">Grow and serve in our parish groups.</p>
      </div>
      <div className="row">
        {ministries.map(ministry => (
          <div className="col-md-4 mb-4" key={ministry.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ministry.name}</h5>
                <p>{ministry.description}</p>
                <p><strong>Leader:</strong> {ministry.leader}</p>
                <p><strong>Meets:</strong> {ministry.meeting_time}</p>
                <a href="mailto:info@ctkanglican.org" className="btn btn-outline-warning">Get Involved</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ministries;
