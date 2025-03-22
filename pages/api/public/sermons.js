import { openDb } from '../../../lib/sqlite';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const db = await openDb();
    const sermons = await db.all('SELECT * FROM sermons');
    return res.status(200).json(sermons);
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
