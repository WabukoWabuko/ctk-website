import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/events/')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div className="container my-5">
      <div className="hero">
        <h1>Our Gatherings</h1>
        <p>Join us in worship and fellowship.</p>
      </div>
      <div className="row">
        {events.map(event => (
          <div className="col-md-4 mb-4" key={event.id}>
            <div className="card">
              {event.image && <img src={event.image} className="card-img-top" alt={event.title} />}
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p>{new Date(event.date).toLocaleString()}</p>
                <p>{event.description}</p>
                {event.video && (
                  <video controls className="w-100">
                    <source src={event.video} type="video/mp4" />
                  </video>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
