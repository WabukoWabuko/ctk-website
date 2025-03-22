import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [sermons, setSermons] = useState([]);
  const [rotas, setRotas] = useState([]);
  const [verses, setVerses] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '', image: null, video: null });
  const [newSermon, setNewSermon] = useState({ title: '', date: '', text: '', audio: null, video: null });
  const [newRota, setNewRota] = useState({ title: '', date: '', details: '' });
  const [newVerse, setNewVerse] = useState({ verse_text: '', reference: '', date: '' });
  const [newGallery, setNewGallery] = useState({ title: '', description: '', date: '', image: null, video: null });
  const [newOffering, setNewOffering] = useState({ amount: '', donor_name: '', date: '', note: '' });
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
    axios.get('http://localhost:8000/api/rotas/', config).then(res => setRotas(res.data));
    axios.get('http://localhost:8000/api/verses/', config).then(res => setVerses(res.data));
    axios.get('http://localhost:8000/api/gallery/', config).then(res => setGallery(res.data));
    axios.get('http://localhost:8000/api/offerings/', config).then(res => setOfferings(res.data));
  }, [token, navigate]);

  const handleAdd = async (e, endpoint, data, setter, reset) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in data) {
      if (data[key]) formData.append(key, data[key]);
    }
    const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };
    try {
      const res = await axios.post(`http://localhost:8000/api/${endpoint}/`, formData, config);
      setter(prev => [...prev, res.data]);
      reset();
    } catch (error) {
      console.error(`Error adding ${endpoint}:`, error.response?.data || error);
    }
  };

  const handleDelete = async (endpoint, id, setter, items) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.delete(`http://localhost:8000/api/${endpoint}/${id}/`, config);
    setter(items.filter(item => item.id !== id));
  };

  return (
    <div className="container-fluid my-5">
      <div className="row">
        {/* Sidebar Menu */}
        <div className="col-md-3">
          <div className="card" style={{ backgroundColor: '#4B2E5A', color: '#D4A017', height: '100%' }}>
            <div className="card-body">
              <h3 className="text-center">Admin Sanctuary</h3>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <button className={`nav-link btn ${activeTab === 'events' ? 'btn-warning' : 'btn-outline-warning'} w-100 mb-2`} onClick={() => setActiveTab('events')}>
                    Gatherings
                  </button>
                </li>
                <li className="nav-item">
                  <button className={`nav-link btn ${activeTab === 'sermons' ? 'btn-warning' : 'btn-outline-warning'} w-100 mb-2`} onClick={() => setActiveTab('sermons')}>
                    Sermons
                  </button>
                </li>
                <li className="nav-item">
                  <button className={`nav-link btn ${activeTab === 'rotas' ? 'btn-warning' : 'btn-outline-warning'} w-100 mb-2`} onClick={() => setActiveTab('rotas')}>
                    Rotas
                  </button>
                </li>
                <li className="nav-item">
                  <button className={`nav-link btn ${activeTab === 'verses' ? 'btn-warning' : 'btn-outline-warning'} w-100 mb-2`} onClick={() => setActiveTab('verses')}>
                    Scripture
                  </button>
                </li>
                <li className="nav-item">
                  <button className={`nav-link btn ${activeTab === 'gallery' ? 'btn-warning' : 'btn-outline-warning'} w-100 mb-2`} onClick={() => setActiveTab('gallery')}>
                    Gallery
                  </button>
                </li>
                <li className="nav-item">
                  <button className={`nav-link btn ${activeTab === 'offerings' ? 'btn-warning' : 'btn-outline-warning'} w-100 mb-2`} onClick={() => setActiveTab('offerings')}>
                    Offerings
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="col-md-9">
          <div className="card p-4" style={{ backgroundColor: '#F8F9FA', borderRadius: '15px' }}>
            <h2 className="text-center mb-4" style={{ color: '#4B2E5A' }}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
            </h2>

            {/* Events */}
            {activeTab === 'events' && (
              <div>
                <form onSubmit={(e) => handleAdd(e, 'events', newEvent, setEvents, () => setNewEvent({ title: '', date: '', description: '', image: null, video: null }))}>
                  <input type="text" className="form-control mb-3" placeholder="Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                  <input type="datetime-local" className="form-control mb-3" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
                  <textarea className="form-control mb-3" placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
                  <input type="file" className="form-control mb-3" accept="image/*" onChange={(e) => setNewEvent({ ...newEvent, image: e.target.files[0] })} />
                  <input type="file" className="form-control mb-3" accept="video/*" onChange={(e) => setNewEvent({ ...newEvent, video: e.target.files[0] })} />
                  <button type="submit" className="btn btn-outline-warning w-100">Proclaim Event</button>
                </form>
                <div className="row mt-4">
                  {events.map(item => (
                    <div className="col-md-4 mb-3" key={item.id}>
                      <div className="card">
                        <div className="card-body">
                          <h5>{item.title}</h5>
                          <p>{new Date(item.date).toLocaleString()}</p>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete('events', item.id, setEvents, events)}>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sermons */}
            {activeTab === 'sermons' && (
              <div>
                <form onSubmit={(e) => handleAdd(e, 'sermons', newSermon, setSermons, () => setNewSermon({ title: '', date: '', text: '', audio: null, video: null }))}>
                  <input type="text" className="form-control mb-3" placeholder="Title" value={newSermon.title} onChange={(e) => setNewSermon({ ...newSermon, title: e.target.value })} />
                  <input type="date" className="form-control mb-3" value={newSermon.date} onChange={(e) => setNewSermon({ ...newSermon, date: e.target.value })} />
                  <textarea className="form-control mb-3" placeholder="Text" value={newSermon.text} onChange={(e) => setNewSermon({ ...newSermon, text: e.target.value })} />
                  <input type="file" className="form-control mb-3" accept="audio/*" onChange={(e) => setNewSermon({ ...newSermon, audio: e.target.files[0] })} />
                  <input type="file" className="form-control mb-3" accept="video/*" onChange={(e) => setNewSermon({ ...newSermon, video: e.target.files[0] })} />
                  <button type="submit" className="btn btn-outline-warning w-100">Add Sermon</button>
                </form>
                <div className="row mt-4">
                  {sermons.map(item => (
                    <div className="col-md-4 mb-3" key={item.id}>
                      <div className="card">
                        <div className="card-body">
                          <h5>{item.title}</h5>
                          <p>{new Date(item.date).toLocaleDateString()}</p>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete('sermons', item.id, setSermons, sermons)}>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rotas */}
            {activeTab === 'rotas' && (
              <div>
                <form onSubmit={(e) => handleAdd(e, 'rotas', newRota, setRotas, () => setNewRota({ title: '', date: '', details: '' }))}>
                  <input type="text" className="form-control mb-3" placeholder="Title" value={newRota.title} onChange={(e) => setNewRota({ ...newRota, title: e.target.value })} />
                  <input type="date" className="form-control mb-3" value={newRota.date} onChange={(e) => setNewRota({ ...newRota, date: e.target.value })} />
                  <textarea className="form-control mb-3" placeholder="Details (e.g., Reader: Jane)" value={newRota.details} onChange={(e) => setNewRota({ ...newRota, details: e.target.value })} />
                  <button type="submit" className="btn btn-outline-warning w-100">Share Rota</button>
                </form>
                <div className="row mt-4">
                  {rotas.map(item => (
                    <div className="col-md-4 mb-3" key={item.id}>
                      <div className="card">
                        <div className="card-body">
                          <h5>{item.title}</h5>
                          <p>{new Date(item.date).toLocaleDateString()}</p>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete('rotas', item.id, setRotas, rotas)}>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verses */}
            {activeTab === 'verses' && (
              <div>
                <form onSubmit={(e) => handleAdd(e, 'verses', newVerse, setVerses, () => setNewVerse({ verse_text: '', reference: '', date: '' }))}>
                  <textarea className="form-control mb-3" placeholder="Verse Text" value={newVerse.verse_text} onChange={(e) => setNewVerse({ ...newVerse, verse_text: e.target.value })} />
                  <input type="text" className="form-control mb-3" placeholder="Reference (e.g., John 3:16)" value={newVerse.reference} onChange={(e) => setNewVerse({ ...newVerse, reference: e.target.value })} />
                  <input type="date" className="form-control mb-3" value={newVerse.date} onChange={(e) => setNewVerse({ ...newVerse, date: e.target.value })} />
                  <button type="submit" className="btn btn-outline-warning w-100">Proclaim Verse</button>
                </form>
                <div className="row mt-4">
                  {verses.map(item => (
                    <div className="col-md-4 mb-3" key={item.id}>
                      <div className="card">
                        <div className="card-body">
                          <h5>{item.reference}</h5>
                          <p>{item.verse_text.slice(0, 50)}...</p>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete('verses', item.id, setVerses, verses)}>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {activeTab === 'gallery' && (
              <div>
                <form onSubmit={(e) => handleAdd(e, 'gallery', newGallery, setGallery, () => setNewGallery({ title: '', description: '', date: '', image: null, video: null }))}>
                  <input type="text" className="form-control mb-3" placeholder="Title" value={newGallery.title} onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })} />
                  <textarea className="form-control mb-3" placeholder="Description" value={newGallery.description} onChange={(e) => setNewGallery({ ...newGallery, description: e.target.value })} />
                  <input type="date" className="form-control mb-3" value={newGallery.date} onChange={(e) => setNewGallery({ ...newGallery, date: e.target.value })} />
                  <input type="file" className="form-control mb-3" accept="image/*" onChange={(e) => setNewGallery({ ...newGallery, image: e.target.files[0] })} />
                  <input type="file" className="form-control mb-3" accept="video/*" onChange={(e) => setNewGallery({ ...newGallery, video: e.target.files[0] })} />
                  <button type="submit" className="btn btn-outline-warning w-100">Add to Gallery</button>
                </form>
                <div className="row mt-4">
                  {gallery.map(item => (
                    <div className="col-md-4 mb-3" key={item.id}>
                      <div className="card">
                        <div className="card-body">
                          <h5>{item.title}</h5>
                          <p>{item.description.slice(0, 50)}...</p>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete('gallery', item.id, setGallery, gallery)}>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Offerings */}
            {activeTab === 'offerings' && (
              <div>
                <form onSubmit={(e) => handleAdd(e, 'offerings', newOffering, setOfferings, () => setNewOffering({ amount: '', donor_name: '', date: '', note: '' }))}>
                  <input type="number" step="0.01" className="form-control mb-3" placeholder="Amount" value={newOffering.amount} onChange={(e) => setNewOffering({ ...newOffering, amount: e.target.value })} />
                  <input type="text" className="form-control mb-3" placeholder="Donor Name (optional)" value={newOffering.donor_name} onChange={(e) => setNewOffering({ ...newOffering, donor_name: e.target.value })} />
                  <input type="date" className="form-control mb-3" value={newOffering.date} onChange={(e) => setNewOffering({ ...newOffering, date: e.target.value })} />
                  <textarea className="form-control mb-3" placeholder="Note" value={newOffering.note} onChange={(e) => setNewOffering({ ...newOffering, note: e.target.value })} />
                  <button type="submit" className="btn btn-outline-warning w-100">Record Offering</button>
                </form>
                <div className="row mt-4">
                  {offerings.map(item => (
                    <div className="col-md-4 mb-3" key={item.id}>
                      <div className="card">
                        <div className="card-body">
                          <h5>${item.amount}</h5>
                          <p>{item.donor_name || 'Anonymous'} - {new Date(item.date).toLocaleDateString()}</p>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete('offerings', item.id, setOfferings, offerings)}>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
