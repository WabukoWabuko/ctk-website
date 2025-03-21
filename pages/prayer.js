import { useState } from 'react';

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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-600 text-white p-4">
        <h1 className="text-3xl font-bold">Prayer Requests</h1>
      </header>
      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Submit a Prayer Request</h2>
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            placeholder="Your prayer request"
            className="w-full p-2 border rounded mb-4"
            rows="4"
            required
          />
          <button type="submit" className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700">
            Submit
          </button>
        </form>
        {message && <p className="text-green-500">{message}</p>}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2025 Christ the King Anglican. All rights reserved.</p>
      </footer>
    </div>
  );
}
