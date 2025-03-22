import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sermons = () => {
  const [sermons, setSermons] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/sermons/')
      .then(response => setSermons(response.data))
      .catch(error => console.error('Error fetching sermons:', error));
  }, []);

  return (
    <div className="container my-5">
      <h1 style={{ color: '#4B2E5A' }}>Sermons</h1>
      <p>Hear the Word proclaimed.</p>
      <div className="row">
        {sermons.map(sermon => (
          <div className="col-md-4 mb-3" key={sermon.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{sermon.title}</h5>
                <p className="card-text">{new Date(sermon.date).toLocaleDateString()}</p>
                {sermon.audio_url && <a href={sermon.audio_url} className="btn btn-outline-warning">Listen</a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sermons;
