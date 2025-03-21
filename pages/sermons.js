import { openDb } from '../lib/sqlite';

export async function getServerSideProps() {
  const db = await openDb();
  const sermons = await db.all('SELECT * FROM sermons');
  return {
    props: { sermons },
  };
}

export default function Sermons({ sermons }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-600 text-white p-4">
        <h1 className="text-3xl font-bold">Sermons</h1>
      </header>
      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Sermons</h2>
        {sermons.length > 0 ? (
          <ul className="space-y-4">
            {sermons.map((sermon) => (
              <li key={sermon.id} className="border p-4 rounded">
                <p><strong>Title:</strong> {sermon.title}</p>
                <audio controls src={sermon.file_url} className="mt-2"></audio>
              </li>
            ))}
          </ul>
        ) : (
          <p>No sermons available yet.</p>
        )}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2025 Christ the King Anglican. All rights reserved.</p>
      </footer>
    </div>
  );
}
