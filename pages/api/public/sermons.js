import { getDb } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const db = await getDb();
    const { rows: sermons } = await db`SELECT * FROM sermons`;
    return res.status(200).json(sermons);
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
