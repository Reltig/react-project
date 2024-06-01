const dotenv = require("dotenv");
const path = require("path");
const express = require('express');
const multer = require('multer');

dotenv.config();

let app = express();

let EasyYandexS3 = require('easy-yandex-s3').default;

let s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.S3_PUBLIC_KEY,
    secretAccessKey: process.env.S3_PRIVATE_KEY,
  },
  Bucket: 'my-storage-danil-shpak', 
  debug: true, 
});

/*s3.Upload(
    {
      path: path.resolve(__dirname, './public/08dd1ad23a25eb97dde76ced18520e62'),
    },
    '/images/'
).then(result => console.log(result));*/

app.use(multer().any());

app.post('/uploadFile', async (req, res) => {
  let buffer = req.files[0].buffer; 
  let upload = await s3.Upload({ buffer }, '/images/'); 
  res.send(upload.key);
});

app.listen(8000);