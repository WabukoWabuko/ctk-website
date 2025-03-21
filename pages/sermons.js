import { openDb } from '../lib/sqlite';
import Layout from '../components/Layout';

export async function getServerSideProps() {
  const db = await openDb();
  const sermons = await db.all('SELECT * FROM sermons');
  return {
    props: { sermons },
  };
}

export default function Sermons({ sermons }) {
  return (
    <Layout>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Sermons</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Sermons</h2>
      {sermons.length > 0 ? (
        <ul className="space-y-4">
          {sermons.map((sermon) => (
            <li key={sermon.id} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg"><strong>Title:</strong> {sermon.title}</p>
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
