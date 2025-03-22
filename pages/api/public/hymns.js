import { getDb } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const db = await getDb();
    const { rows: hymns } = await db`SELECT * FROM hymns`;
    return res.status(200).json(hymns);
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
