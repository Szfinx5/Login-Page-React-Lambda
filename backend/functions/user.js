import AWS from "aws-sdk";

AWS.config.update({ region: "eu-west-1" });

const documentClient = new AWS.DynamoDB.DocumentClient();

async function getUser(userName) {
  const params = {
    TableName: "cromwell-users",
    Key: { username: userName },
  };
  try {
    const data = await documentClient.get(params).promise();
    return data.Item;
  } catch (error) {
    return "There was an error getting the user: ", error;
  }
}

export default getUser;
