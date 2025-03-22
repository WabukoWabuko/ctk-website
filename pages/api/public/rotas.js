import { getDb } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const db = await getDb();
    const { rows: rotas } = await db`SELECT * FROM rotas ORDER BY date ASC`;
    return res.status(200).json(rotas);
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
