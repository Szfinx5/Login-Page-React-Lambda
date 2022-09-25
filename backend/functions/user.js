import AWS from "aws-sdk";

AWS.config.update({ region: "eu-west-1" });

const documentClient = new AWS.DynamoDB.DocumentClient();

async function getUser(email) {
  const params = {
    TableName: "cromwell-users",
    Key: { email: email },
  };
  try {
    const data = await documentClient.get(params).promise();
    return data.Item;
  } catch (error) {
    return "There was an error getting the user: ", error;
  }
}

export default getUser;
