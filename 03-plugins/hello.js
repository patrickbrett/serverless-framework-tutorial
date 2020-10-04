exports.handler = async (event, context) => {
  console.log('event', event);
  console.log('value: ', process.env.SOME_SECRET_KEY);

  return {
    statusCode: 200,
    body: "Hello world"
  }
}

exports.queryHandler = async (event, context) => {
  const { queryStringParameters } = event;

  if (!(queryStringParameters && queryStringParameters.name && queryStringParameters.colour)) {
    return {
      statusCode: 400,
      body: "Please provide a name and colour."
    }
  }

  const { name, colour } = queryStringParameters;

  const returnString = `Hello ${name}, your favourite colour is ${colour}.`;

  return {
    statusCode: 200,
    body: returnString
  }
}