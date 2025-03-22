import { getDb } from '../lib/db';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';

export async function getServerSideProps() {
  const db = await getDb();
  const { rows: initialSermons } = await db`SELECT * FROM sermons`;
  return {
    props: { initialSermons },
  };
}

export default function Sermons({ initialSermons }) {
  const [sermons, setSermons] = useState(initialSermons);

  const fetchSermons = async () => {
    const res = await fetch('/api/public/sermons');
    const data = await res.json();
    setSermons(data);
  };

  useEffect(() => {
    fetchSermons();
  }, []);

  return (
    <Layout title="Sermons - Christ the King Anglican">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Sermons</h1>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Recent Sermons</h2>
        <button
          onClick={fetchSermons}
          className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
        >
          Refresh
        </button>
      </div>
      {sermons.length > 0 ? (
        <ul className="space-y-4">
          {sermons.map((sermon) => (
            <li key={sermon.id} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg">
                <strong>Title:</strong> {sermon.title}
              </p>
              <audio controls src={sermon.file_url} className="mt-2 w-full"></audio>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No sermons available yet.</p>
      )}
    </Layout>
  );
}
