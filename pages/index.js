import { openDb } from '../lib/sqlite';
import Layout from '../components/Layout';

export async function getServerSideProps() {
  const db = await openDb();
  const rotas = await db.all('SELECT * FROM rotas LIMIT 1');
  return {
    props: { rotas },
  };
}

export default function Home({ rotas }) {
  return (
    <Layout>
      <section className="relative bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20 text-center rounded-lg shadow-lg">
        <div className="absolute inset-0 opacity-10 bg-[url('/church-bg.jpg')] bg-cover bg-center" />
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">Welcome to Christ the King Anglican</h1>
          <p className="text-xl mb-6">A place of worship, community, and faith.</p>
          <a
            href="/rotas"
            className="inline-block bg-yellow-400 text-purple-800 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-500 transition"
          >
            Join Us This Sunday
          </a>
        </div>
      </section>
      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Next Service</h2>
        {rotas.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg">
              <strong>{rotas[0].date}</strong> - Reader: {rotas[0].reader}, Preacher: {rotas[0].preacher}
            </p>
          </div>
        ) : (
          <p className="text-gray-600">No upcoming services yet.</p>
        )}
      </section>
    </Layout>
  );
}
