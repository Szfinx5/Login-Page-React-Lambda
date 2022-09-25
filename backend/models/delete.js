import AWS from "aws-sdk";
import replyMessage from "../functions/response.js";

AWS.config.update({ region: "eu-west-1" });
const documentClient = new AWS.DynamoDB.DocumentClient();

async function deleteUser(email) {
  try {
    const params = {
      TableName: "cromwell-users",
      Key: { email: email.toLowerCase() },
    };

    const body = await documentClient.delete(params).promise();

    console.log(
      replyMessage(200, { message: "User was deleted successfully" })
    );
    return replyMessage(200, { message: "User was deleted successfully" });
  } catch (error) {
    console.log("There was an error deleting the user: ", error);
    return "There was an error adding the user: ", error;
  }
}

deleteUser("bella");

export default deleteUser;
