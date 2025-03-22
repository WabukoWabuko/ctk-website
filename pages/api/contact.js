import { openDb } from '../../lib/sqlite';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = await openDb();
    await db.run(
      'INSERT INTO contacts (name, email, message, submitted_at) VALUES (?, ?, ?, ?)',
      [name, email, message, new Date().toISOString()]
    );

    return res.status(200).json({ message: 'Message submitted successfully!' });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
