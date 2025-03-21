import { getSession } from 'next-auth/react';
import { openDb } from '../../../lib/sqlite';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const db = await openDb();

  switch (req.method) {
    case 'GET':
      const prayers = await db.all('SELECT * FROM prayers ORDER BY submitted_at DESC');
      return res.status(200).json(prayers);
    case 'DELETE':
      const { id } = req.body;
      await db.run('DELETE FROM prayers WHERE id = ?', [id]);
      return res.status(200).json({ message: 'Prayer deleted' });
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
