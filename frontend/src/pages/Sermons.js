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
      <div className="hero">
        <h1>Sermons</h1>
        <p>Hear the Word proclaimed in our parish.</p>
      </div>
      <div className="row">
        {sermons.map(sermon => (
          <div className="col-md-4 mb-4" key={sermon.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{sermon.title}</h5>
                <p>{new Date(sermon.date).toLocaleDateString()}</p>
                {sermon.audio_url && (
                  <audio controls className="w-100">
                    <source src={sermon.audio_url} type="audio/mp3" />
                  </audio>
                )}
                {sermon.video_url && (
                  <video controls className="w-100">
                    <source src={sermon.video_url} type="video/mp4" />
                  </video>
                )}
                {sermon.text && <p>{sermon.text.slice(0, 100)}...</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sermons;
