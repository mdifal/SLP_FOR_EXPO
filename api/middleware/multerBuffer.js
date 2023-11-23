const multer = require('multer');
const path = require('path');

const diskStorage = multer.memoryStorage();

const toBuffer = multer({ storage: diskStorage });

module.exports = toBuffer;
