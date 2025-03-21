import { openDb } from '../lib/sqlite';

export async function getServerSideProps() {
  const db = await openDb();
  const rotas = await db.all('SELECT * FROM rotas ORDER BY date ASC');
  return {
    props: { rotas },
  };
}

export default function Rotas({ rotas }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-600 text-white p-4">
        <h1 className="text-3xl font-bold">Service Rotas</h1>
      </header>
      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Services</h2>
        {rotas.length > 0 ? (
          <ul className="space-y-4">
            {rotas.map((rota) => (
              <li key={rota.id} className="border p-4 rounded">
                <p><strong>Date:</strong> {rota.date}</p>
                <p><strong>Reader:</strong> {rota.reader}</p>
                <p><strong>Preacher:</strong> {rota.preacher}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No rotas scheduled yet.</p>
        )}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2025 Christ the King Anglican. All rights reserved.</p>
      </footer>
    </div>
  );
}
