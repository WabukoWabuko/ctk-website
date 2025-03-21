import { openDb } from '../../lib/sqlite';

export default async function handler(req, res) {
  const db = await openDb();

  if (req.method === 'POST') {
    const { request } = req.body;
    await db.run('INSERT INTO prayers (request) VALUES (?)', [request]);
    return res.status(201).json({ message: 'Prayer request submitted' });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
