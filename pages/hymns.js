import { openDb } from '../lib/sqlite';

export async function getServerSideProps() {
  const db = await openDb();
  const hymns = await db.all('SELECT * FROM hymns');
  return {
    props: { hymns },
  };
}

export default function Hymns({ hymns }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-600 text-white p-4">
        <h1 className="text-3xl font-bold">Hymn Books</h1>
      </header>
      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Our Hymns</h2>
        {hymns.length > 0 ? (
          <ul className="space-y-4">
            {hymns.map((hymn) => (
              <li key={hymn.id} className="border p-4 rounded">
                <p><strong>Title:</strong> {hymn.title}</p>
                <a href={hymn.file_url} className="text-blue-500 underline" target="_blank">View PDF</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hymns available yet.</p>
        )}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2025 Christ the King Anglican. All rights reserved.</p>
      </footer>
    </div>
  );
}
