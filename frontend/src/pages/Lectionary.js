import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Lectionary = () => {
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/lectionary/')
      .then(res => setReadings(res.data))
      .catch(err => console.error('Error fetching lectionary:', err));
  }, []);

  return (
    <div className="container my-5">
      <div className="hero">
        <h1 className="display-4 fw-bold">Lectionary Readings</h1>
        <p className="lead">Prepare your heart with the Word.</p>
      </div>
      <div className="row">
        {readings.map(reading => (
          <div className="col-md-6 mb-4" key={reading.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{new Date(reading.date).toLocaleDateString()}</h5>
                <p><strong>Old Testament:</strong> {reading.old_testament}</p>
                <p><strong>Psalm:</strong> {reading.psalm}</p>
                <p><strong>Epistle:</strong> {reading.epistle}</p>
                <p><strong>Gospel:</strong> {reading.gospel}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lectionary;
