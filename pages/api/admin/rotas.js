import { getSession } from 'next-auth/react';
import { getDb } from '../../../lib/db';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const db = await getDb();

  if (req.method === 'GET') {
    const { rows: rotas } = await db`SELECT * FROM rotas ORDER BY date ASC`;
    return res.status(200).json(rotas);
  }

  if (req.method === 'POST') {
    const { date, reader, preacher } = req.body;
    if (!date || !reader || !preacher) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    await db`INSERT INTO rotas (date, reader, preacher) VALUES (${date}, ${reader}, ${preacher})`;
    return res.status(200).json({ message: 'Rota added successfully' });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Missing ID' });
    }
    await db`DELETE FROM rotas WHERE id = ${id}`;
    return res.status(200).json({ message: 'Rota deleted successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
