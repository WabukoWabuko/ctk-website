import { getSession } from 'next-auth/react';
import { openDb } from '../../../lib/sqlite';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const db = await openDb();

  if (req.method === 'GET') {
    const contacts = await db.all('SELECT * FROM contacts ORDER BY submitted_at DESC');
    return res.status(200).json(contacts);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Missing ID' });
    }
    await db.run('DELETE FROM contacts WHERE id = ?', [id]);
    return res.status(200).json({ message: 'Contact deleted successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
