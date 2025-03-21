import { getSession } from 'next-auth/react';
import { openDb } from '../../../lib/sqlite';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const db = await openDb();

  switch (req.method) {
    case 'GET':
      const rotas = await db.all('SELECT * FROM rotas');
      return res.status(200).json(rotas);
    case 'POST':
      const { date, reader, preacher } = req.body;
      await db.run('INSERT INTO rotas (date, reader, preacher) VALUES (?, ?, ?)', [date, reader, preacher]);
      return res.status(201).json({ message: 'Rota added' });
    case 'DELETE':
      const { id } = req.body;
      await db.run('DELETE FROM rotas WHERE id = ?', [id]);
      return res.status(200).json({ message: 'Rota deleted' });
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
