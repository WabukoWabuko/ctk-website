import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [sermons, setSermons] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/admin-login');
      return;
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    axios.get('http://localhost:8000/api/events/', config).then(res => setEvents(res.data));
    axios.get('http://localhost:8000/api/sermons/', config).then(res => setSermons(res.data));
    axios.get('http://localhost:8000/api/offerings/', config).then(res => setOfferings(res.data));
  }, [token, navigate]);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axios.post('http://localhost:8000/api/events/', newEvent, config);
    setEvents([...events, res.data]);
    setNewEvent({ title: '', date: '', description: '' });
  };

  const handleDelete = async (type, id) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.delete(`http://localhost:8000/api/${type}/${id}/`, config);
    if (type === 'events') setEvents(events.filter(item => item.id !== id));
    if (type === 'sermons') setSermons(sermons.filter(item => item.id !== id));
    if (type === 'offerings') setOfferings(offerings.filter(item => item.id !== id));
  };

  return (
    <div className="container my-5">
      <div className="hero">
        <h1>Admin Sanctuary</h1>
        <p>Steward our parish’s resources with grace.</p>
      </div>

      {/* Add Event Form */}
      <div className="card p-4 mb-4" style={{ backgroundColor: '#F8F9FA' }}>
        <h3>Add Next Event</h3>
        <form onSubmit={handleAddEvent}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <input
              type="datetime-local"
              className="form-control"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-outline-warning">Proclaim Event</button>
        </form>
      </div>

      {/* Events List */}
      <h3>Gatherings</h3>
      <div className="row">
        {events.map(event => (
          <div className="col-md-4 mb-3" key={event.id}>
            <div className="card">
              <div className="card-body">
                <h5>{event.title}</h5>
                <p>{new Date(event.date).toLocaleString()}</p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete('events', event.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sermons and Offerings similarly */}
    </div>
  );
};

export default AdminDashboard;
