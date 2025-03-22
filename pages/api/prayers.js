import { getDb } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { request } = req.body;
    if (!request) {
      return res.status(400).json({ error: 'Prayer request is required' });
    }

    const db = await getDb();
    await db`
      INSERT INTO prayers (request, submitted_at)
      VALUES (${request}, ${new Date().toISOString()})
    `;

    return res.status(200).json({ message: 'Prayer request submitted successfully!' });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
