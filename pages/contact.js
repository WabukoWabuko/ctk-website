import Layout from '../components/Layout';
import { useState } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      setResponse(data.message);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setResponse('Error submitting your message. Please try again.');
    }
  };

  return (
    <Layout title="Contact Us - Christ the King Anglican">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Get in Touch</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            rows="4"
            required
          />
        </div>
        <button type="submit" className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition">
          Send Message
        </button>
      </form>
      {response && <p className="text-green-500">{response}</p>}
    </Layout>
  );
}
