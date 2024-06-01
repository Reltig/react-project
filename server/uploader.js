require("dotenv").config();

const EasyYandexS3 = require('easy-yandex-s3').default;

const s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.S3_PUBLIC_KEY,
    secretAccessKey: process.env.S3_PRIVATE_KEY,
  },
  Bucket: process.env.BUCKET_NAME, 
  debug: true, 
});

module.exports = s3;