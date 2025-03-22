import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/admin-login');
      return;
    }
    axios.get('http://localhost:8000/api/events/', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(response => setEvents(response.data));
  }, [token, navigate]);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/events/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">Admin Sanctuary</h1>
      <p className="text-center">Manage parish events with care.</p>
      <button className="btn btn-outline-warning mb-3">Add New Event</button>
      <div className="row">
        {events.map(event => (
          <div className="col-md-4 mb-3" key={event.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p>{new Date(event.date).toLocaleString()}</p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(event.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
