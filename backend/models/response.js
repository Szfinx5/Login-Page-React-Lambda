function replyMessage(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

export default replyMessage;
