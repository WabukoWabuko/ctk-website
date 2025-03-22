import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getDb } from '../../../lib/db';
import bcrypt from 'bcrypt';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const db = await getDb();
          const { rows: [admin] } = await db`SELECT * FROM admins WHERE email = ${credentials.email}`;
          if (admin && (await bcrypt.compare(credentials.password, admin.password))) {
            return { id: admin.id, email: admin.email };
          }
          return null;
        } catch (error) {
          console.error('Authorize error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
      };
      return session;
    },
  },
});
