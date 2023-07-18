import multer from 'multer';
import fs from 'fs';

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const dir = `app/uploads/${req.user.pseudo}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // 'recursive: true' creates parent directories if they do not exist
    }
    callback(null, dir);
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    callback(null, name);
  },
});

const fileFilter = (req, file, callback) => {
  if (MIME_TYPES[file.mimetype]) {
    // Accept the file
    callback(null, true);
  } else {
    // Reject the file
    callback(new Error('Invalid file type'), false);
  }
};
export const setMulterConfig = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fieldSize: 1024 * 512,
    fieldNameSize: 200,
  },
}).single('upload');
