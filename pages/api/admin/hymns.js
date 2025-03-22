import { getSession } from 'next-auth/react';
import { openDb } from '../../../lib/sqlite';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads/hymns',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
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

  const db = await openDb();

  if (req.method === 'GET') {
    const hymns = await db.all('SELECT * FROM hymns');
    return res.status(200).json(hymns);
  }

  if (req.method === 'POST') {
    try {
      // Ensure upload directory exists
      const uploadDir = './public/uploads/hymns';
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

      const fileUrl = `/uploads/hymns/${req.file.filename}`;
      await db.run('INSERT INTO hymns (title, file_url) VALUES (?, ?)', [title, fileUrl]);
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
    const hymn = await db.get('SELECT file_url FROM hymns WHERE id = ?', [id]);
    if (hymn && hymn.file_url) {
      const filePath = path.join(process.cwd(), 'public', hymn.file_url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await db.run('DELETE FROM hymns WHERE id = ?', [id]);
    return res.status(200).json({ message: 'Hymn deleted successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
