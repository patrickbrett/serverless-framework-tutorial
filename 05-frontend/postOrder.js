const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB({
  region: 'ap-southeast-2',
});

const { marshall } = AWS.DynamoDB.Converter;

exports.handler = async (event, context) => {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch(err) {
    return {
      statusCode: 400,
      body: "Please provide a body."
    }
  }

  if (!(body && body.name && body.order)) {
    return {
      statusCode: 400,
      body: "Please provide a name and order."
    }
  }

  const item = marshall({
    name: body.name,
    order: body.order
  })

  await dynamoDb.putItem({
    TableName: process.env.DDB_TABLE_NAME,
    Item: item,
  }).promise();

  return {
    statusCode: 201,
    body: "Created"
  }
}