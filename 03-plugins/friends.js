exports.handler = async (event, context) => {
  const { multiValueQueryStringParameters } = event;

  if (!(multiValueQueryStringParameters && multiValueQueryStringParameters.name)) {
    return {
      statusCode: 400,
      body: "Please have at least one friend"
    }
  }

  const friendNames = multiValueQueryStringParameters.name.join(', ');

  const returnString = `Your friends are: ${friendNames}`;

  return {
    statusCode: 200,
    body: returnString
  }
}