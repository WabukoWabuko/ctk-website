import { getSession } from 'next-auth/react';
import { getDb } from '../../../lib/db';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const db = await getDb();

  if (req.method === 'GET') {
    const { rows: prayers } = await db`SELECT * FROM prayers ORDER BY submitted_at DESC`;
    return res.status(200).json(prayers);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Missing ID' });
    }
    await db`DELETE FROM prayers WHERE id = ${id}`;
    return res.status(200).json({ message: 'Prayer deleted successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
