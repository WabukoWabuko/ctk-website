import React, { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/feedback/', form);
      setForm({ name: '', email: '', message: '' });
      alert('Thank you for your feedback!');
    } catch (err) {
      console.error('Error submitting feedback:', err);
    }
  };

  return (
    <div className="container my-5">
      <div className="hero">
        <h1 className="display-4 fw-bold">Feedback</h1>
        <p className="lead">Share your thoughts with us.</p>
      </div>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <form onSubmit={handleSubmit}>
            <input type="text" className="form-control mb-3" placeholder="Name (optional)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input type="email" className="form-control mb-3" placeholder="Email (optional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <textarea className="form-control mb-3" placeholder="Your message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <button type="submit" className="btn btn-outline-warning w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
