import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Verses = () => {
  const [verses, setVerses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/verses/')
      .then(response => setVerses(response.data))
      .catch(error => console.error('Error fetching verses:', error));
  }, []);

  return (
    <div className="container my-5">
      <div className="hero">
        <h1>Daily Scripture</h1>
        <p>Meditate on the Word each day.</p>
      </div>
      <div className="row">
        {verses.map(verse => (
          <div className="col-md-6 mb-4" key={verse.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{verse.reference}</h5>
                <p>{verse.verse_text}</p>
                <small>{new Date(verse.date).toLocaleDateString()}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Verses;
