import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Volunteer = () => {
  const [slots, setSlots] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/volunteers/')
      .then(res => setSlots(res.data))
      .catch(err => console.error('Error fetching volunteer slots:', err));
  }, []);

  const handleSignUp = async (id) => {
    if (!name) {
      alert('Please enter your name.');
      return;
    }
    try {
      await axios.patch(`http://localhost:8000/api/volunteers/${id}/`, { volunteer_name: name });
      setSlots(slots.map(slot => slot.id === id ? { ...slot, volunteer_name: name } : slot));
      setName('');
    } catch (err) {
      console.error('Error signing up:', err);
    }
  };

  return (
    <div className="container my-5">
      <div className="hero">
        <h1 className="display-4 fw-bold">Volunteer</h1>
        <p className="lead">Serve the Lord and our parish.</p>
      </div>
      <div className="row">
        <div className="col-md-12 mb-4">
          <input type="text" className="form-control mb-3" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
          <h3>Open Slots</h3>
          {slots.map(slot => (
            <div className="card mb-3" key={slot.id}>
              <div className="card-body">
                <h5>{slot.title}</h5>
                <p>{new Date(slot.date).toLocaleDateString()}</p>
                <p>{slot.volunteer_name ? `Assigned: ${slot.volunteer_name}` : 'Open'}</p>
                {!slot.volunteer_name && (
                  <button className="btn btn-outline-warning" onClick={() => handleSignUp(slot.id)}>Sign Up</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
