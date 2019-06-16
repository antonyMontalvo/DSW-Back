const multer = require('multer');

const Photo = require("../models/photo");

multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, 'public/files'),
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    }),
    dest: path.join(__dirname, 'public/files')
  }).single('file');

