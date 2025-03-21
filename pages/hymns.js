import { openDb } from '../lib/sqlite';
import Layout from '../components/Layout';

export async function getServerSideProps() {
  const db = await openDb();
  const hymns = await db.all('SELECT * FROM hymns');
  return {
    props: { hymns },
  };
}

export default function Hymns({ hymns }) {
  return (
    <Layout>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Hymn Books</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Hymns</h2>
      {hymns.length > 0 ? (
        <ul className="space-y-4">
          {hymns.map((hymn) => (
            <li key={hymn.id} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg"><strong>Title:</strong> {hymn.title}</p>
              <a href={hymn.file_url} className="text-blue-500 underline" target="_blank">View PDF</a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No hymns available yet.</p>
      )}
    </Layout>
  );
}
