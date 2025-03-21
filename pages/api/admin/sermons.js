import { getSession } from 'next-auth/react';
import { openDb } from '../../../lib/sqlite';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const db = await openDb();

  switch (req.method) {
    case 'GET':
      const sermons = await db.all('SELECT * FROM sermons');
      return res.status(200).json(sermons);
    case 'POST':
      const { title, file_url } = req.body;
      await db.run('INSERT INTO sermons (title, file_url) VALUES (?, ?)', [title, file_url]);
      return res.status(201).json({ message: 'Sermon added' });
    case 'DELETE':
      const { id } = req.body;
      await db.run('DELETE FROM sermons WHERE id = ?', [id]);
      return res.status(200).json({ message: 'Sermon deleted' });
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
