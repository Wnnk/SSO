const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      fs.mkdirSync(path.resolve(__dirname, 'temp'));
    } catch (error) {
      console.log('创建临时文件夹失败', error);
    }
    // cb(null, path.resolve(__dirname, 'temp'));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + req.body.chunkIndex);
  },
});
const upload = multer({ storage });
module.exports = upload;
