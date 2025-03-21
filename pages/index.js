import { openDb } from '../lib/sqlite';

export async function getServerSideProps() {
  const db = await openDb();
  const rotas = await db.all('SELECT * FROM rotas LIMIT 1');
  return {
    props: { rotas },
  };
}

export default function Home({ rotas }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-600 text-white p-4">
        <h1 className="text-3xl font-bold">Welcome to Christ the King Anglican</h1>
        <p className="mt-2">A place of worship, community, and faith.</p>
      </header>
      <main className="p-6">
        <section>
          <h2 className="text-2xl font-semibold">Next Service</h2>
          {rotas.length > 0 ? (
            <p>
              {rotas[0].date} - Reader: {rotas[0].reader}, Preacher: {rotas[0].preacher}
            </p>
          ) : (
            <p>No upcoming services yet.</p>
          )}
        </section>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2025 Christ the King Anglican. All rights reserved.</p>
      </footer>
    </div>
  );
}
