const multer = require('multer');
const path = require('path');

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../react/src/assets/ProfilPic'));
  },
  filename: function (req, file, cb) {
    // Menyimpan nama file yang diunggah ke dalam req.body.filename
    req.body.filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, req.body.filename);
  },
});

const uploadImg = multer({ storage: diskStorage });

module.exports = uploadImg;
