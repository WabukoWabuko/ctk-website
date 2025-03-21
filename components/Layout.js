import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
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
            <Link href="/rotas" className="hover:text-yellow-300">Rotas</Link>
            <Link href="/hymns" className="hover:text-yellow-300">Hymns</Link>
            <Link href="/sermons" className="hover:text-yellow-300">Sermons</Link>
            <Link href="/prayer" className="hover:text-yellow-300">Prayer</Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© 2025 Christ the King Anglican. All rights reserved.</p>
      </footer>
    </div>
  );
}
