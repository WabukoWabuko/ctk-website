import { openDb } from '../../../lib/sqlite';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const db = await openDb();
    const hymns = await db.all('SELECT * FROM hymns');
    return res.status(200).json(hymns);
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
