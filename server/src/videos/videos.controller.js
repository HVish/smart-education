const multer = require('multer');
const path = require('node:path');
const { Router } = require('express');
const { StatusCodes } = require('http-status-codes');

const videoRoutes = Router();

// Set up storage for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve(__dirname, '..', '..', 'public', 'uploads');
    console.log('upload path:', uploadPath);
    cb(null, uploadPath); // Destination folder for storing uploaded videos
  },
  filename: function (req, file, cb) {
    // Rename the file to avoid naming conflicts (you can customize this logic)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Define a route to handle video uploads
videoRoutes.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  const videoUrl = `/api/uploads/${req.file.filename}`;
  res.status(StatusCodes.CREATED).json({ success: true, videoUrl });
});

module.exports = { videoRoutes };
