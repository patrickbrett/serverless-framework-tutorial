const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  region: process.env.S3_REGION
})

exports.handler = async (event, context) => {
  const imagesList = await s3.listObjectsV2({ Bucket: process.env.BUCKET_NAME, Prefix: 'thumbnail/' }).promise();

  const imageKeysList = imagesList.Contents.map(({ Key }) => Key.split('/')[1]);

  return {
    statusCode: 200,
    body: JSON.stringify(imageKeysList)
  }
}