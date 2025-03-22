import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

export default function Layout({ children, title = 'Christ the King Anglican' }) {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Christ the King Anglican - A place of worship, community, and faith." />
        <meta name="keywords" content="church, Anglican, worship, community, faith, Christ the King" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-purple-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">✝️</span>
            <Link href="/" className="text-2xl font-bold hover:text-yellow-300">
              Christ the King Anglican
            </Link>
          </div>
          <nav className="space-x-4">
            <Link href="/" className="hover:text-yellow-300">Home</Link>
            <Link href="/about" className="hover:text-yellow-300">About</Link>
            <Link href="/rotas" className="hover:text-yellow-300">Rotas</Link>
            <Link href="/hymns" className="hover:text-yellow-300">Hymns</Link>
            <Link href="/sermons" className="hover:text-yellow-300">Sermons</Link>
            <Link href="/prayer" className="hover:text-yellow-300">Prayer</Link>
            <Link href="/give" className="hover:text-yellow-300">Give</Link>
            <Link href="/contact" className="hover:text-yellow-300">Contact</Link>
            {session ? (
              <Link href="/admin" className="hover:text-yellow-300">Admin</Link>
            ) : (
              <Link href="/admin/login" className="hover:text-yellow-300">Admin</Link>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© 2025 Christ the King Anglican. All rights reserved.</p>
      </footer>
    </div>
  );
}
