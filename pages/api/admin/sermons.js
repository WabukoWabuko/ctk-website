import { getSession } from 'next-auth/react';
import { getDb } from '../../../lib/db';
import multer from 'multer';
import { put } from '@vercel/blob';

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed'), false);
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
    const { rows: sermons } = await db`SELECT * FROM sermons`;
    return res.status(200).json(sermons);
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

      const blob = await put(`sermons/${Date.now()}-${req.file.originalname}`, req.file.buffer, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      await db`INSERT INTO sermons (title, file_url) VALUES (${title}, ${blob.url})`;
      return res.status(200).json({ message: 'Sermon added successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Error uploading sermon: ' + error.message });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Missing ID' });
    }
    const { rows: [sermon] } = await db`SELECT file_url FROM sermons WHERE id = ${id}`;
    if (sermon && sermon.file_url) {
      // Optionally delete from Blob storage if needed
    }
    await db`DELETE FROM sermons WHERE id = ${id}`;
    return res.status(200).json({ message: 'Sermon deleted successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
