import { getSession, signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

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

export default function AdminDashboard({ session: serverSession }) {
  const { data: clientSession, status } = useSession();
  const [activeTab, setActiveTab] = useState('rotas');
  const [message, setMessage] = useState({ text: '', type: '' }); // For success/error messages

  const session = clientSession || serverSession;

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const clearMessage = () => {
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-600 text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="mt-2">
              Welcome, {session?.user?.email || 'Admin'}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="p-6">
        {message.text && (
          <div
            className={`mb-4 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}
        <nav className="mb-6">
          <button
            onClick={() => setActiveTab('rotas')}
            className={`mr-4 p-2 ${activeTab === 'rotas' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
            aria-label="Manage Rotas"
          >
            Rotas
          </button>
          <button
            onClick={() => setActiveTab('hymns')}
            className={`mr-4 p-2 ${activeTab === 'hymns' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
            aria-label="Manage Hymns"
          >
            Hymns
          </button>
          <button
            onClick={() => setActiveTab('sermons')}
            className={`mr-4 p-2 ${activeTab === 'sermons' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
            aria-label="Manage Sermons"
          >
            Sermons
          </button>
          <button
            onClick={() => setActiveTab('prayers')}
            className={`p-2 ${activeTab === 'prayers' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
            aria-label="Manage Prayers"
          >
            Prayers
          </button>
          <button
              onClick={() => setActiveTab('contacts')}
              className={`p-2 ${activeTab === 'contacts' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
              aria-label="Manage Contacts"
            >
              Contacts
            </button>
        </nav>

        {activeTab === 'rotas' && <RotasTab setMessage={setMessage} clearMessage={clearMessage} />}
        {activeTab === 'hymns' && <HymnsTab setMessage={setMessage} clearMessage={clearMessage} />}
        {activeTab === 'sermons' && <SermonsTab setMessage={setMessage} clearMessage={clearMessage} />}
        {activeTab === 'prayers' && <PrayersTab setMessage={setMessage} clearMessage={clearMessage} />}
        {activeTab === 'contacts' && <ContactsTab setMessage={setMessage} clearMessage={clearMessage} />}
      </main>
    </div>
  );
}

function RotasTab({ setMessage, clearMessage }) {
  const [date, setDate] = useState('');
  const [reader, setReader] = useState('');
  const [preacher, setPreacher] = useState('');
  const [rotas, setRotas] = useState([]);

  const fetchRotas = async () => {
    try {
      const res = await fetch('/api/admin/rotas');
      if (!res.ok) throw new Error('Failed to fetch rotas');
      const data = await res.json();
      setRotas(data);
    } catch (error) {
      setMessage({ text: 'Error fetching rotas: ' + error.message, type: 'error' });
      clearMessage();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/rotas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, reader, preacher }),
      });
      if (!res.ok) throw new Error('Failed to add rota');
      setMessage({ text: 'Rota added successfully!', type: 'success' });
      fetchRotas();
      setDate('');
      setReader('');
      setPreacher('');
      clearMessage();
    } catch (error) {
      setMessage({ text: 'Error adding rota: ' + error.message, type: 'error' });
      clearMessage();
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch('/api/admin/rotas', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Failed to delete rota');
      setMessage({ text: 'Rota deleted successfully!', type: 'success' });
      fetchRotas();
      clearMessage();
    } catch (error) {
      setMessage({ text: 'Error deleting rota: ' + error.message, type: 'error' });
      clearMessage();
    }
  };

  useEffect(() => {
    fetchRotas();
  }, []);

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
            <span>
              {rota.date} - {rota.reader} - {rota.preacher}
            </span>
            <button
              onClick={() => handleDelete(rota.id)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              aria-label={`Delete rota for ${rota.date}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HymnsTab({ setMessage, clearMessage }) {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [hymns, setHymns] = useState([]);

  const fetchHymns = async () => {
    try {
      const res = await fetch('/api/admin/hymns');
      if (!res.ok) throw new Error('Failed to fetch hymns');
      const data = await res.json();
      setHymns(data);
    } catch (error) {
      setMessage({ text: 'Error fetching hymns: ' + error.message, type: 'error' });
      clearMessage();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage({ text: 'Please select a file to upload', type: 'error' });
      clearMessage();
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/hymns', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to add hymn');
      setMessage({ text: 'Hymn added successfully!', type: 'success' });
      fetchHymns();
      setTitle('');
      setFile(null);
      clearMessage();
    } catch (error) {
      setMessage({ text: 'Error adding hymn: ' + error.message, type: 'error' });
      clearMessage();
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch('/api/admin/hymns', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Failed to delete hymn');
      setMessage({ text: 'Hymn deleted successfully!', type: 'success' });
      fetchHymns();
      clearMessage();
    } catch (error) {
      setMessage({ text: 'Error deleting hymn: ' + error.message, type: 'error' });
      clearMessage();
    }
  };

  useEffect(() => {
    fetchHymns();
  }, []);

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
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="p-2 border rounded mr-2"
          accept="application/pdf"
          required
        />
        <button type="submit" className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700">
          Add Hymn
        </button>
      </form>
      <ul className="space-y-4">
        {hymns.map((hymn) => (
          <li key={hymn.id} className="border p-4 rounded flex justify-between">
            <span>
              {hymn.title} - <a href={hymn.file_url} className="text-blue-500">Link</a>
            </span>
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

function SermonsTab({ setMessage, clearMessage }) {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [sermons, setSermons] = useState([]);

  const fetchSermons = async () => {
    try {
      const res = await fetch('/api/admin/sermons');
      if (!res.ok) throw new Error('Failed to fetch sermons');
      const data = await res.json();
      setSermons(data);
    } catch (error) {
      setMessage({ text: 'Error fetching sermons: ' + error.message, type: 'error' });
      clearMessage();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage({ text: 'Please select a file to upload', type: 'error' });
      clearMessage();
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/sermons', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to add sermon');
      setMessage({ text: 'Sermon added successfully!', type: 'success' });
      fetchSermons();
      setTitle('');
      setFile(null);
      clearMessage();
    } catch (error) {
      setMessage({ text: 'Error adding sermon: ' + error.message, type: 'error' });
      clearMessage();
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch('/api/admin/sermons', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Failed to delete sermon');
      setMessage({ text: 'Sermon deleted successfully!', type: 'success' });
      fetchSermons();
      clearMessage();
    } catch (error) {
      setMessage({ text: 'Error deleting sermon: ' + error.message, type: 'error' });
      clearMessage();
    }
  };

  useEffect(() => {
    fetchSermons();
  }, []);

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
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="p-2 border rounded mr-2"
          accept="audio/*"
          required
        />
        <button type="submit" className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700">
          Add Sermon
        </button>
      </form>
      <ul className="space-y-4">
        {sermons.map((sermon) => (
          <li key={sermon.id} className="border p-4 rounded flex justify-between">
            <span>
              {sermon.title} - <a href={sermon.file_url} className="text-blue-500">Link</a>
            </span>
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

function PrayersTab({ setMessage, clearMessage }) {
  const [prayers, setPrayers] = useState([]);

  const fetchPrayers = async () => {
    try {
      const res = await fetch('/api/admin/prayers');
      if (!res.ok) throw new Error('Failed to fetch prayers');
      const data = await res.json();
      setPrayers(data);
    } catch (error) {
      setMessage({ text: 'Error fetching prayers: ' + error.message, type: 'error' });
      clearMessage();
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch('/api/admin/prayers', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Failed to delete prayer');
      setMessage({ text: 'Prayer deleted successfully!', type: 'success' });
      fetchPrayers();
      clearMessage();
    } catch (error) {
      setMessage({ text: 'Error deleting prayer: ' + error.message, type: 'error' });
      clearMessage();
    }
  };

  useEffect(() => {
    fetchPrayers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Prayer Requests</h2>
      <ul className="space-y-4">
        {prayers.map((prayer) => (
          <li key={prayer.id} className="border p-4 rounded flex justify-between">
            <span>
              {prayer.request} - {prayer.submitted_at}
            </span>
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

function ContactsTab({ setMessage, clearMessage }) {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/admin/contacts');
      if (!res.ok) throw new Error('Failed to fetch contacts');
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      setMessage({ text: 'Error fetching contacts: ' + error.message, type: 'error' });
      clearMessage();
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch('/api/admin/contacts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Failed to delete contact');
      setMessage({ text: 'Contact deleted successfully!', type: 'success' });
      fetchContacts();
      clearMessage();
    } catch (error) {
      setMessage({ text: 'Error deleting contact: ' + error.message, type: 'error' });
      clearMessage();
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Contact Messages</h2>
      <ul className="space-y-4">
        {contacts.map((contact) => (
          <li key={contact.id} className="border p-4 rounded flex justify-between">
            <div>
              <p>
                <strong>Name:</strong> {contact.name}
              </p>
              <p>
                <strong>Email:</strong> {contact.email}
              </p>
              <p>
                <strong>Message:</strong> {contact.message}
              </p>
              <p>
                <strong>Submitted:</strong> {contact.submitted_at}
              </p>
            </div>
            <button
              onClick={() => handleDelete(contact.id)}
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
