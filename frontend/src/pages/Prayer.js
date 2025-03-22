import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Prayer = () => {
  const [prayers, setPrayers] = useState([]);
  const [newPrayer, setNewPrayer] = useState({ request: '', name: '', is_anonymous: false });

  useEffect(() => {
    axios.get('http://localhost:8000/api/prayers/')
      .then(res => setPrayers(res.data.filter(p => p.is_approved)))
      .catch(err => console.error('Error fetching prayers:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/prayers/', newPrayer);
      setNewPrayer({ request: '', name: '', is_anonymous: false });
      alert('Prayer request submitted for approval.');
    } catch (err) {
      console.error('Error submitting prayer:', err);
    }
  };

  return (
    <div className="container my-5">
      <div className="hero">
        <h1 className="display-4 fw-bold">Prayer</h1>
        <p className="lead">We lift our hearts together in intercession.</p>
      </div>
      <div className="row">
        <div className="col-md-6 mb-4">
          <h3>Submit a Prayer Request</h3>
          <form onSubmit={handleSubmit}>
            <textarea className="form-control mb-3" placeholder="Your prayer request" value={newPrayer.request} onChange={(e) => setNewPrayer({ ...newPrayer, request: e.target.value })} />
            <input type="text" className="form-control mb-3" placeholder="Your name (optional)" value={newPrayer.name} onChange={(e) => setNewPrayer({ ...newPrayer, name: e.target.value })} />
            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" checked={newPrayer.is_anonymous} onChange={(e) => setNewPrayer({ ...newPrayer, is_anonymous: e.target.checked })} />
              <label className="form-check-label">Submit anonymously</label>
            </div>
            <button type="submit" className="btn btn-outline-warning">Send Prayer</button>
          </form>
        </div>
        <div className="col-md-6">
          <h3>Parish Prayers</h3>
          {prayers.map(prayer => (
            <div className="card mb-3" key={prayer.id}>
              <div className="card-body">
                <p>{prayer.request}</p>
                <small>{prayer.is_anonymous ? 'Anonymous' : prayer.name} - {new Date(prayer.date_submitted).toLocaleDateString()}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prayer;
