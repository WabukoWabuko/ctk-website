import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { initDb } from './lib/db';

async function seed() {
  await initDb();

  const password = 'password123';
  const hashedPassword = await bcrypt.hash(password, 10);

  await sql`
    INSERT INTO admins (email, password)
    VALUES ('admin@ctk.org', ${hashedPassword})
    ON CONFLICT (email) DO NOTHING;
  `;

  console.log('Admin user seeded successfully');
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
