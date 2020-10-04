exports.handler = async (event, context) => {
  const { pathParameters } = event;

  const { food } = pathParameters;

  const returnString = `Looks like your favourite food is ${food}`;

  return {
    statusCode: 200,
    body: returnString
  }
}