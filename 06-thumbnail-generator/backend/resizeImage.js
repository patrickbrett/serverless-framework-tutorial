const AWS = require('aws-sdk');

const sizeOf = require("image-size");
const resizeImg = require("resize-img");

const THUMBNAIL_SIZE = process.env.THUMBNAIL_SIZE;

const s3 = new AWS.S3({
  region: process.env.S3_REGION
})

exports.handler = async (event, context) => {
  const srcBucket = event.Records[0].s3.bucket.name;
  const dstBucket = srcBucket;

  // Object key may have spaces or unicode non-ASCII characters.
  const srcKey = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  const dstKey = "thumbnail/" + srcKey.split("/")[1];
 
  const s3Object = await s3.getObject({ Bucket: srcBucket, Key: srcKey }).promise();

  const image = s3Object.Body;

  const { width, height } = sizeOf(image);

  const { newWidth, newHeight } = (() => {
    if (width > height) {
      return {
        newWidth: THUMBNAIL_SIZE,
        newHeight: (THUMBNAIL_SIZE * height) / width,
      };
    } else {
      return {
        newWidth: (THUMBNAIL_SIZE * width) / height,
        newHeight: THUMBNAIL_SIZE,
      };
    }
  })();

  const resizedImage = await resizeImg(image, {
    width: newWidth,
    height: newHeight
  });

  await s3.putObject({
    Bucket: dstBucket,
    Key: dstKey,
    Body: resizedImage,
    ContentType: 'image/jpeg'
  }).promise();

  return {
    statusCode: 200,
    body: "Resized successfully!"
  }
}