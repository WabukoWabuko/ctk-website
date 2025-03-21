import { openDb } from '../../lib/sqlite';

export default async function handler(req, res) {
  try {
    const db = await openDb();
    const rotas = await db.all('SELECT * FROM rotas');
    res.status(200).json({ message: 'SQLite connected!', rotas });
  } catch (error) {
    res.status(500).json({ error: 'Connection failed', details: error.message });
  }
}
