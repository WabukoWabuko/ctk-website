import { openDb } from '../lib/sqlite';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';

export async function getServerSideProps() {
  const db = await openDb();
  const hymns = await db.all('SELECT * FROM hymns');
  return {
    props: { initialHymns: hymns },
  };
}

export default function Hymns({ initialHymns }) {
  const [hymns, setHymns] = useState(initialHymns);

  const fetchHymns = async () => {
    const res = await fetch('/api/public/hymns');
    const data = await res.json();
    setHymns(data);
  };

  useEffect(() => {
    fetchHymns();
  }, []);

  return (
    <Layout title="Hymns - Christ the King Anglican">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Hymn Books</h1>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Our Hymns</h2>
        <button
          onClick={fetchHymns}
          className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
        >
          Refresh
        </button>
      </div>
      {hymns.length > 0 ? (
        <ul className="space-y-4">
          {hymns.map((hymn) => (
            <li key={hymn.id} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg">
                <strong>Title:</strong> {hymn.title}
              </p>
              <a href={hymn.file_url} className="text-blue-500 underline" target="_blank">
                View PDF
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No hymns available yet.</p>
      )}
    </Layout>
  );
}
