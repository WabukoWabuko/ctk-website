import Layout from '../components/Layout';
import { useState } from 'react';
import { getDb } from '../lib/db';

export async function getServerSideProps() {
  const db = await getDb();
  const { rows: prayers } = await db`SELECT * FROM prayers ORDER BY submitted_at DESC LIMIT 5`;
  return {
    props: { initialPrayers: prayers },
  };
}

export default function Prayer({ initialPrayers }) {
  const [request, setRequest] = useState('');
  const [message, setMessage] = useState('');
  const [prayers, setPrayers] = useState(initialPrayers);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!request) {
      setMessage('Please enter a prayer request.');
      return;
    }

    try {
      const res = await fetch('/api/prayer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request }),
      });
      const data = await res.json();
      setMessage(data.message);
      setRequest('');

      const db = await getDb();
      const { rows: updatedPrayers } = await db`SELECT * FROM prayers ORDER BY submitted_at DESC LIMIT 5`;
      setPrayers(updatedPrayers);
    } catch (error) {
      setMessage('Error submitting your prayer request. Please try again.');
    }
  };

  return (
    <Layout title="Prayer Requests - Christ the King Anglican">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Prayer Requests</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Submit a Prayer Request</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          rows="4"
          placeholder="Enter your prayer request here..."
          required
        />
        <button type="submit" className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition mt-4">
          Submit Prayer Request
        </button>
      </form>
      {message && <p className="text-green-500 mb-6">{message}</p>}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Prayer Requests</h2>
      {prayers.length > 0 ? (
        <ul className="space-y-4">
          {prayers.map((prayer) => (
            <li key={prayer.id} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg">{prayer.request}</p>
              <p className="text-sm text-gray-500 mt-2">Submitted on: {prayer.submitted_at}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No prayer requests submitted yet.</p>
      )}
    </Layout>
  );
}
