import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { openDb } from '../../../lib/sqlite';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const db = await openDb();
        const admin = await db.get('SELECT * FROM admins WHERE email = ?', [credentials.email]);
        if (admin && admin.password === credentials.password) { // Plaintext for now, hash later
          return { id: admin.id, email: admin.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
});
