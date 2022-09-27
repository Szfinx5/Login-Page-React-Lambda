import AWS from "aws-sdk";

AWS.config.update({ region: "eu-west-1" });

const documentClient = new AWS.DynamoDB.DocumentClient();

// This function is querying the table to find the user with the matching email (username)
async function getUser(email) {
  const params = {
    TableName: "cromwell",
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
