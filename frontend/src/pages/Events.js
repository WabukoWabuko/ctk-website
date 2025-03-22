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
      <h1 style={{ color: '#4B2E5A' }}>Our Gatherings</h1>
      <p>Come together in faith and community.</p>
      <div className="row">
        {events.map(event => (
          <div className="col-md-4 mb-3" key={event.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">{new Date(event.date).toLocaleString()}</p>
                <p>{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
