import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/gallery/')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching gallery:', error));
  }, []);

  return (
    <div className="container my-5">
      <div className="hero">
        <h1>Parish Gallery</h1>
        <p>Moments of grace captured in our community.</p>
      </div>
      <div className="row">
        {items.map(item => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card">
              {item.image && <img src={item.image} className="card-img-top" alt={item.title} />}
              {item.video && (
                <video controls className="card-img-top">
                  <source src={item.video} type="video/mp4" />
                </video>
              )}
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p>{item.description}</p>
                <small>{new Date(item.date).toLocaleDateString()}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
