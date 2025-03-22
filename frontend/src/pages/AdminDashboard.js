import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [sermons, setSermons] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [rotas, setRotas] = useState([]);
  const [verses, setVerses] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });
  const [newRota, setNewRota] = useState({ title: '', date: '', details: '' });
  const [newVerse, setNewVerse] = useState({ verse_text: '', reference: '', date: '' });
  const [newGallery, setNewGallery] = useState({ title: '', description: '', date: '' });
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
    axios.get('http://localhost:8000/api/rotas/', config).then(res => setRotas(res.data));
    axios.get('http://localhost:8000/api/verses/', config).then(res => setVerses(res.data));
    axios.get('http://localhost:8000/api/gallery/', config).then(res => setGallery(res.data));
  }, [token, navigate]);

  const handleAdd = async (e, endpoint, data, setter, reset) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axios.post(`http://localhost:8000/api/${endpoint}/`, data, config);
    setter(prev => [...prev, res.data]);
    reset();
  };

  const handleDelete = async (endpoint, id, setter, items) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.delete(`http://localhost:8000/api/${endpoint}/${id}/`, config);
    setter(items.filter(item => item.id !== id));
  };

  return (
    <div className="container my-5">
      <div className="hero">
        <h1>Admin Sanctuary</h1>
        <p>Steward our parish’s life with grace and diligence.</p>
      </div>

      {/* Add Event */}
      <div className="card p-4 mb-4" style={{ backgroundColor: '#F8F9FA' }}>
        <h3>Proclaim a Gathering</h3>
        <form onSubmit={(e) => handleAdd(e, 'events', newEvent, setEvents, () => setNewEvent({ title: '', date: '', description: '' }))}>
          <input type="text" className="form-control mb-3" placeholder="Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
          <input type="datetime-local" className="form-control mb-3" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
          <textarea className="form-control mb-3" placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
          <button type="submit" className="btn btn-outline-warning">Add Event</button>
        </form>
      </div>

      {/* Add Rota */}
      <div className="card p-4 mb-4" style={{ backgroundColor: '#F8F9FA' }}>
        <h3>Share a Rota</h3>
        <form onSubmit={(e) => handleAdd(e, 'rotas', newRota, setRotas, () => setNewRota({ title: '', date: '', details: '' }))}>
          <input type="text" className="form-control mb-3" placeholder="Title" value={newRota.title} onChange={(e) => setNewRota({ ...newRota, title: e.target.value })} />
          <input type="date" className="form-control mb-3" value={newRota.date} onChange={(e) => setNewRota({ ...newRota, date: e.target.value })} />
          <textarea className="form-control mb-3" placeholder="Details (e.g., Reader: Jane)" value={newRota.details} onChange={(e) => setNewRota({ ...newRota, details: e.target.value })} />
          <button type="submit" className="btn btn-outline-warning">Add Rota</button>
        </form>
      </div>

      {/* Add Bible Verse */}
      <div className="card p-4 mb-4" style={{ backgroundColor: '#F8F9FA' }}>
        <h3>Proclaim a Verse</h3>
        <form onSubmit={(e) => handleAdd(e, 'verses', newVerse, setVerses, () => setNewVerse({ verse_text: '', reference: '', date: '' }))}>
          <textarea className="form-control mb-3" placeholder="Verse Text" value={newVerse.verse_text} onChange={(e) => setNewVerse({ ...newVerse, verse_text: e.target.value })} />
          <input type="text" className="form-control mb-3" placeholder="Reference (e.g., John 3:16)" value={newVerse.reference} onChange={(e) => setNewVerse({ ...newVerse, reference: e.target.value })} />
          <input type="date" className="form-control mb-3" value={newVerse.date} onChange={(e) => setNewVerse({ ...newVerse, date: e.target.value })} />
          <button type="submit" className="btn btn-outline-warning">Add Verse</button>
        </form>
      </div>

      {/* Add Gallery Item */}
      <div className="card p-4 mb-4" style={{ backgroundColor: '#F8F9FA' }}>
        <h3>Capture a Moment</h3>
        <form onSubmit={(e) => handleAdd(e, 'gallery', newGallery, setGallery, () => setNewGallery({ title: '', description: '', date: '' }))}>
          <input type="text" className="form-control mb-3" placeholder="Title" value={newGallery.title} onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })} />
          <textarea className="form-control mb-3" placeholder="Description" value={newGallery.description} onChange={(e) => setNewGallery({ ...newGallery, description: e.target.value })} />
          <input type="date" className="form-control mb-3" value={newGallery.date} onChange={(e) => setNewGallery({ ...newGallery, date: e.target.value })} />
          <button type="submit" className="btn btn-outline-warning">Add to Gallery</button>
        </form>
        <p className="mt-2">Note: Upload images/videos via Django Admin for now.</p>
      </div>

      {/* Manage Existing Items */}
      <h3>Manage Parish Life</h3>
      <div className="row">
        {events.map(item => (
          <div className="col-md-4 mb-3" key={item.id}>
            <div className="card">
              <div className="card-body">
                <h5>{item.title} (Event)</h5>
                <p>{new Date(item.date).toLocaleString()}</p>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete('events', item.id, setEvents, events)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
        {rotas.map(item => (
          <div className="col-md-4 mb-3" key={item.id}>
            <div className="card">
              <div className="card-body">
                <h5>{item.title} (Rota)</h5>
                <p>{new Date(item.date).toLocaleDateString()}</p>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete('rotas', item.id, setRotas, rotas)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
        {verses.map(item => (
          <div className="col-md-4 mb-3" key={item.id}>
            <div className="card">
              <div className="card-body">
                <h5>{item.reference} (Verse)</h5>
                <p>{item.verse_text.slice(0, 50)}...</p>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete('verses', item.id, setVerses, verses)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
        {gallery.map(item => (
          <div className="col-md-4 mb-3" key={item.id}>
            <div className="card">
              <div className="card-body">
                <h5>{item.title} (Gallery)</h5>
                <p>{item.description.slice(0, 50)}...</p>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete('gallery', item.id, setGallery, gallery)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
