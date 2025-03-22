import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Directory = () => {
  const [entries, setEntries] = useState([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
      axios.get('http://localhost:8000/api/directory/', config)
        .then(res => setEntries(res.data.filter(e => e.is_public)))
        .catch(err => console.error('Error fetching directory:', err));
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'ctk2025') { // Simple static password for demo
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container my-5">
        <div className="hero">
          <h1 className="display-4 fw-bold">Parish Directory</h1>
          <p className="lead">Enter password to view.</p>
        </div>
        <form onSubmit={handleLogin}>
          <input type="password" className="form-control mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="btn btn-outline-warning">Enter</button>
        </form>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="hero">
        <h1 className="display-4 fw-bold">Parish Directory</h1>
        <p className="lead">Connect with our community.</p>
      </div>
      <div className="row">
        {entries.map(entry => (
          <div className="col-md-4 mb-4" key={entry.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{entry.name}</h5>
                {entry.email && <p>Email: {entry.email}</p>}
                {entry.phone && <p>Phone: {entry.phone}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Directory;
