import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stream = () => {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/streams/')
      .then(res => setStreams(res.data))
      .catch(err => console.error('Error fetching streams:', err));
  }, []);

  return (
    <div className="container my-5">
      <div className="hero">
        <h1 className="display-4 fw-bold">Worship Online</h1>
        <p className="lead">Join us from wherever you are.</p>
      </div>
      <div className="row">
        {streams.map(stream => (
          <div className="col-md-6 mb-4" key={stream.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{stream.title} {stream.is_live && <span className="badge bg-danger">Live</span>}</h5>
                <p>{new Date(stream.date).toLocaleString()}</p>
                <iframe src={stream.video_url} width="100%" height="315" title={stream.title} frameBorder="0" allowFullScreen></iframe>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stream;
