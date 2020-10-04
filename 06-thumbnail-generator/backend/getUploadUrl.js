const AWS = require('aws-sdk');
const uuidv4 = require('uuid').v4;

const s3 = new AWS.S3({
  region: process.env.S3_REGION
})

exports.handler = async (event, context) => {
  const filename = uuidv4();

  const signedUrlParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: `full-size/${filename}.jpg`,
    ContentType: 'image/jpeg',
    Expires: 3600,
  }

  const signedUrl = s3.getSignedUrl('putObject', signedUrlParams);

  return {
    statusCode: 200,
    body: signedUrl
  }
}