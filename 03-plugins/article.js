exports.handler = async (event, context) => {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch(err) {
    return {
      statusCode: 400,
      body: "Please pass in an event body"
    }
  }

  if (!(body && body.title && body.content)) {
    return {
      statusCode: 400,
      body: "Please provide a title and content"
    }
  }

  console.log(`Saved article with title: ${body.title} and content: ${body.content}`);

  return {
    statusCode: 201,
    body: "Created successfully"
  }
}