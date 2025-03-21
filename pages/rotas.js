import { openDb } from '../lib/sqlite';
import Layout from '../components/Layout';

export async function getServerSideProps() {
  const db = await openDb();
  const rotas = await db.all('SELECT * FROM rotas ORDER BY date ASC');
  return {
    props: { rotas },
  };
}

export default function Rotas({ rotas }) {
  return (
    <Layout>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Service Rotas</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upcoming Services</h2>
      {rotas.length > 0 ? (
        <ul className="space-y-4">
          {rotas.map((rota) => (
            <li key={rota.id} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg"><strong>Date:</strong> {rota.date}</p>
              <p className="text-lg"><strong>Reader:</strong> {rota.reader}</p>
              <p className="text-lg"><strong>Preacher:</strong> {rota.preacher}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No rotas scheduled yet.</p>
      )}
    </Layout>
  );
}
