import { useState } from 'react';
import Layout from '../components/Layout';

export default function Prayer() {
  const [request, setRequest] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/prayers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ request }),
    });
    const data = await res.json();
    setMessage(data.message);
    setRequest('');
  };

  return (
    <Layout>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Prayer Requests</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Submit a Prayer Request</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          placeholder="Your prayer request"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
          rows="4"
          required
        />
        <button type="submit" className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition">
          Submit
        </button>
      </form>
      {message && <p className="text-green-500">{message}</p>}
    </Layout>
  );
}
