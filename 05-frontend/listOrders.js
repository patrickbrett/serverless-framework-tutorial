const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB({
  region: 'ap-southeast-2',
});

const { unmarshall } = AWS.DynamoDB.Converter;

exports.handler = async (event, context) => {
  const orders = await dynamoDb.scan({ TableName: process.env.DDB_TABLE_NAME }).promise();

  const ordersParsed = orders.Items.map(item => unmarshall(item));

  return {
    statusCode: 200,
    body: JSON.stringify(ordersParsed)
  }
}