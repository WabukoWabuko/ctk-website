import { getSession } from 'next-auth/react';
import { getDb } from '../../../lib/db';
import multer from 'multer';
import { put } from '@vercel/blob';

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const db = await getDb();

  if (req.method === 'GET') {
    const { rows: hymns } = await db`SELECT * FROM hymns`;
    return res.status(200).json(hymns);
  }

  if (req.method === 'POST') {
    try {
      await new Promise((resolve, reject) => {
        upload.single('file')(req, res, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });

      const { title } = req.body;
      if (!title || !req.file) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const blob = await put(`hymns/${Date.now()}-${req.file.originalname}`, req.file.buffer, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      await db`INSERT INTO hymns (title, file_url) VALUES (${title}, ${blob.url})`;
      return res.status(200).json({ message: 'Hymn added successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Error uploading hymn: ' + error.message });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Missing ID' });
    }
    const { rows: [hymn] } = await db`SELECT file_url FROM hymns WHERE id = ${id}`;
    if (hymn && hymn.file_url) {
      // Optionally delete from Blob storage if needed
    }
    await db`DELETE FROM hymns WHERE id = ${id}`;
    return res.status(200).json({ message: 'Hymn deleted successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
