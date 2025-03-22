import { getDb } from '../lib/db';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';

export async function getServerSideProps() {
  const db = await getDb();
  const { rows: initialRotas } = await db`SELECT * FROM rotas ORDER BY date ASC`;
  return {
    props: { initialRotas },
  };
}

export default function Rotas({ initialRotas }) {
  const [rotas, setRotas] = useState(initialRotas);

  const fetchRotas = async () => {
    const res = await fetch('/api/public/rotas');
    const data = await res.json();
    setRotas(data);
  };

  useEffect(() => {
    fetchRotas();
  }, []);

  return (
    <Layout title="Service Rotas - Christ the King Anglican">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Service Rotas</h1>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Upcoming Services</h2>
        <button
          onClick={fetchRotas}
          className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
        >
          Refresh
        </button>
      </div>
      {rotas.length > 0 ? (
        <ul className="space-y-4">
          {rotas.map((rota) => (
            <li key={rota.id} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg">
                <strong>Date:</strong> {rota.date}
              </p>
              <p className="text-lg">
                <strong>Reader:</strong> {rota.reader}
              </p>
              <p className="text-lg">
                <strong>Preacher:</strong> {rota.preacher}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No rotas scheduled yet.</p>
      )}
    </Layout>
  );
}
