import { getSession } from 'next-auth/react';
import { openDb } from '../../../lib/sqlite';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads/sermons',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
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

  const db = await openDb();

  if (req.method === 'GET') {
    const sermons = await db.all('SELECT * FROM sermons');
    return res.status(200).json(sermons);
  }

  if (req.method === 'POST') {
    try {
      // Ensure upload directory exists
      const uploadDir = './public/uploads/sermons';
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

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

      const fileUrl = `/uploads/sermons/${req.file.filename}`;
      await db.run('INSERT INTO sermons (title, file_url) VALUES (?, ?)', [title, fileUrl]);
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
    const sermon = await db.get('SELECT file_url FROM sermons WHERE id = ?', [id]);
    if (sermon && sermon.file_url) {
      const filePath = path.join(process.cwd(), 'public', sermon.file_url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await db.run('DELETE FROM sermons WHERE id = ?', [id]);
    return res.status(200).json({ message: 'Sermon deleted successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
