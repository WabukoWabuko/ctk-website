import { getSession } from 'next-auth/react';

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
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-600 text-white p-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </header>
      <main className="p-6">
        <h2 className="text-2xl font-semibold">Welcome, {session.user.email}</h2>
        <p className="mt-4">Manage rotas, hymns, sermons, and more from here.</p>
      </main>
    </div>
  );
}
