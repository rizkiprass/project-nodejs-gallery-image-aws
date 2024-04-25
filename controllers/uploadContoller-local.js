// const AWS = require('aws-sdk');
// const fs = require('fs');
// AWS_ACCESS_KEY_ID='test';
// AWS_REGION='ap-south-1'  // does not matter
// AWS_SECRET_ACCESS_KEY='test';
// AWS_BUCKET='images'

// const s3 = new AWS.S3({
//   endpoint: 'http://localhost:4566',  // required for localstack
//   accessKeyId: AWS_ACCESS_KEY_ID,
//   secretAccessKey: AWS_SECRET_ACCESS_KEY,
//   s3ForcePathStyle: true,  // required for localstack
// })
// const file = './demo-text';
// const fileName = 'demo-text';
// const uploadFile = () => {
//   fs.readFile(file, (err, data) => {
//     if (err) throw err;
//     const params = {
//       Bucket: AWS_BUCKET,
//       Key: fileName,
//       Body: data
//     }
//     s3.upload(params, function(s3err, data) {
//       if (s3err) throw s3err;
//       console.log('File uploaded', data);
//     })
//   })
// }
// uploadFile()