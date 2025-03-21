import { getSession } from 'next-auth/react';
import { useState } from 'react';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default function AdminDashboard({ session }) {
  const [activeTab, setActiveTab] = useState('rotas');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-600 text-white p-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2">Welcome, {session.user.email}</p>
      </header>
      <main className="p-6">
        <nav className="mb-6">
          <button
            onClick={() => setActiveTab('rotas')}
            className={`mr-4 p-2 ${activeTab === 'rotas' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          >
            Rotas
          </button>
          <button
            onClick={() => setActiveTab('hymns')}
            className={`mr-4 p-2 ${activeTab === 'hymns' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          >
            Hymns
          </button>
          <button
            onClick={() => setActiveTab('sermons')}
            className={`mr-4 p-2 ${activeTab === 'sermons' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          >
            Sermons
          </button>
          <button
            onClick={() => setActiveTab('prayers')}
            className={`p-2 ${activeTab === 'prayers' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          >
            Prayers
          </button>
        </nav>

        {activeTab === 'rotas' && <RotasTab />}
        {activeTab === 'hymns' && <HymnsTab />}
        {activeTab === 'sermons' && <SermonsTab />}
        {activeTab === 'prayers' && <PrayersTab />}
      </main>
    </div>
  );
}

function RotasTab() {
  const [date, setDate] = useState('');
  const [reader, setReader] = useState('');
  const [preacher, setPreacher] = useState('');
  const [rotas, setRotas] = useState([]);

  const fetchRotas = async () => {
    const res = await fetch('/api/admin/rotas');
    const data = await res.json();
    setRotas(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/admin/rotas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, reader, preacher }),
    });
    fetchRotas();
    setDate(''); setReader(''); setPreacher('');
  };

  const handleDelete = async (id) => {
    await fetch('/api/admin/rotas', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchRotas();
  };

  useState(() => { fetchRotas(); }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Rotas</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded mr-2"
          required
        />
        <input
          type="text"
          value={reader}
          onChange={(e) => setReader(e.target.value)}
          placeholder="Reader"
          className="p-2 border rounded mr-2"
          required
        />
        <input
          type="text"
          value={preacher}
          onChange={(e) => setPreacher(e.target.value)}
          placeholder="Preacher"
          className="p-2 border rounded mr-2"
          required
        />
        <button type="submit" className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700">
          Add Rota
        </button>
      </form>
      <ul className="space-y-4">
        {rotas.map((rota) => (
          <li key={rota.id} className="border p-4 rounded flex justify-between">
            <span>{rota.date} - {rota.reader} - {rota.preacher}</span>
            <button
              onClick={() => handleDelete(rota.id)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HymnsTab() {
  const [title, setTitle] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [hymns, setHymns] = useState([]);

  const fetchHymns = async () => {
    const res = await fetch('/api/admin/hymns');
    const data = await res.json();
    setHymns(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/admin/hymns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, file_url: fileUrl }),
    });
    fetchHymns();
    setTitle(''); setFileUrl('');
  };

  const handleDelete = async (id) => {
    await fetch('/api/admin/hymns', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchHymns();
  };

  useState(() => { fetchHymns(); }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Hymns</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Hymn Title"
          className="p-2 border rounded mr-2"
          required
        />
        <input
          type="text"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          placeholder="File URL"
          className="p-2 border rounded mr-2"
          required
        />
        <button type="submit" className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700">
          Add Hymn
        </button>
      </form>
      <ul className="space-y-4">
        {hymns.map((hymn) => (
          <li key={hymn.id} className="border p-4 rounded flex justify-between">
            <span>{hymn.title} - <a href={hymn.file_url} className="text-blue-500">Link</a></span>
            <button
              onClick={() => handleDelete(hymn.id)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SermonsTab() {
  const [title, setTitle] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [sermons, setSermons] = useState([]);

  const fetchSermons = async () => {
    const res = await fetch('/api/admin/sermons');
    const data = await res.json();
    setSermons(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/admin/sermons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, file_url: fileUrl }),
    });
    fetchSermons();
    setTitle(''); setFileUrl('');
  };

  const handleDelete = async (id) => {
    await fetch('/api/admin/sermons', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchSermons();
  };

  useState(() => { fetchSermons(); }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Sermons</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sermon Title"
          className="p-2 border rounded mr-2"
          required
        />
        <input
          type="text"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          placeholder="File URL"
          className="p-2 border rounded mr-2"
          required
        />
        <button type="submit" className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700">
          Add Sermon
        </button>
      </form>
      <ul className="space-y-4">
        {sermons.map((sermon) => (
          <li key={sermon.id} className="border p-4 rounded flex justify-between">
            <span>{sermon.title} - <a href={sermon.file_url} className="text-blue-500">Link</a></span>
            <button
              onClick={() => handleDelete(sermon.id)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PrayersTab() {
  const [prayers, setPrayers] = useState([]);

  const fetchPrayers = async () => {
    const res = await fetch('/api/admin/prayers');
    const data = await res.json();
    setPrayers(data);
  };

  const handleDelete = async (id) => {
    await fetch('/api/admin/prayers', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchPrayers();
  };

  useState(() => { fetchPrayers(); }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Prayer Requests</h2>
      <ul className="space-y-4">
        {prayers.map((prayer) => (
          <li key={prayer.id} className="border p-4 rounded flex justify-between">
            <span>{prayer.request} - {prayer.submitted_at}</span>
            <button
              onClick={() => handleDelete(prayer.id)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
